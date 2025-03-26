
import React from 'react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  winProbability?: number;
}

export interface TeamScoreDisplayProps {
  team: Team;
  score?: number;
  isAway: boolean; // Adding the missing property
  status: 'scheduled' | 'live' | 'final';
}

const TeamScoreDisplay = ({ team, score = 0, isAway, status }: TeamScoreDisplayProps) => {
  return (
    <div className={`flex items-center justify-between ${isAway ? 'mb-2' : ''}`}>
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center">
          {team.logo ? (
            <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
          ) : (
            <span className="text-lg font-bold">{team.abbreviation}</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{team.name}</h3>
          {team.winProbability !== undefined && (
            <div className="text-xs text-muted-foreground">
              Win probability: {Math.round(team.winProbability * 100)}%
            </div>
          )}
        </div>
      </div>
      
      {status !== 'scheduled' && (
        <div className="text-3xl font-bold tabular-nums">
          {score}
        </div>
      )}
    </div>
  );
};

export default TeamScoreDisplay;
