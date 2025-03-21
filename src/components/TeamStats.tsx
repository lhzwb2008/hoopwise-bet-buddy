
import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { ChartBar } from 'lucide-react';

interface TeamStatsProps {
  teamId: string;
  comparison?: boolean;
  opponentId?: string;
}

interface StatData {
  name: string;
  team: number;
  opponent?: number;
  league?: number;
}

const TeamStats = ({ teamId, comparison = false, opponentId }: TeamStatsProps) => {
  const [stats, setStats] = useState<StatData[]>([]);
  const [formData, setFormData] = useState<{ date: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock fetching team stats
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Mock stats data
        const mockStats: StatData[] = [
          { name: 'PPG', team: 112.5, opponent: 108.2, league: 106.8 },
          { name: '3PT%', team: 37.8, opponent: 35.2, league: 36.1 },
          { name: 'FG%', team: 47.5, opponent: 45.1, league: 46.2 },
          { name: 'AST', team: 25.3, opponent: 23.1, league: 24.5 },
          { name: 'REB', team: 44.7, opponent: 42.8, league: 43.2 },
        ];
        
        // Mock form data (last 10 games)
        const mockForm = Array.from({ length: 10 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (9 - i));
          
          return {
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            value: Math.floor(Math.random() * 30) + 85, // Random score between 85-115
          };
        });
        
        setStats(mockStats);
        setFormData(mockForm);
        setLoading(false);
      }, 800);
    };
    
    fetchStats();
  }, [teamId, opponentId]);

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-6 animate-pulse space-y-4">
        <div className="h-6 w-40 bg-muted rounded"></div>
        <div className="h-[200px] w-full bg-muted rounded"></div>
      </div>
    );
  }

  const getBarFill = (dataKey: string) => {
    switch (dataKey) {
      case 'team':
        return 'hsl(var(--primary))';
      case 'opponent':
        return 'rgba(234, 56, 76, 0.7)';
      case 'league':
        return 'rgba(142, 145, 150, 0.5)';
      default:
        return 'hsl(var(--primary))';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <ChartBar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Team Statistics</h3>
      </div>
      
      <div className="space-y-8">
        {/* Key Stats Comparison */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Key Statistics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 145, 150, 0.2)" />
                <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                <YAxis fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(142, 145, 150, 0.2)',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="team" fill={getBarFill('team')} radius={[4, 4, 0, 0]} />
                {comparison && <Bar dataKey="opponent" fill={getBarFill('opponent')} radius={[4, 4, 0, 0]} />}
                <Bar dataKey="league" fill={getBarFill('league')} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getBarFill('team') }}></div>
              <span className="text-xs">Team</span>
            </div>
            {comparison && (
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getBarFill('opponent') }}></div>
                <span className="text-xs">Opponent</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getBarFill('league') }}></div>
              <span className="text-xs">League Avg</span>
            </div>
          </div>
        </div>
        
        {/* Recent Form Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Recent Form (Last 10 Games)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 145, 150, 0.2)" />
                <XAxis dataKey="date" fontSize={12} tickMargin={10} />
                <YAxis fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(142, 145, 150, 0.2)',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value} PTS`, 'Score']}
                  labelFormatter={(label) => `Game: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
