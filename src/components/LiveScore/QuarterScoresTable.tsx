
import React from 'react';

interface ScoreByQuarter {
  quarter: number;
  score: number;
}

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

interface QuarterScoresTableProps {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homeScoreByQuarter: ScoreByQuarter[];
  awayScoreByQuarter: ScoreByQuarter[];
  currentQuarter: number;
}

const QuarterScoresTable = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  homeScoreByQuarter,
  awayScoreByQuarter,
  currentQuarter,
}: QuarterScoresTableProps) => {
  // Fill quarter scores if they don't exist
  const filledHomeQuarters = Array.from({ length: 4 }, (_, i) => {
    const quarter = homeScoreByQuarter.find(q => q.quarter === i + 1);
    return quarter ? quarter.score : 0;
  });
  
  const filledAwayQuarters = Array.from({ length: 4 }, (_, i) => {
    const quarter = awayScoreByQuarter.find(q => q.quarter === i + 1);
    return quarter ? quarter.score : 0;
  });

  return (
    <div className="mt-8">
      <h4 className="text-sm font-medium mb-3 text-muted-foreground">Score By Quarter</h4>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-medium text-muted-foreground">Team</th>
              <th className="py-2 px-4 text-center font-medium text-muted-foreground">Q1</th>
              <th className="py-2 px-4 text-center font-medium text-muted-foreground">Q2</th>
              <th className="py-2 px-4 text-center font-medium text-muted-foreground">Q3</th>
              <th className="py-2 px-4 text-center font-medium text-muted-foreground">Q4</th>
              <th className="py-2 px-4 text-center font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-t border-border">{awayTeam.abbreviation}</td>
              {filledAwayQuarters.map((score, i) => (
                <td key={`away-q-${i}`} className="py-2 px-4 text-center border-t border-border">
                  {currentQuarter >= i + 1 ? score : '-'}
                </td>
              ))}
              <td className="py-2 px-4 text-center font-bold border-t border-border">{awayScore}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-t border-border">{homeTeam.abbreviation}</td>
              {filledHomeQuarters.map((score, i) => (
                <td key={`home-q-${i}`} className="py-2 px-4 text-center border-t border-border">
                  {currentQuarter >= i + 1 ? score : '-'}
                </td>
              ))}
              <td className="py-2 px-4 text-center font-bold border-t border-border">{homeScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterScoresTable;
