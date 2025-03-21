
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LiveScore from '../components/LiveScore';
import BettingOdds from '../components/BettingOdds';
import BettingSlip, { BetOption } from '../components/BettingSlip';
import TeamStats from '../components/TeamStats';
import { Brain, Users, Maximize2 } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  score?: number;
  winProbability?: number;
}

interface Game {
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

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBets, setSelectedBets] = useState<BetOption[]>([]);

  // Mock data fetching
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockGame: Game = {
        id: id || "1",
        homeTeam: {
          id: "lal",
          name: "Los Angeles Lakers",
          abbreviation: "LAL",
          logo: "https://content.sportslogos.net/logos/6/17/thumbs/8621_los_angeles_lakers_-primary-2024.png",
          score: 89,
          winProbability: 0.65,
        },
        awayTeam: {
          id: "bos",
          name: "Boston Celtics",
          abbreviation: "BOS",
          logo: "https://content.sportslogos.net/logos/6/213/thumbs/boston_celtics_logo_primary_2023_sportslogosnet-5649.png",
          score: 82,
          winProbability: 0.35,
        },
        date: "Today",
        time: "Q3 8:42",
        status: "live",
        quarter: 3,
        timeRemaining: "8:42",
        aiRecommendation: "home",
      };
      setGame(mockGame);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Handle adding bet to slip
  const handleAddBet = (bet: BetOption) => {
    // Check if bet is already in slip
    const existingBetIndex = selectedBets.findIndex(b => b.id === bet.id);
    
    if (existingBetIndex >= 0) {
      // Remove bet if already selected
      setSelectedBets(selectedBets.filter(b => b.id !== bet.id));
    } else {
      // Add bet to slip
      setSelectedBets([...selectedBets, bet]);
    }
  };

  // Handle removing bet from slip
  const handleRemoveBet = (betId: string) => {
    setSelectedBets(selectedBets.filter(bet => bet.id !== betId));
  };

  // Handle clearing all bets
  const handleClearAll = () => {
    setSelectedBets([]);
  };

  if (loading || !game) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="page-container pt-24 text-center">
          <p>Loading game details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="page-container pt-24">
        {/* Live Score */}
        <div className="mb-8">
          <LiveScore 
            gameId={game.id}
            homeTeam={game.homeTeam} 
            awayTeam={game.awayTeam} 
            status={game.status}
            currentQuarter={game.quarter}
            timeRemaining={game.timeRemaining}
            homeScore={game.homeTeam.score}
            awayScore={game.awayTeam.score}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Betting Odds */}
          <div className="lg:col-span-2 space-y-8">
            <BettingOdds 
              gameId={game.id}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              onAddBet={handleAddBet}
            />
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI Game Analysis</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Our AI model predicts the Lakers have a 65% chance of winning this game based on recent performance metrics and head-to-head matchups.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-medium">Public Betting Trends</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    68% of bettors are backing the Lakers against the spread.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Maximize2 className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-medium">Key Matchups</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    LeBron James vs Jayson Tatum will be the decisive battle in this game.
                  </p>
                </div>
              </div>
            </div>
            
            <TeamStats 
              teamId={game.homeTeam.id} 
              comparison={true} 
              opponentId={game.awayTeam.id} 
            />
          </div>
          
          {/* Right Column - Betting Slip */}
          <div>
            <BettingSlip 
              selectedBets={selectedBets}
              onRemoveBet={handleRemoveBet}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
