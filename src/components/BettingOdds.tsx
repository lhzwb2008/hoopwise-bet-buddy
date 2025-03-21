
import { useState } from 'react';
import { Target, Plus, Check } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
}

interface BetOption {
  id: string;
  type: 'moneyline' | 'spread' | 'total';
  team?: Team;
  odds: number;
  value?: number | string;
  description: string;
}

interface BettingOddsProps {
  gameId: string;
  homeTeam: Team;
  awayTeam: Team;
  onAddBet?: (bet: BetOption) => void;
}

const BettingOdds = ({ gameId, homeTeam, awayTeam, onAddBet }: BettingOddsProps) => {
  const [selectedBetType, setSelectedBetType] = useState<'moneyline' | 'spread' | 'total'>('moneyline');
  const [selectedBets, setSelectedBets] = useState<string[]>([]);

  // Mock bet options based on the selected type
  const getBetOptions = (): BetOption[] => {
    switch (selectedBetType) {
      case 'moneyline':
        return [
          {
            id: `${gameId}-moneyline-away`,
            type: 'moneyline',
            team: awayTeam,
            odds: +180,
            description: `${awayTeam.name} to win`,
          },
          {
            id: `${gameId}-moneyline-home`,
            type: 'moneyline',
            team: homeTeam,
            odds: -160,
            description: `${homeTeam.name} to win`,
          },
        ];
      case 'spread':
        return [
          {
            id: `${gameId}-spread-away`,
            type: 'spread',
            team: awayTeam,
            odds: -110,
            value: '+5.5',
            description: `${awayTeam.name} +5.5`,
          },
          {
            id: `${gameId}-spread-home`,
            type: 'spread',
            team: homeTeam,
            odds: -110,
            value: '-5.5',
            description: `${homeTeam.name} -5.5`,
          },
        ];
      case 'total':
        return [
          {
            id: `${gameId}-total-over`,
            type: 'total',
            odds: -110,
            value: 'Over 224.5',
            description: 'Over 224.5 points',
          },
          {
            id: `${gameId}-total-under`,
            type: 'total',
            odds: -110,
            value: 'Under 224.5',
            description: 'Under 224.5 points',
          },
        ];
      default:
        return [];
    }
  };

  const betOptions = getBetOptions();

  // Format the odds display
  const formatOdds = (odds: number): string => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  // Handle adding bet to slip
  const handleAddBet = (bet: BetOption) => {
    if (selectedBets.includes(bet.id)) {
      setSelectedBets(selectedBets.filter(id => id !== bet.id));
    } else {
      setSelectedBets([...selectedBets, bet.id]);
    }
    
    if (onAddBet) {
      onAddBet(bet);
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden animation-fade-in">
      <div className="flex border-b border-border">
        {['moneyline', 'spread', 'total'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedBetType(type as any)}
            className={`flex-1 py-4 text-center transition-colors ${
              selectedBetType === type
                ? 'bg-primary/10 text-primary font-medium border-b-2 border-primary'
                : 'hover:bg-secondary/50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Available Bets</h3>
          <div className="flex items-center space-x-1 text-sm">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-adjusted odds</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {betOptions.map((bet) => {
            const isSelected = selectedBets.includes(bet.id);
            
            return (
              <div
                key={bet.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{bet.description}</p>
                    <div className="flex items-center mt-1">
                      <div className={`text-sm font-medium ${bet.odds > 0 ? 'text-green-600' : 'text-destructive'}`}>
                        {formatOdds(bet.odds)}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddBet(bet)}
                    className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                    aria-label={isSelected ? 'Remove from bet slip' : 'Add to bet slip'}
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>
                
                {isSelected && (
                  <div className="mt-2 text-xs text-primary animate-fade-in-fast">
                    Added to betting slip
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BettingOdds;
