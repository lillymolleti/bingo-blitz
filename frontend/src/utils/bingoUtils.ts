// import { BoardCell } from "../pages/Home";
// import { Question } from "../types";
interface BoardCell {
  topic: string;
  difficulty: string;
}

interface Question {
  id: string;
  topic: string;
  text: string;
  options: string[];
  difficulty: string;
  
}


export const generateBingoBoard = (questions: Question[]) => {
  // Safely handle empty input
  if (questions.length === 0) return [];
  
  // Create board with valid fallback values
  // console.log("Questions data = ",questions)
  const board: BoardCell[] = [];
  for (let i = 0; i < 25; i++) {
    // const question = questions[i % questions.length]; // Cycle through questions
    const question = questions[i];
    board.push({ 
      topic: question.topic || "Default Topic",
      difficulty: (question.difficulty || "easy") as "easy" | "medium" | "hard"
    });
  }
  return board;
};

// Check for bingo patterns (rows, columns, diagonals)
export const checkForBingo = (completedCells: number[]): number[][] => {
  const bingoLines: number[][] = [];
  
  // Check rows
  for (let row = 0; row < 5; row++) {
    const rowCells = [row*5, row*5+1, row*5+2, row*5+3, row*5+4];
    if (rowCells.every(cell => completedCells.includes(cell))) {
      bingoLines.push(rowCells);
    }
  }
  
  // Check columns
  for (let col = 0; col < 5; col++) {
    const colCells = [col, col+5, col+10, col+15, col+20];
    if (colCells.every(cell => completedCells.includes(cell))) {
      bingoLines.push(colCells);
    }
  }
  
  // Check diagonals
  const diagonal1 = [0, 6, 12, 18, 24];
  if (diagonal1.every(cell => completedCells.includes(cell))) {
    bingoLines.push(diagonal1);
  }
  
  const diagonal2 = [4, 8, 12, 16, 20];
  if (diagonal2.every(cell => completedCells.includes(cell))) {
    bingoLines.push(diagonal2);
  }
  
  return bingoLines;
};