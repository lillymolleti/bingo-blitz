import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Cell {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface BingoBoardProps {
  board: Cell[];
  attemptedCells: number[];
  onCellClick: (index: number) => void;
  bingoLines: number[][];
}

const BingoBoard: React.FC<BingoBoardProps> = ({ board, attemptedCells, onCellClick, bingoLines }) => {
  // Check if a cell is part of a bingo line
  const isCellInBingoLine = (index: number) => {
    return bingoLines.some(line => line.includes(index));
  };

  // Get styling based on difficulty
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-700 border-green-600';
      case 'medium':
        return 'bg-yellow-700 border-yellow-600';
      case 'hard':
        return 'bg-red-700 border-red-600';
      default:
        return 'bg-indigo-700 border-indigo-600';
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 max-w-3xl mx-auto">
      {board.map((cell, index) => {
        const isAttempted = attemptedCells.includes(index);
        const isInBingoLine = isCellInBingoLine(index);
        
        return (
          <div
            key={index}
            onClick={() => onCellClick(index)}
            className={`
              relative
              aspect-square flex flex-col items-center justify-center p-2 
              rounded border-2 cursor-pointer transition-all
              ${isAttempted 
                ? `${isInBingoLine ? 'bg-purple-600 border-purple-400 animate-pulse' : 'bg-indigo-600 border-indigo-400'}`
                : getDifficultyStyle(cell.difficulty)}
              ${!isAttempted && 'hover:border-white hover:shadow-lg'}
            `}
          >
            {isAttempted && (
              <CheckCircle className="absolute text-white opacity-30" size={40} />
            )}
            <span className="text-center text-sm font-medium z-10">{cell.topic}</span>
            <span className="text-xs mt-1 opacity-70 z-10">
              {cell.difficulty.charAt(0).toUpperCase() + cell.difficulty.slice(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;
