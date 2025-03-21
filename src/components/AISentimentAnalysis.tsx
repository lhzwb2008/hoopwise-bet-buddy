
import { useState, useEffect } from "react";
import { MessageSquare, TrendingUp, TrendingDown, ArrowRight, Users, BarChart3 } from "lucide-react";

interface SentimentData {
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  topPositiveTopic: string;
  topNegativeTopic: string;
  trendDirection: "up" | "down" | "stable";
  volume: number;
  sources: {
    twitter: number;
    reddit: number;
    news: number;
    forums: number;
  };
}

interface BettingTrend {
  team: string;
  trend: number;
  direction: "up" | "down" | "stable";
}

interface AISentimentAnalysisProps {
  gameId?: string;
  team1Name?: string;
  team2Name?: string;
}

const AISentimentAnalysis = ({ gameId, team1Name = "Lakers", team2Name = "Celtics" }: AISentimentAnalysisProps) => {
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [bettingTrends, setBettingTrends] = useState<BettingTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSentimentData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockSentiment: SentimentData = {
          positivePercentage: 65,
          negativePercentage: 20,
          neutralPercentage: 15,
          topPositiveTopic: "Star player returning from injury",
          topNegativeTopic: "Recent losing streak concerns",
          trendDirection: "up",
          volume: 12500,
          sources: {
            twitter: 65,
            reddit: 20,
            news: 10,
            forums: 5
          }
        };
        
        const mockBettingTrends: BettingTrend[] = [
          {
            team: team1Name,
            trend: 58,
            direction: "up"
          },
          {
            team: team2Name,
            trend: 42,
            direction: "down"
          }
        ];
        
        setSentiment(mockSentiment);
        setBettingTrends(mockBettingTrends);
        setIsLoading(false);
      }, 1500);
    };
    
    fetchSentimentData();
  }, [gameId, team1Name, team2Name]);

  const getTrendIcon = (direction: "up" | "down" | "stable") => {
    switch (direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <ArrowRight className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6 animate-pulse space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div className="h-6 w-40 bg-muted rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-muted rounded-lg"></div>
          <div className="h-24 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">AI Fan Sentiment Analysis</h3>
      </div>
      
      {sentiment && (
        <div className="space-y-6">
          {/* Sentiment Overview */}
          <div className="bg-secondary/40 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Fan Sentiment Overview</h4>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{sentiment.volume.toLocaleString()} data points</span>
              </div>
            </div>
            
            <div className="flex w-full h-5 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-green-500 flex items-center justify-center"
                style={{ width: `${sentiment.positivePercentage}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {sentiment.positivePercentage > 15 ? `${sentiment.positivePercentage}%` : ''}
                </span>
              </div>
              <div 
                className="bg-gray-400 flex items-center justify-center"
                style={{ width: `${sentiment.neutralPercentage}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {sentiment.neutralPercentage > 15 ? `${sentiment.neutralPercentage}%` : ''}
                </span>
              </div>
              <div 
                className="bg-red-500 flex items-center justify-center"
                style={{ width: `${sentiment.negativePercentage}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {sentiment.negativePercentage > 15 ? `${sentiment.negativePercentage}%` : ''}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Positive</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Neutral</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Negative</span>
              </div>
            </div>
          </div>
          
          {/* Key Topics */}
          <div>
            <h4 className="font-medium text-sm mb-3">Key Topics Driving Sentiment</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Positive: {sentiment.topPositiveTopic}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Negative: {sentiment.topNegativeTopic}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Betting Trends */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Real-time Betting Trends</h4>
            </div>
            
            <div className="space-y-3">
              {bettingTrends.map((trend, index) => (
                <div key={index} className="bg-secondary/40 rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{trend.team}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(trend.direction)}
                      <span className="text-sm font-bold">{trend.trend}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div 
                      className={`h-full rounded-full ${index === 0 ? 'bg-primary' : 'bg-muted-foreground'}`}
                      style={{ width: `${trend.trend}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data Sources */}
          <div>
            <h4 className="font-medium text-xs text-muted-foreground mb-2">Data Sources</h4>
            <div className="flex space-x-2 text-xs text-muted-foreground">
              <span>Twitter {sentiment.sources.twitter}%</span>
              <span>•</span>
              <span>Reddit {sentiment.sources.reddit}%</span>
              <span>•</span>
              <span>News {sentiment.sources.news}%</span>
              <span>•</span>
              <span>Forums {sentiment.sources.forums}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISentimentAnalysis;
