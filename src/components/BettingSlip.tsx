
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { X, DollarSign, Wallet } from 'lucide-react';
import { useForm } from 'react-hook-form';

export interface BetOption {
  id: string;
  type: 'moneyline' | 'spread' | 'total';
  team?: {
    id: string;
    name: string;
    abbreviation: string;
  };
  odds: number;
  value?: number | string;
  description: string;
}

interface BettingSlipProps {
  selectedBets: BetOption[];
  onRemoveBet: (betId: string) => void;
  onClearAll: () => void;
}

const BettingSlip = ({ selectedBets, onRemoveBet, onClearAll }: BettingSlipProps) => {
  const [potentialWinnings, setPotentialWinnings] = useState<Record<string, number>>({});
  const [totalStake, setTotalStake] = useState(0);
  const [totalPotentialWin, setTotalPotentialWin] = useState(0);

  const form = useForm({
    defaultValues: selectedBets.reduce((acc, bet) => {
      acc[bet.id] = '0';
      return acc;
    }, {} as Record<string, string>),
  });

  // Calculate potential winnings based on odds and stake
  const calculateWinnings = (stake: number, odds: number): number => {
    if (stake <= 0) return 0;
    return odds > 0 
      ? stake * (odds / 100) 
      : stake * (100 / Math.abs(odds));
  };

  // Handle stake change
  const handleStakeChange = (betId: string, value: string) => {
    const stake = parseFloat(value) || 0;
    const bet = selectedBets.find(b => b.id === betId);
    
    if (bet) {
      const winnings = calculateWinnings(stake, bet.odds);
      
      // Update individual bet winnings
      setPotentialWinnings(prev => ({
        ...prev,
        [betId]: parseFloat(winnings.toFixed(2))
      }));
      
      // Update total stake and potential winnings
      const newTotalStake = Object.values(form.getValues()).reduce(
        (sum, value) => sum + (parseFloat(value) || 0), 
        0
      );
      
      const newTotalWinnings = selectedBets.reduce((sum, bet) => {
        const betStake = parseFloat(form.getValues()[bet.id]) || 0;
        return sum + calculateWinnings(betStake, bet.odds);
      }, 0);
      
      setTotalStake(parseFloat(newTotalStake.toFixed(2)));
      setTotalPotentialWin(parseFloat(newTotalWinnings.toFixed(2)));
    }
  };

  // Format odds for display
  const formatOdds = (odds: number): string => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would send the bet to a backend
    console.log('Placing bets:', 
      selectedBets.map(bet => ({
        ...bet,
        stake: parseFloat(form.getValues()[bet.id]) || 0,
        potentialWin: potentialWinnings[bet.id] || 0
      }))
    );
    
    // Show success message or redirect
    alert('Bets placed successfully!');
    
    // Clear the slip
    onClearAll();
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          <h2 className="font-medium">Betting Slip</h2>
        </div>
        {selectedBets.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 bg-transparent hover:bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="p-4">
        {selectedBets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Your betting slip is empty</p>
            <p className="text-sm mt-1">Select some odds to start betting</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedBets.map((bet) => (
              <div key={bet.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{bet.description}</p>
                    <p className={`text-sm font-medium ${bet.odds > 0 ? 'text-green-600' : 'text-destructive'}`}>
                      {formatOdds(bet.odds)}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => onRemoveBet(bet.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-3">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <FormLabel htmlFor={bet.id} className="text-xs">Stake ($)</FormLabel>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <Input
                          id={bet.id}
                          type="number"
                          min="0"
                          step="0.01"
                          className="h-9"
                          placeholder="0.00"
                          value={form.watch(bet.id)}
                          onChange={(e) => {
                            form.setValue(bet.id, e.target.value);
                            handleStakeChange(bet.id, e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-24">
                      <FormLabel className="text-xs">Potential Win</FormLabel>
                      <p className="font-medium text-green-600">
                        ${potentialWinnings[bet.id]?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Total Stake:</span>
                <span className="font-medium">${totalStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Potential Return:</span>
                <span className="font-medium text-green-600">${(totalStake + totalPotentialWin).toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full mt-4" 
              onClick={handleSubmit}
              disabled={totalStake <= 0}
            >
              Place Bets
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingSlip;
