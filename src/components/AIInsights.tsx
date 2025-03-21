
import { useState, useEffect } from "react";
import { Brain, Activity, Target, ChartBar } from "lucide-react";

interface InsightType {
  id: string;
  type: "prediction" | "trend" | "analysis";
  title: string;
  description: string;
  confidence: number;
  icon: JSX.Element;
}

interface AIInsightsProps {
  gameId?: string;
  teamId?: string;
  loading?: boolean;
}

const AIInsights = ({ gameId, teamId, loading = false }: AIInsightsProps) => {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(loading);

  // Mock fetching insights
  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockInsights: InsightType[] = [
          {
            id: "ins1",
            type: "prediction",
            title: "Higher Success Rate for Three-Pointers",
            description: "The Lakers have a 38% higher success rate for three-pointers in the first quarter compared to their season average. Consider betting on their early game performance.",
            confidence: 87,
            icon: <Target className="h-5 w-5" />,
          },
          {
            id: "ins2",
            type: "trend",
            title: "Heat Defensive Performance",
            description: "The Miami Heat's defensive efficiency drops by 12% in the third quarter based on the last 5 games. This pattern suggests a potential scoring opportunity for opponents.",
            confidence: 76,
            icon: <Activity className="h-5 w-5" />,
          },
          {
            id: "ins3",
            type: "analysis",
            title: "Player Matchup Advantage",
            description: "Steph Curry's shooting percentage increases by 15% when matched against this particular defensive lineup. Look for scoring opportunities in these matchups.",
            confidence: 92,
            icon: <ChartBar className="h-5 w-5" />,
          },
        ];
        
        setInsights(mockInsights);
        setActiveInsight(mockInsights[0].id);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchInsights();
  }, [gameId, teamId]);

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6 animate-pulse space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-muted"></div>
          <div className="h-6 w-40 bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
        </div>
        <div className="h-4 w-20 bg-muted rounded"></div>
      </div>
    );
  }

  const getActiveInsight = () => {
    if (!activeInsight) return null;
    return insights.find((insight) => insight.id === activeInsight);
  };

  const currentInsight = getActiveInsight();

  return (
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">AI Insights</h3>
      </div>
      
      {insights.length > 0 ? (
        <>
          <div className="flex space-x-2 overflow-x-auto py-2 mb-4 scrollbar-thin">
            {insights.map((insight) => (
              <button
                key={insight.id}
                onClick={() => setActiveInsight(insight.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeInsight === insight.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {insight.title}
              </button>
            ))}
          </div>
          
          {currentInsight && (
            <div className="animate-fade-in space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  {currentInsight.icon}
                </div>
                <span className="pill pill-primary">{currentInsight.type}</span>
                <div className="ml-auto flex items-center space-x-1">
                  <span className="text-sm font-medium">Confidence:</span>
                  <span className="text-sm font-bold text-primary">{currentInsight.confidence}%</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {currentInsight.description}
              </p>
              
              <div className="w-full bg-muted h-2 rounded-full">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-500" 
                  style={{ width: `${currentInsight.confidence}%` }}
                ></div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No insights available for this game yet.</p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
