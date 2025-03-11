import { useState, useEffect } from 'react';
import { Brain, Clock, LogOut, UserCircle } from 'lucide-react';
import BingoBoard from '../components/BingoBoard';
import QuestionPanel from '../components/QuestionPanel';
import { generateBingoBoard, checkForBingo } from '../utils/bingoUtils';
import { questions } from '../data/questions';
import { Question } from '../types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loaderAtom, tokenAtom, userAtom } from '../store/atoms';
import { customizedToast } from '../utils/toast';
import DotSpinner from '../components/loader/DotSpinner';
import { BACKEND_URL } from '../config';
import axios, { isAxiosError } from 'axios';
import { Button } from '../components/ui/button';
import confetti from "canvas-confetti";


interface UserAnswer {
  question: string;
  option: number;
  answer: string;
}

export interface BoardCell {
  topic: string;
  difficulty: string;
}

function Homepage() {
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useRecoilState(loaderAtom);
  const token = useRecoilValue(tokenAtom);
  
  const [board, setBoard] = useState<BoardCell[]>(() => {
    const saved = localStorage.getItem('board');
    return saved ? JSON.parse(saved) : generateBingoBoard(questions);
  });
  
  const [selectedCell, setSelectedCell] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedCell');
    return saved !== null ? JSON.parse(saved) : null;
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(() => {
    const saved = localStorage.getItem('currentQuestion');
    return saved ? JSON.parse(saved) : null;
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const saved = localStorage.getItem('timeLeft');
    return saved ? JSON.parse(saved) : 0;
  });

  const [attemptedCells, setAttemptedCells] = useState<number[]>(() => {
    const saved = localStorage.getItem('attemptedCells');
    return saved ? JSON.parse(saved) : [];
  });

  const [bingoLines, setBingoLines] = useState<number[][]>(() => {
    const saved = localStorage.getItem('bingoLines');
    return saved ? JSON.parse(saved) : [];
  });

  const [gameStarted, setGameStarted] = useState<boolean>(() => {
    const saved = localStorage.getItem('gameStarted');
    return saved ? JSON.parse(saved) : false;
  });

  const [gameTimeLeft, setGameTimeLeft] = useState<number>(() => {
    const saved = localStorage.getItem('gameTimeLeft');
    return saved ? JSON.parse(saved) : 1800;
  });

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(() => {
    const saved = localStorage.getItem('userAnswers');
    return saved ? JSON.parse(saved) : [];
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    const saved = localStorage.getItem('submitted');
    return saved ? JSON.parse(saved) : false;
  });

  const [topicQuestions, setTopicQuestions] = useState<Record<string, Question[]>>(() => {
    const saved = localStorage.getItem('topicQuestions');
    return saved ? JSON.parse(saved) : {};
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [isCellLoading, setIsCellLoading] = useState(false);
  const [cellError, setCellError] = useState<string | null>(null);

  useEffect(() => localStorage.setItem('board', JSON.stringify(board)), [board]);
  useEffect(() => localStorage.setItem('selectedCell', JSON.stringify(selectedCell)), [selectedCell]);
  useEffect(() => localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion)), [currentQuestion]);
  useEffect(() => localStorage.setItem('timeLeft', JSON.stringify(timeLeft)), [timeLeft]);
  useEffect(() => localStorage.setItem('attemptedCells', JSON.stringify(attemptedCells)), [attemptedCells]);
  useEffect(() => localStorage.setItem('bingoLines', JSON.stringify(bingoLines)), [bingoLines]);
  useEffect(() => localStorage.setItem('gameStarted', JSON.stringify(gameStarted)), [gameStarted]);
  useEffect(() => localStorage.setItem('gameTimeLeft', JSON.stringify(gameTimeLeft)), [gameTimeLeft]);
  useEffect(() => localStorage.setItem('userAnswers', JSON.stringify(userAnswers)), [userAnswers]);
  useEffect(() => localStorage.setItem('submitted', JSON.stringify(submitted)), [submitted]);
  useEffect(() => localStorage.setItem('topicQuestions', JSON.stringify(topicQuestions)), [topicQuestions]);

  useEffect(() => {
    if (gameStarted && !submitted && gameTimeLeft > 0) {
      const newGameTimer = setInterval(() => {
        setGameTimeLeft((prev: number) => {
          if (prev <= 1) {
            clearInterval(newGameTimer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setGameTimer(newGameTimer);
    }

    if (currentQuestion && timeLeft > 0) {
      const newTimer = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(newTimer);
            handleAnswer(-1);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      setTimer(newTimer);
    }

    return () => {
      timer && clearInterval(timer);
      gameTimer && clearInterval(gameTimer);
    };
  }, []);

  useEffect(() => {
    if (cellError) {
      const errorTimer = setTimeout(() => setCellError(null), 2000);
      return () => clearTimeout(errorTimer);
    }
  }, [cellError]);

  // const initializeTopicQuestions = () => {
  //   const topics = Array.from(new Set(questions.map(q => q.topic)));
  //   const newTopicQuestions: Record<string, Question[]> = {};
  //   topics.forEach(topic => {
  //     const qs = questions.filter(q => q.topic === topic);
  //     for (let i = qs.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [qs[i], qs[j]] = [qs[j], qs[i]];
  //     }
  //     newTopicQuestions[topic] = qs;
  //   });
  //   return newTopicQuestions;
  // };

  const startGame = () => {
    try {
      localStorage.clear();
      const newBoard = generateBingoBoard(questions);
      
      // Create direct topic-question mapping
      const exactTopicMap: Record<string, Question[]> = {};
      newBoard.forEach(cell => {
        const question = questions.find(q => q.topic === cell.topic);
        if (question) {
          exactTopicMap[cell.topic] = [question];
        }
      });
  
      // Reset all game states
      setGameStarted(true);
      setBoard(newBoard);
      setTopicQuestions(exactTopicMap);
      setAttemptedCells([]);
      setBingoLines([]);
      setUserAnswers([]);
      setGameTimeLeft(1800);
      setSubmitted(false);
      setCurrentQuestion(null);
      setSelectedCell(null);
      setTimeLeft(0);
  
      // Clear existing timers
      if (gameTimer) clearInterval(gameTimer);
      if (timer) clearInterval(timer);
  
      // Start new game timer
      const newGameTimer = setInterval(() => {
        setGameTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      setGameTimer(newGameTimer);
  
    } catch (error) {
      customizedToast({
        type: "error",
        message: error instanceof Error ? error.message : "Game initialization failed",
        position: "top-right"
      });
    }
  };
  const handleCellClick = (index: number) => {
    if (gameTimeLeft <= 0 || currentQuestion) return;
    if (attemptedCells.includes(index)) {
      setCellError("Completed this question");
      return;
    }

    setIsCellLoading(true);
    setTimeout(() => {
      setIsCellLoading(false);
      setSelectedCell(index);
      const cellTopic = board[index].topic;
      const availableQuestions = topicQuestions[cellTopic] || [];
      
      const nextQuestion = availableQuestions[0];
      if (!nextQuestion) return;

      const newBoard = [...board];
      newBoard[index].topic = nextQuestion.topic;
      setBoard(newBoard);

      setTopicQuestions(prev => ({
        ...prev,
        [cellTopic]: prev[cellTopic].slice(1)
      }));
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
      if (timer) clearInterval(timer);
      const newTimer = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(newTimer);
            handleAnswer(-1);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      setTimer(newTimer);
    }, 500);
  };

  const handleAnswer = (selectedOption: number) => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    if (currentQuestion && selectedCell !== null) {
      setUserAnswers((prev: UserAnswer[]) => [
        ...prev,
        {
          question: currentQuestion.text,
          option: selectedOption,
          answer: selectedOption === -1 ? "No Answer" : currentQuestion.options[selectedOption]
        }
      ]);
      setAttemptedCells((prev: number[]) => {
        const newAttempted = [...prev, selectedCell];
        const newBingoLines = checkForBingo(newAttempted);
        setBingoLines(newBingoLines);
        return newAttempted;
      });
    }
    setCurrentQuestion(null);
    setSelectedCell(null);
    setTimeLeft(0);
  };

  const handleSubmit = async () => {
    const isConfirmed = window.confirm("Are you sure want to submit?");
    if(isConfirmed){
        if (submitted) return;
    if (gameTimer) clearInterval(gameTimer);
    if (timer) clearInterval(timer);
    setGameTimeLeft(0);
    setSubmitted(true);
    const payload = {
      teckziteId: user?.teckziteId,
      userAnswers
    };
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/teckzite/bingo`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = response.data;
      if (response.data) {
        customizedToast({
          type: "success",
          message: data.message || "Submission successful",
          position: "top-right"
        });
        confetti({
          particleCount: 300,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        customizedToast({
          type: "error",
          message: data.message || "Submission failed",
          position: "top-right"
        });
      }
      console.log('Submission response:', data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Submission error";
        customizedToast({ type: "error", message: errorMessage, position: "top-right" });
      } else {
        console.error("Error submitting answers:", error);
        customizedToast({ type: "error", message: "Submission error", position: "top-right" });
      }
    } finally {
      setLoading(false);
    }
    }
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
      if (gameTimer) clearInterval(gameTimer);
    };
  }, [timer, gameTimer]);

  const handleLogout = async() =>{
    const isConfirmed = window.confirm("Submit the Quiz before you logout\nAre you sure want to log out?");
  
  if (isConfirmed) {
    try {
      await axios.post(`${BACKEND_URL}/teckzite/signOut`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      // Clear localStorage
      localStorage.clear();

      // Redirect to login or home page
      window.location.href = "/login";  // Change as per your routing
    } catch (error) {
      console.error("Logout failed:", error);
      customizedToast({type:"error",message:"Logout failed. Please try again."})
    }
  }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative">
      <header className="p-4 flex flex-col md:flex-row justify-between items-center border-b border-indigo-700">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Brain className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tighter font=bold">Bingo Blitz</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex gap-2 font-bold">
              <UserCircle />
              {user.teckziteId}
            </div>
          )}
          {gameStarted && !submitted && (
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
              disabled={loading}
            >
              {loading ? <div className='flex'><DotSpinner/>Submitting...</div> : <div>Submit Answers</div>}
            </Button>
          )}
          {
            user && (<Button onClick={handleLogout}>
              <LogOut/>  Logout
            </Button>)
          }
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 relative">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto bg-indigo-800 bg-opacity-50 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Welcome to Bingo Blitz!</h2>
            <p className="mb-6">
              Test your DSA knowledge in this interactive game. Answer questions (without immediate evaluation)
              and complete lines to earn bonus marks!
            </p>
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              Start Game
            </button>
          </div>
        ) : submitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Game Submitted!</h3>
            <p className="text-xl mb-4">Thank you for playing.</p>
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {cellError && (
              <div className="mb-4 p-2 bg-red-600 text-white text-center rounded">
                {cellError}
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4 shadow-lg relative">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-blue-300">
                        {/* <Clock size={20} />
                        <span className="font-mono text-xl">
                          {Math.floor(gameTimeLeft / 60)}m {gameTimeLeft % 60}s
                        </span> */}
                      </div>
                      {timeLeft > 0 && (
                        <div className="flex items-center gap-2 text-yellow-300">
                          <Clock size={20} />
                          <span className="font-mono text-xl">{timeLeft}s</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Trophy size={20} />
                      <span className="text-xl">0</span> */}
                    </div>
                  </div>

                  {currentQuestion ? (
                    <QuestionPanel
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                      timeLeft={timeLeft}
                    />
                  ) : (
                    <BingoBoard
                      board={board}
                      attemptedCells={attemptedCells}
                      onCellClick={handleCellClick}
                      bingoLines={bingoLines}
                    />
                  )}
                </div>
              </div>
            </div>
            {isCellLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="text-white text-xl">Loading...</div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="p-4 text-center text-indigo-300 border-t border-indigo-700">
        <p>© 2025 GFG Student Chapter</p>
      </footer>
    </div>
  );
}

export default Homepage;