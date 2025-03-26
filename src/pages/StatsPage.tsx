
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, Users, Trophy, TrendingUp, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface Player {
  id: string;
  name: string;
  team: string;
  image: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    spg: number;
    bpg: number;
    fg: number;
    threeP: number;
    ft: number;
  };
}

interface TeamStat {
  name: string;
  abbr: string;
  value: number;
  color: string;
}

const StatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [playerStats, setPlayerStats] = useState<Player[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStat[]>([]);
  const [selectedStat, setSelectedStat] = useState("ppg");
  const [selectedTeamStat, setSelectedTeamStat] = useState("offense");

  const statLabels: Record<string, string> = {
    ppg: "Points Per Game",
    rpg: "Rebounds Per Game",
    apg: "Assists Per Game",
    spg: "Steals Per Game",
    bpg: "Blocks Per Game",
    fg: "Field Goal %",
    threeP: "3-Point %",
    ft: "Free Throw %",
  };

  // Mock team stats data
  const teamOffenseStats: TeamStat[] = [
    { name: "Los Angeles Lakers", abbr: "LAL", value: 115.8, color: "#552583" },
    { name: "Boston Celtics", abbr: "BOS", value: 118.2, color: "#007A33" },
    { name: "Golden State Warriors", abbr: "GSW", value: 113.5, color: "#1D428A" },
    { name: "Brooklyn Nets", abbr: "BKN", value: 110.2, color: "#000000" },
    { name: "Miami Heat", abbr: "MIA", value: 109.8, color: "#98002E" },
    { name: "Denver Nuggets", abbr: "DEN", value: 114.6, color: "#0E2240" },
    { name: "Dallas Mavericks", abbr: "DAL", value: 112.9, color: "#00538C" },
    { name: "Chicago Bulls", abbr: "CHI", value: 108.6, color: "#CE1141" },
  ];

  const teamDefenseStats: TeamStat[] = [
    { name: "Los Angeles Lakers", abbr: "LAL", value: 106.2, color: "#552583" },
    { name: "Boston Celtics", abbr: "BOS", value: 103.5, color: "#007A33" },
    { name: "Golden State Warriors", abbr: "GSW", value: 109.8, color: "#1D428A" },
    { name: "Brooklyn Nets", abbr: "BKN", value: 111.3, color: "#000000" },
    { name: "Miami Heat", abbr: "MIA", value: 105.7, color: "#98002E" },
    { name: "Denver Nuggets", abbr: "DEN", value: 107.9, color: "#0E2240" },
    { name: "Dallas Mavericks", abbr: "DAL", value: 110.2, color: "#00538C" },
    { name: "Chicago Bulls", abbr: "CHI", value: 112.5, color: "#CE1141" },
  ];

  // Mock historical data for line chart
  const seasonalTrends = [
    { month: "Oct", ppg: 23.2, rpg: 6.8, apg: 5.1 },
    { month: "Nov", ppg: 24.5, rpg: 7.2, apg: 5.8 },
    { month: "Dec", ppg: 25.1, rpg: 7.1, apg: 6.2 },
    { month: "Jan", ppg: 26.3, rpg: 7.5, apg: 6.5 },
    { month: "Feb", ppg: 27.8, rpg: 7.8, apg: 6.9 },
    { month: "Mar", ppg: 28.2, rpg: 8.1, apg: 7.2 },
    { month: "Apr", ppg: 29.5, rpg: 8.4, apg: 7.8 },
  ];

  // Mock pie chart data
  const shotDistribution = [
    { name: "3-Pointers", value: 35 },
    { name: "Mid-Range", value: 25 },
    { name: "Paint", value: 40 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Mock data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const mockPlayers: Player[] = [
          {
            id: "1",
            name: "LeBron James",
            team: "LAL",
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
            stats: {
              ppg: 25.8,
              rpg: 7.5,
              apg: 8.3,
              spg: 1.5,
              bpg: 0.9,
              fg: 54.2,
              threeP: 38.6,
              ft: 75.8
            }
          },
          {
            id: "2",
            name: "Kevin Durant",
            team: "PHX",
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png",
            stats: {
              ppg: 27.3,
              rpg: 6.8,
              apg: 5.2,
              spg: 0.9,
              bpg: 1.2,
              fg: 53.7,
              threeP: 42.1,
              ft: 89.5
            }
          },
          {
            id: "3",
            name: "Stephen Curry",
            team: "GSW",
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
            stats: {
              ppg: 28.7,
              rpg: 5.5,
              apg: 6.1,
              spg: 1.3,
              bpg: 0.4,
              fg: 48.2,
              threeP: 43.8,
              ft: 91.2
            }
          },
          {
            id: "4",
            name: "Giannis Antetokounmpo",
            team: "MIL",
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png",
            stats: {
              ppg: 29.5,
              rpg: 11.2,
              apg: 5.8,
              spg: 1.1,
              bpg: 1.8,
              fg: 57.8,
              threeP: 31.5,
              ft: 68.9
            }
          },
          {
            id: "5",
            name: "Nikola Jokic",
            team: "DEN",
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
            stats: {
              ppg: 24.8,
              rpg: 12.5,
              apg: 9.7,
              spg: 1.4,
              bpg: 0.8,
              fg: 56.3,
              threeP: 35.2,
              ft: 82.7
            }
          },
        ];

        setPlayerStats(mockPlayers);
        setTeamStats(teamOffenseStats);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Handler for team stat toggle
  const handleTeamStatChange = (stat: string) => {
    setSelectedTeamStat(stat);
    setTeamStats(stat === "offense" ? teamOffenseStats : teamDefenseStats);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="page-container pt-24">
        {/* Hero Section */}
        <div className="pb-10">
          <div className="flex items-center space-x-2 mb-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Statistics</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Basketball Analytics</h1>
          <p className="text-muted-foreground max-w-2xl">
            Dive deep into player and team statistics to make informed betting decisions.
          </p>
        </div>

        {/* Stats Tabs */}
        <Tabs defaultValue="players" className="w-full mb-8">
          <TabsList className="w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="players" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Player Stats</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Team Stats</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Player Stats Content */}
          <TabsContent value="players" className="mt-6">
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Leading Players</h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select 
                    className="bg-transparent border-none text-sm focus:outline-none"
                    value={selectedStat}
                    onChange={(e) => setSelectedStat(e.target.value)}
                  >
                    {Object.entries(statLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/4"></div>
                      </div>
                      <div className="h-6 bg-muted rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {playerStats
                    .sort((a, b) => {
                      const statA = a.stats[selectedStat as keyof typeof a.stats];
                      const statB = b.stats[selectedStat as keyof typeof b.stats];
                      return statB - statA;
                    })
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-muted flex-shrink-0">
                          <img 
                            src={player.image} 
                            alt={player.name} 
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-muted-foreground mr-2">{index + 1}</span>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.team}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">
                          {player.stats[selectedStat as keyof typeof player.stats]}
                          {selectedStat.includes("pg") ? "" : "%"}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            
            {/* Player Trends Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Seasonal Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seasonalTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 145, 150, 0.2)" />
                      <XAxis dataKey="month" fontSize={12} />
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
                      <Legend />
                      <Line type="monotone" dataKey="ppg" stroke="#8884d8" activeDot={{ r: 8 }} name="Points" />
                      <Line type="monotone" dataKey="rpg" stroke="#82ca9d" name="Rebounds" />
                      <Line type="monotone" dataKey="apg" stroke="#ffc658" name="Assists" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Shot Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shotDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {shotDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid rgba(142, 145, 150, 0.2)',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Team Stats Content */}
          <TabsContent value="teams" className="mt-6">
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Team Rankings</h2>
                <div className="flex">
                  <Button
                    variant={selectedTeamStat === "offense" ? "default" : "outline"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => handleTeamStatChange("offense")}
                  >
                    Offense (PPG)
                  </Button>
                  <Button
                    variant={selectedTeamStat === "defense" ? "default" : "outline"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => handleTeamStatChange("defense")}
                  >
                    Defense (OPP PPG)
                  </Button>
                </div>
              </div>
              
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={teamStats.sort((a, b) => 
                      selectedTeamStat === "offense" 
                        ? b.value - a.value 
                        : a.value - b.value
                    )}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 145, 150, 0.2)" />
                    <XAxis type="number" fontSize={12} />
                    <YAxis 
                      dataKey="abbr" 
                      type="category" 
                      fontSize={12} 
                      width={40}
                      tick={{ fill: 'currentColor' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(142, 145, 150, 0.2)',
                        borderRadius: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        fontSize: '12px'
                      }}
                      formatter={(value, name, props) => [`${value} PPG`, props.payload.name]}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                      label={{ 
                        position: 'right', 
                        formatter: (val) => val.toFixed(1),
                        fill: 'currentColor',
                        fontSize: 12
                      }}
                    >
                      {teamStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Team Performance Insights */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Performance Insights</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Analysis of key performance metrics to identify betting opportunities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5">
                  <h4 className="font-medium mb-2">Offense vs Defense Correlation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Teams with high offensive ratings tend to go over the total points line 62% of the time.
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">62%</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-5">
                  <h4 className="font-medium mb-2">Home Court Advantage</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Home teams with top 5 defensive ratings cover the spread 58% of the time.
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: '58%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">58%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StatsPage;
