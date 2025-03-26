
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import AIInsights from "../components/AIInsights";
import { Activity, Zap, Clock } from "lucide-react";

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

const LivePage = () => {
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data loading
  useEffect(() => {
    const fetchLiveGames = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const mockLiveGames: Game[] = [
          {
            id: "1",
            homeTeam: {
              id: "lal",
              name: "Los Angeles Lakers",
              abbreviation: "LAL",
              logo: "https://content.sportslogos.net/logos/6/17/thumbs/8621_los_angeles_lakers_-primary-2024.png",
              score: 92,
              winProbability: 0.68,
            },
            awayTeam: {
              id: "bos",
              name: "Boston Celtics",
              abbreviation: "BOS",
              logo: "https://content.sportslogos.net/logos/6/213/thumbs/boston_celtics_logo_primary_2023_sportslogosnet-5649.png",
              score: 85,
              winProbability: 0.32,
            },
            date: "Today",
            time: "Q4 6:18",
            status: "live",
            quarter: 4,
            timeRemaining: "6:18",
            aiRecommendation: "home",
          },
          {
            id: "3",
            homeTeam: {
              id: "bkn",
              name: "Brooklyn Nets",
              abbreviation: "BKN",
              logo: "https://content.sportslogos.net/logos/6/3786/thumbs/brooklyn_nets_logo_primary_2023_sportslogosnet-5907.png",
              score: 84,
              winProbability: 0.45,
            },
            awayTeam: {
              id: "mia",
              name: "Miami Heat",
              abbreviation: "MIA",
              logo: "https://content.sportslogos.net/logos/6/214/thumbs/burm5gh2wvjti3xhei5h16k8e.png",
              score: 91,
              winProbability: 0.55,
            },
            date: "Today",
            time: "Q4 3:42",
            status: "live",
            quarter: 4,
            timeRemaining: "3:42",
            aiRecommendation: "away",
          },
          {
            id: "4",
            homeTeam: {
              id: "den",
              name: "Denver Nuggets",
              abbreviation: "DEN",
              logo: "https://content.sportslogos.net/logos/6/229/thumbs/denver_nuggets_logo_primary_2019_sportslogosnet-3776.png",
              score: 68,
              winProbability: 0.63,
            },
            awayTeam: {
              id: "dal",
              name: "Dallas Mavericks",
              abbreviation: "DAL",
              logo: "https://content.sportslogos.net/logos/6/228/thumbs/22834632018.png",
              score: 59,
              winProbability: 0.37,
            },
            date: "Today",
            time: "Q3 8:15",
            status: "live",
            quarter: 3,
            timeRemaining: "8:15",
            aiRecommendation: "home",
          },
        ];

        setLiveGames(mockLiveGames);
        setLoading(false);
      }, 1000);
    };

    fetchLiveGames();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="page-container pt-24">
        {/* Hero Section */}
        <div className="pb-12">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">Live Games</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Real-time Basketball Action</h1>
          <p className="text-muted-foreground max-w-2xl">
            Watch live games and make in-play betting decisions with real-time analytics and AI insights.
          </p>
        </div>

        {/* Live Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-xl flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-medium">Live Updates</h3>
              <p className="text-sm text-muted-foreground">Real-time scores and stats</p>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">AI Predictions</h3>
              <p className="text-sm text-muted-foreground">Live win probability adjustments</p>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">In-Play Betting</h3>
              <p className="text-sm text-muted-foreground">Live odds and bet opportunities</p>
            </div>
          </div>
        </div>

        {/* Live Games Section */}
        <section className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title text-2xl font-semibold m-0">Live Games Now</h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-muted rounded-md mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                      <div className="h-6 bg-muted rounded w-8"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-muted rounded-md mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                      <div className="h-6 bg-muted rounded w-8"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : liveGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGames.map(game => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-card rounded-xl">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Live Games Right Now</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no live games at the moment. Check back later or explore upcoming games.
              </p>
            </div>
          )}
        </section>

        {/* AI Insights Section */}
        <section className="section-container mt-10">
          <AIInsights />
        </section>
      </div>
    </div>
  );
};

export default LivePage;
