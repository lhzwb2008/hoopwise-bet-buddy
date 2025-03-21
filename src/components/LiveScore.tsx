
import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

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
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      {/* Game Status Indicator */}
      <div className="flex items-center justify-between mb-6">
        {status === 'live' ? (
          <div className="flex items-center space-x-2">
            <div className="pill pill-live flex items-center">
              <Activity className="w-3 h-3 mr-1" />
              <span>LIVE</span>
            </div>
            <span className="text-sm font-medium text-destructive">{`Q${currentQuarter} · ${timeRemaining}`}</span>
          </div>
        ) : status === 'scheduled' ? (
          <div className="text-sm font-medium text-muted-foreground">
            Starting {startTime}
          </div>
        ) : (
          <div className="pill pill-muted">FINAL</div>
        )}
      </div>
      
      {/* Team Scores */}
      <div className="space-y-6">
        {/* Away Team */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-lg">
            <img 
              src={awayTeam.logo} 
              alt={awayTeam.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-semibold">{awayTeam.name}</h3>
              <span className="ml-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                {awayTeam.abbreviation}
              </span>
            </div>
          </div>
          <div className="text-4xl font-bold ml-auto">
            {status !== 'scheduled' ? animatedAwayScore : '-'}
          </div>
        </div>
        
        {/* Home Team */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-lg">
            <img 
              src={homeTeam.logo} 
              alt={homeTeam.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-semibold">{homeTeam.name}</h3>
              <span className="ml-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                {homeTeam.abbreviation}
              </span>
            </div>
          </div>
          <div className="text-4xl font-bold ml-auto">
            {status !== 'scheduled' ? animatedHomeScore : '-'}
          </div>
        </div>
      </div>
      
      {/* Quarter-by-Quarter Scores */}
      {status !== 'scheduled' && (
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
                  <td className="py-2 px-4 text-center font-bold border-t border-border">{animatedAwayScore}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-t border-border">{homeTeam.abbreviation}</td>
                  {filledHomeQuarters.map((score, i) => (
                    <td key={`home-q-${i}`} className="py-2 px-4 text-center border-t border-border">
                      {currentQuarter >= i + 1 ? score : '-'}
                    </td>
                  ))}
                  <td className="py-2 px-4 text-center font-bold border-t border-border">{animatedHomeScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveScore;
