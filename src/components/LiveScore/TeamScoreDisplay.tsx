
import React from 'react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

interface TeamScoreDisplayProps {
  team: Team;
  score: number;
  status: 'scheduled' | 'live' | 'final';
}

const TeamScoreDisplay = ({ team, score, status }: TeamScoreDisplayProps) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-lg">
        <img 
          src={team.logo} 
          alt={team.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-semibold">{team.name}</h3>
          <span className="ml-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
            {team.abbreviation}
          </span>
        </div>
      </div>
      <div className="text-4xl font-bold ml-auto">
        {status !== 'scheduled' ? score : '-'}
      </div>
    </div>
  );
};

export default TeamScoreDisplay;
