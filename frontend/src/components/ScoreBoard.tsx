import React from 'react';
import { Trophy, Users, Clock } from 'lucide-react';

const ScoreBoard: React.FC = () => {
  // Mock data for the leaderboard
  const leaderboardData = [
    { id: 1, name: "AlgoMaster", score: 450, bingos: 3 },
    { id: 2, name: "CodeNinja", score: 380, bingos: 2 },
    { id: 3, name: "ByteWizard", score: 320, bingos: 2 },
    { id: 4, name: "DataStructureGuru", score: 290, bingos: 1 },
    { id: 5, name: "RecursionPro", score: 240, bingos: 1 },
  ];

  return (
    <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-400" size={24} />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>
      
      <div className="space-y-4">
        {leaderboardData.map((player, index) => (
          <div 
            key={player.id}
            className={`
              flex items-center justify-between p-3 rounded-lg
              ${index === 0 ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 
                index === 1 ? 'bg-gradient-to-r from-slate-500 to-slate-600' :
                index === 2 ? 'bg-gradient-to-r from-amber-700 to-amber-800' :
                'bg-indigo-700'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full font-bold
                ${index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-slate-400' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-indigo-600'}
              `}>
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="flex items-center text-xs text-indigo-300">
                  <Clock size={12} className="mr-1" />
                  <span>Active now</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{player.score}</div>
              <div className="text-xs text-indigo-300">{player.bingos} bingos</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-indigo-700 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} />
          <h3 className="font-medium">Online Players</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["AlgoMaster", "ByteWizard", "CodeNinja", "GraphTheory", "SortingPro", "TreeTraversal"].map(name => (
            <div key={name} className="bg-indigo-600 text-xs px-2 py-1 rounded-full">
              {name}
            </div>
          ))}
          <div className="bg-indigo-600 text-xs px-2 py-1 rounded-full">
            +12 more
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;