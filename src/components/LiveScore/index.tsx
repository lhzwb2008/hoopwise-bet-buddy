
import React, { useEffect, useState } from 'react';
import GameStatusIndicator from './GameStatusIndicator';
import TeamScoreDisplay from './TeamScoreDisplay';
import QuarterScoresTable from './QuarterScoresTable';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

interface ScoreByQuarter {
  quarter: number;
  score: number;
}

interface LiveScoreProps {
  gameId: string;
  homeTeam: Team;
  awayTeam: Team;
  currentQuarter?: number;
  timeRemaining?: string;
  homeScore?: number;
  awayScore?: number;
  homeScoreByQuarter?: ScoreByQuarter[];
  awayScoreByQuarter?: ScoreByQuarter[];
  status: 'scheduled' | 'live' | 'final';
  startTime?: string;
}

const LiveScore = ({
  gameId,
  homeTeam,
  awayTeam,
  currentQuarter = 0,
  timeRemaining = '',
  homeScore = 0,
  awayScore = 0,
  homeScoreByQuarter = [],
  awayScoreByQuarter = [],
  status,
  startTime = '',
}: LiveScoreProps) => {
  const [animatedHomeScore, setAnimatedHomeScore] = useState(homeScore);
  const [animatedAwayScore, setAnimatedAwayScore] = useState(awayScore);
  
  // Animate score changes
  useEffect(() => {
    if (homeScore > animatedHomeScore) {
      const interval = setInterval(() => {
        setAnimatedHomeScore(prev => {
          const next = prev + 1;
          if (next >= homeScore) {
            clearInterval(interval);
            return homeScore;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setAnimatedHomeScore(homeScore);
    }
  }, [homeScore, animatedHomeScore]);
  
  useEffect(() => {
    if (awayScore > animatedAwayScore) {
      const interval = setInterval(() => {
        setAnimatedAwayScore(prev => {
          const next = prev + 1;
          if (next >= awayScore) {
            clearInterval(interval);
            return awayScore;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setAnimatedAwayScore(awayScore);
    }
  }, [awayScore, animatedAwayScore]);
  
  return (
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      {/* Game Status Indicator */}
      <div className="flex items-center justify-between mb-6">
        <GameStatusIndicator 
          status={status}
          currentQuarter={currentQuarter}
          timeRemaining={timeRemaining}
          startTime={startTime}
        />
      </div>
      
      {/* Team Scores */}
      <div className="space-y-6">
        {/* Away Team */}
        <TeamScoreDisplay 
          team={awayTeam}
          score={animatedAwayScore}
          status={status}
        />
        
        {/* Home Team */}
        <TeamScoreDisplay 
          team={homeTeam}
          score={animatedHomeScore}
          status={status}
        />
      </div>
      
      {/* Quarter-by-Quarter Scores */}
      {status !== 'scheduled' && (
        <QuarterScoresTable
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={animatedHomeScore}
          awayScore={animatedAwayScore}
          homeScoreByQuarter={homeScoreByQuarter}
          awayScoreByQuarter={awayScoreByQuarter}
          currentQuarter={currentQuarter}
        />
      )}
    </div>
  );
};

export default LiveScore;
