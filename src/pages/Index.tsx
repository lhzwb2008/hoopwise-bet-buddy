
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import AIInsights from "../components/AIInsights";
import AIPredictionEngine from "../components/AIPredictionEngine";
import AISentimentAnalysis from "../components/AISentimentAnalysis";
import { ChevronRight, Brain, Target, Activity } from "lucide-react";

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

const Index = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [featuredInsight, setFeaturedInsight] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Mock data loading
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const mockGames: Game[] = [
          {
            id: "1",
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
          },
          {
            id: "2",
            homeTeam: {
              id: "gsw",
              name: "Golden State Warriors",
              abbreviation: "GSW",
              logo: "https://content.sportslogos.net/logos/6/235/thumbs/23531522020.png",
              winProbability: 0.55,
            },
            awayTeam: {
              id: "phx",
              name: "Phoenix Suns",
              abbreviation: "PHX",
              logo: "https://content.sportslogos.net/logos/6/238/thumbs/phoenix_suns_logo_primary_2023_sportslogosnet-7324.png",
              winProbability: 0.45,
            },
            date: "Today",
            time: "7:30 PM",
            status: "scheduled",
            aiRecommendation: "home",
          },
        ];

        setGames(mockGames);
        setFeaturedInsight("Lakers showing strong 3rd quarter performance trends, suggesting high win probability.");
        setLoading(false);
      }, 1000);
    };

    fetchGames();
  }, []);

  const liveGames = games.filter(game => game.status === "live");
  const upcomingGames = games.filter(game => game.status === "scheduled");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Insights</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Basketball Betting</h1>
          <p className="text-muted-foreground max-w-2xl">
            Make data-driven betting decisions with our AI-powered analytics and real-time insights.
          </p>
        </div>
      </div>

      <div className="page-container">
        {/* Featured AI Insight */}
        {featuredInsight && (
          <div className="glass-card p-6 rounded-xl mb-8 flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="ai-indicator"></div>
                <span className="text-sm font-medium">Featured Insight</span>
              </div>
              <p className="text-muted-foreground">{featuredInsight}</p>
            </div>
          </div>
        )}

        {/* Live Games Section */}
        {liveGames.length > 0 && (
          <section className="section-container">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-destructive" />
                <h2 className="section-title text-2xl font-semibold m-0">Live Games</h2>
              </div>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGames.map(game => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Games Section */}
        <section className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title text-2xl font-semibold m-0">Upcoming Games</h2>
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingGames.map(game => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>

        {/* AI Components Section */}
        <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIPredictionEngine />
            <AISentimentAnalysis />
          </div>
        </section>

        {/* AI Insights Section */}
        <section className="section-container">
          <AIInsights />
        </section>
      </div>
    </div>
  );
};

export default Index;
