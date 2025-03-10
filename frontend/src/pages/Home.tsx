import { useState, useEffect } from 'react';
import { Brain, Clock, Trophy, UserCircle } from 'lucide-react';
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

interface UserAnswer {
  question: string;
  option: number;
  answer: string;
}

function Homepage() {
  const user = useRecoilValue(userAtom);
  const [loading,setLoading] = useRecoilState(loaderAtom);
  const token = useRecoilValue(tokenAtom);
  const [board, setBoard] = useState(generateBingoBoard());
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [attemptedCells, setAttemptedCells] = useState<number[]>([]);
  const [bingoLines, setBingoLines] = useState<number[][]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTimeLeft, setGameTimeLeft] = useState(1800); // 30 minutes in seconds
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  // New state: mapping from topic to a shuffled list of questions for that topic.
  const [topicQuestions, setTopicQuestions] = useState<Record<string, Question[]>>({});

  // States for loading/error messages
  const [isCellLoading, setIsCellLoading] = useState(false);
  const [cellError, setCellError] = useState<string | null>(null);

  // Clear error message after 2 seconds if set
  useEffect(() => {
    if (cellError) {
      const errorTimer = setTimeout(() => setCellError(null), 2000);
      return () => clearTimeout(errorTimer);
    }
  }, [cellError]);

  // Create a mapping of topic → shuffled array of questions (only for topics present in questions)
  const initializeTopicQuestions = () => {
    const topicsFromQuestions = Array.from(new Set(questions.map(q => q.topic)));
    const newTopicQuestions: Record<string, Question[]> = {};
    topicsFromQuestions.forEach(topic => {
      const qs = questions.filter(q => q.topic === topic);
      // Shuffle the questions for this topic
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
      newTopicQuestions[topic] = qs;
    });
    setTopicQuestions(newTopicQuestions);
  };

  const startGame = () => {
    setGameStarted(true);
    setBoard(generateBingoBoard());
    setAttemptedCells([]);
    setBingoLines([]);
    setUserAnswers([]);
    setGameTimeLeft(1800);
    setSubmitted(false);
    setCurrentQuestion(null);
    setSelectedCell(null);
    setTimeLeft(0);
    initializeTopicQuestions();
    if (gameTimer) clearInterval(gameTimer);
    if (timer) clearInterval(timer);
    const newGameTimer = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(newGameTimer);
          handleSubmit(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setGameTimer(newGameTimer);
  };

  const handleCellClick = (index: number) => {
    // Block click if game is over or a question is active
    if (gameTimeLeft <= 0 || currentQuestion) return;
    // If cell already attempted, show error
    if (attemptedCells.includes(index)) {
      setCellError("This cell is already completed!");
      return;
    }

    // Show a 500ms loading indicator
    setIsCellLoading(true);
    setTimeout(() => {
      setIsCellLoading(false);
      setSelectedCell(index);
      const cellTopic = board[index].topic;
      // Pull the question from our topicQuestions mapping
      const availableQuestions = topicQuestions[cellTopic] || [];
      if (availableQuestions.length === 0) {
        setCellError(`No more questions available for ${cellTopic}`);
        return;
      }
      // Pick the next question (first in the array)
      const nextQuestion = availableQuestions[0];
      // Remove it from the mapping so it won't be reused
      setTopicQuestions(prev => ({
        ...prev,
        [cellTopic]: prev[cellTopic].slice(1)
      }));
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
      if (timer) clearInterval(timer);
      const newTimer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(newTimer);
            handleAnswer(-1); // -1 means no selection
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
      setUserAnswers(prev => [
        ...prev,
        {
          question: currentQuestion.text,
          option: selectedOption,
          answer: selectedOption === -1 ? "No Answer" : currentQuestion.options[selectedOption]
        }
      ]);
      // Mark cell as attempted and update bingo lines
      setAttemptedCells(prev => {
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
      const response = await axios.post(`${BACKEND_URL}/teckzite/bingo`,payload,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = response.data;
      if (response.data) {
        customizedToast({
          type:"success",
          message: data.message || "Submission successful",
          position: "top-right"
        });
      } else {
        customizedToast({
          type:"error",
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
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
      if (gameTimer) clearInterval(gameTimer);
    };
  }, [timer, gameTimer]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative">
      <header className="p-4 flex flex-col md:flex-row justify-between items-center border-b border-indigo-700">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Brain className="h-8 w-8" />
          <h1 className="text-2xl font-bold">DSA Bingo Challenge</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex gap-2 font-bold">
              <UserCircle />
              {user.teckziteId}
            </div>
          )}
          {gameStarted && !submitted && (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
              disabled={loading}
            >
              {loading?<div className='flex'><DotSpinner/>Submitting...</div>:<div>Submit Answers</div>}
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 relative">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto bg-indigo-800 bg-opacity-50 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Welcome to DSA Bingo!</h2>
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
