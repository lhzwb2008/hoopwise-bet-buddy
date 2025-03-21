
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Target, Brain } from "lucide-react";

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  score?: number;
  winProbability?: number;
}

interface GameCardProps {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: "scheduled" | "live" | "final";
  quarter?: number;
  timeRemaining?: string;
  aiRecommendation?: "home" | "away" | "draw" | null;
}

const GameCard = ({
  id,
  homeTeam,
  awayTeam,
  date,
  time,
  status,
  quarter,
  timeRemaining,
  aiRecommendation,
}: GameCardProps) => {
  const [hovering, setHovering] = useState(false);

  // Status indicator
  const getStatusIndicator = () => {
    switch (status) {
      case "live":
        return <span className="pill pill-live">LIVE</span>;
      case "final":
        return <span className="pill pill-muted">FINAL</span>;
      default:
        return <span className="pill pill-muted">{time}</span>;
    }
  };

  // Get the quarter and time remaining display
  const getGameProgress = () => {
    if (status === "live" && quarter && timeRemaining) {
      return (
        <div className="text-sm font-medium text-destructive">
          {`Q${quarter} · ${timeRemaining}`}
        </div>
      );
    }
    return <div className="text-sm text-muted-foreground">{date}</div>;
  };

  // AI recommendation indicator
  const getAiRecommendation = () => {
    if (!aiRecommendation) return null;
    
    const team = aiRecommendation === "home" ? homeTeam : awayTeam;
    const confidence = Math.round((team.winProbability || 0.5) * 100);
    
    return (
      <div className="mt-4 p-3 rounded-lg bg-primary/5 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            AI Pick: <span className="text-primary">{team.name}</span>
          </p>
          <div className="w-full bg-muted h-1.5 rounded-full mt-1.5">
            <div 
              className="bg-primary h-full rounded-full" 
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
        <div className="text-sm font-bold text-primary">{confidence}%</div>
      </div>
    );
  };

  return (
    <Link 
      to={`/game/${id}`}
      className="block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={`glass-card rounded-xl p-5 transition-all duration-300 ${hovering ? 'shadow-hover transform translate-y-[-2px]' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          {getStatusIndicator()}
          <div className="flex items-center text-muted-foreground text-sm">
            <Target className="w-4 h-4 mr-1" />
            <span>AI-powered odds</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Team Display */}
          <div className="flex-1 space-y-4">
            {/* Away Team */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 mr-3 overflow-hidden rounded-md">
                <img 
                  src={awayTeam.logo} 
                  alt={awayTeam.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{awayTeam.name}</p>
                  <p className="text-xl font-bold ml-2">
                    {status !== "scheduled" ? awayTeam.score : ""}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Home Team */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 mr-3 overflow-hidden rounded-md">
                <img 
                  src={homeTeam.logo} 
                  alt={homeTeam.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{homeTeam.name}</p>
                  <p className="text-xl font-bold ml-2">
                    {status !== "scheduled" ? homeTeam.score : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Icon */}
          <div className="ml-4">
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${hovering ? 'transform translate-x-1 text-primary' : 'text-muted-foreground'}`} />
          </div>
        </div>
        
        {/* Game progress indicator */}
        <div className="mt-4 border-t border-border pt-4">
          {getGameProgress()}
        </div>
        
        {/* AI Recommendation */}
        {getAiRecommendation()}
      </div>
    </Link>
  );
};

export default GameCard;
