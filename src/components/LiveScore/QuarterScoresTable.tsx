
import React from 'react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
}

export interface QuarterScoresTableProps {
  homeTeam: Team;
  awayTeam: Team;
  homeQuarters: number[]; // Adding the missing property
  awayQuarters: number[]; // Adding the missing property
  homeTotal: number; // Adding the missing property
  awayTotal: number; // Adding the missing property
  status: 'scheduled' | 'live' | 'final';
  currentQuarter?: number;
}

const QuarterScoresTable = ({
  homeTeam,
  awayTeam,
  homeQuarters,
  awayQuarters,
  homeTotal,
  awayTotal,
  status,
  currentQuarter
}: QuarterScoresTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-2 py-2 text-left">Team</th>
            {[1, 2, 3, 4].map((quarter) => (
              <th 
                key={quarter} 
                className={`px-3 py-2 text-center w-16 ${
                  status === 'live' && quarter === currentQuarter 
                    ? 'bg-primary/10 text-primary' 
                    : ''
                }`}
              >
                Q{quarter}
              </th>
            ))}
            <th className="px-3 py-2 text-center font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-2 py-3 font-medium">
              {awayTeam.abbreviation}
            </td>
            {[0, 1, 2, 3].map((i) => (
              <td 
                key={i} 
                className={`px-3 py-3 text-center ${
                  status === 'live' && i + 1 === currentQuarter 
                    ? 'text-primary font-medium' 
                    : ''
                }`}
              >
                {awayQuarters[i] || '-'}
              </td>
            ))}
            <td className="px-3 py-3 text-center font-bold">
              {awayTotal}
            </td>
          </tr>
          <tr>
            <td className="px-2 py-3 font-medium">
              {homeTeam.abbreviation}
            </td>
            {[0, 1, 2, 3].map((i) => (
              <td 
                key={i} 
                className={`px-3 py-3 text-center ${
                  status === 'live' && i + 1 === currentQuarter 
                    ? 'text-primary font-medium' 
                    : ''
                }`}
              >
                {homeQuarters[i] || '-'}
              </td>
            ))}
            <td className="px-3 py-3 text-center font-bold">
              {homeTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuarterScoresTable;
