
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BettingSlip, { BetOption } from '../components/BettingSlip';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const BettingSlipPage = () => {
  const [selectedBets, setSelectedBets] = useState<BetOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock fetch bets from localStorage or session
  useEffect(() => {
    const fetchSavedBets = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Example saved bets (in a real app, these would come from localStorage or API)
        const savedBets: BetOption[] = [
          {
            id: "1-moneyline-home",
            type: "moneyline",
            team: {
              id: "lal",
              name: "Los Angeles Lakers",
              abbreviation: "LAL",
            },
            odds: -160,
            description: "Los Angeles Lakers to win",
          },
          {
            id: "3-spread-away",
            type: "spread",
            team: {
              id: "mia",
              name: "Miami Heat",
              abbreviation: "MIA",
            },
            odds: -110,
            value: "+3.5",
            description: "Miami Heat +3.5",
          }
        ];
        
        setSelectedBets(savedBets);
        setLoading(false);
      }, 800);
    };
    
    fetchSavedBets();
  }, []);

  // Handle removing bet from slip
  const handleRemoveBet = (betId: string) => {
    setSelectedBets(selectedBets.filter(bet => bet.id !== betId));
  };

  // Handle clearing all bets
  const handleClearAll = () => {
    setSelectedBets([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="mb-8 flex items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Your Betting Slip</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedBets.length === 0 && !loading ? (
              <div className="glass-card rounded-xl p-16 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Brain className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Your betting slip is empty</h2>
                <p className="text-muted-foreground mb-6">Browse games and add some bets to your slip.</p>
                <Link to="/">
                  <Button>Browse Games</Button>
                </Link>
              </div>
            ) : (
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">AI Betting Recommendations</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-secondary/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Parlay Opportunity</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Based on your selections, our AI system suggests a 2-leg parlay with an enhanced payout ratio of +420. Historical success rate for similar parlays is 32%.
                    </p>
                    <Button variant="outline" size="sm">Apply Recommendation</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-secondary/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Stake Optimization</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      For optimal returns based on confidence levels, AI recommends distributing 70% of your budget to the moneyline bet and 30% to the spread bet.
                    </p>
                    <Button variant="outline" size="sm">Apply Distribution</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
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

export default BettingSlipPage;
