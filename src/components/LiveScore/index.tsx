
import React from 'react';
import TeamScoreDisplay from './TeamScoreDisplay';
import GameStatusIndicator from './GameStatusIndicator';
import QuarterScoresTable from './QuarterScoresTable';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  winProbability?: number;
}

interface LiveScoreProps {
  gameId: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'final';
  currentQuarter?: number;
  timeRemaining?: string;
  startTime?: string;
}

const LiveScore = ({
  gameId,
  homeTeam,
  awayTeam,
  homeScore = 0,
  awayScore = 0,
  status,
  currentQuarter,
  timeRemaining,
  startTime,
}: LiveScoreProps) => {
  // Generate mock quarter scores
  const generateQuarterScores = () => {
    if (status === 'scheduled') return null;
    
    const quarters = status === 'live' ? currentQuarter || 4 : 4;
    const homeQuarters = [];
    const awayQuarters = [];
    
    let homeTotal = 0;
    let awayTotal = 0;
    
    for (let i = 0; i < quarters; i++) {
      // Generate realistic quarter scores between 18-32 points
      const homeQuarterScore = status === 'live' && i === quarters - 1 
        ? Math.round((homeScore - homeTotal) * 10) / 10
        : Math.floor(Math.random() * (32 - 18) + 18);
      
      const awayQuarterScore = status === 'live' && i === quarters - 1 
        ? Math.round((awayScore - awayTotal) * 10) / 10
        : Math.floor(Math.random() * (32 - 18) + 18);
      
      homeQuarters.push(homeQuarterScore);
      awayQuarters.push(awayQuarterScore);
      
      if (i < quarters - 1 || status === 'final') {
        homeTotal += homeQuarterScore;
        awayTotal += awayQuarterScore;
      }
    }
    
    return {
      homeQuarters,
      awayQuarters,
      homeTotal: homeScore || homeTotal,
      awayTotal: awayScore || awayTotal
    };
  };
  
  const quarterScores = generateQuarterScores();
  
  return (
    <div className="glass-card rounded-xl overflow-hidden animation-fade-in">
      <div className="p-4 lg:p-6">
        {/* Game Status */}
        <div className="flex justify-between items-center mb-6">
          <GameStatusIndicator 
            status={status}
            currentQuarter={currentQuarter}
            timeRemaining={timeRemaining}
            startTime={startTime}
          />
          
          {/* Additional options could go here */}
        </div>
        
        {/* Team Scores */}
        <div className="space-y-4 mb-6">
          <TeamScoreDisplay 
            team={awayTeam}
            score={awayScore}
            isAway={true}
            status={status}
          />
          
          <TeamScoreDisplay 
            team={homeTeam}
            score={homeScore}
            isAway={false}
            status={status}
          />
        </div>
        
        {/* Quarter Scores */}
        {quarterScores && (
          <div className="mt-8">
            <QuarterScoresTable 
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeQuarters={quarterScores.homeQuarters}
              awayQuarters={quarterScores.awayQuarters}
              homeTotal={quarterScores.homeTotal}
              awayTotal={quarterScores.awayTotal}
              status={status}
              currentQuarter={currentQuarter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScore;
