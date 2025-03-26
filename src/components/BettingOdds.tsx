
import { useState, useEffect } from 'react';
import { Target, Plus, Check, Brain, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  aiConfidence?: number;
  aiRecommended?: boolean;
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
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Simulate AI analysis
  useEffect(() => {
    if (showAIRecommendations) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedBetType, showAIRecommendations]);

  // Mock bet options based on the selected type with AI recommendations
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
            aiConfidence: 42,
            aiRecommended: false,
          },
          {
            id: `${gameId}-moneyline-home`,
            type: 'moneyline',
            team: homeTeam,
            odds: -160,
            description: `${homeTeam.name} to win`,
            aiConfidence: 75,
            aiRecommended: true,
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
            aiConfidence: 68,
            aiRecommended: true,
          },
          {
            id: `${gameId}-spread-home`,
            type: 'spread',
            team: homeTeam,
            odds: -110,
            value: '-5.5',
            description: `${homeTeam.name} -5.5`,
            aiConfidence: 48,
            aiRecommended: false,
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
            aiConfidence: 82,
            aiRecommended: true,
          },
          {
            id: `${gameId}-total-under`,
            type: 'total',
            odds: -110,
            value: 'Under 224.5',
            description: 'Under 224.5 points',
            aiConfidence: 35,
            aiRecommended: false,
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
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-1 text-sm">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-adjusted odds</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 flex items-center gap-1"
              onClick={() => setShowAIRecommendations(!showAIRecommendations)}
            >
              <Brain className="h-3.5 w-3.5" />
              {showAIRecommendations ? 'Hide AI' : 'Show AI'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {isAnalyzing ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Analyzing odds...</p>
              </div>
            </div>
          ) : (
            betOptions.map((bet) => {
              const isSelected = selectedBets.includes(bet.id);
              
              return (
                <div
                  key={bet.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : bet.aiRecommended && showAIRecommendations
                        ? 'border-primary/30 bg-primary/5' 
                        : 'border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{bet.description}</p>
                        {bet.aiRecommended && showAIRecommendations && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                  <Brain className="h-3 w-3 mr-0.5" />
                                  AI Pick
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>AI recommends this bet based on historical data and current form</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex items-center mt-1 gap-3">
                        <div className={`text-sm font-medium ${bet.odds > 0 ? 'text-green-600' : 'text-destructive'}`}>
                          {formatOdds(bet.odds)}
                        </div>
                        
                        {showAIRecommendations && bet.aiConfidence && (
                          <div className="flex items-center">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <span className="mr-1">AI Confidence:</span>
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    bet.aiConfidence > 75 ? 'bg-green-500' : 
                                    bet.aiConfidence > 50 ? 'bg-primary' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${bet.aiConfidence}%` }}
                                ></div>
                              </div>
                              <span className="ml-1">{bet.aiConfidence}%</span>
                            </div>
                          </div>
                        )}
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BettingOdds;
