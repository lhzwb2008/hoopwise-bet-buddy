
import { useState, useEffect } from "react";
import { Brain, Award, TrendingUp, BarChart2, LineChart, CircleCheck, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prediction {
  id: string;
  category: "player" | "team" | "game";
  title: string;
  description: string;
  probability: number;
  tags: string[];
  impact: "high" | "medium" | "low";
}

interface AIPredictionEngineProps {
  gameId?: string;
  refreshPredictions?: () => void;
}

const AIPredictionEngine = ({ gameId, refreshPredictions }: AIPredictionEngineProps) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "player" | "team" | "game">("all");
  const [confidenceThreshold, setConfidenceThreshold] = useState(60);

  // Mock fetch predictions
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockPredictions: Prediction[] = [
          {
            id: "pred1",
            category: "player",
            title: "LeBron James Triple-Double",
            description: "LeBron James has a high probability of achieving a triple-double tonight based on his performance in the last 5 games against this defensive lineup.",
            probability: 78,
            tags: ["player performance", "statistics", "triple-double"],
            impact: "high",
          },
          {
            id: "pred2",
            category: "team",
            title: "Third Quarter Surge",
            description: "The Lakers are expected to outperform in the third quarter, with a 15% higher scoring rate compared to their season average.",
            probability: 85,
            tags: ["quarter analysis", "scoring rate", "momentum"],
            impact: "medium",
          },
          {
            id: "pred3",
            category: "game",
            title: "Over/Under Analysis",
            description: "The total game score is predicted to go over 223.5 points with 75% confidence based on recent scoring trends and defensive matchups.",
            probability: 75,
            tags: ["over/under", "betting odds", "total score"],
            impact: "high",
          },
          {
            id: "pred4",
            category: "player",
            title: "Foul Trouble for Key Defender",
            description: "Boston's primary defender is likely to encounter foul trouble before halftime, potentially opening scoring opportunities for Lakers' forwards.",
            probability: 64,
            tags: ["fouls", "defense", "player restrictions"],
            impact: "medium",
          },
          {
            id: "pred5",
            category: "team",
            title: "Three-Point Shooting Performance",
            description: "The Celtics are likely to shoot below their season average from three-point range due to the Lakers' perimeter defense adjustments.",
            probability: 72,
            tags: ["three-pointers", "shooting percentage", "defense"],
            impact: "low",
          },
        ];
        
        setPredictions(mockPredictions);
        setIsLoading(false);
      }, 1200);
    };
    
    fetchPredictions();
  }, [gameId]);

  const filteredPredictions = predictions.filter(
    prediction => 
      (selectedCategory === "all" || prediction.category === selectedCategory) && 
      prediction.probability >= confidenceThreshold
  );

  const getImpactIcon = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return <CircleCheck className="h-4 w-4 text-green-500" />;
      case "medium":
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case "low":
        return <CircleAlert className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6 animate-pulse space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div className="h-6 w-48 bg-muted rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 animation-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">AI Prediction Engine</h3>
        <div className="ml-auto flex items-center space-x-2">
          <div className="ai-indicator"></div>
          <span className="text-xs font-medium text-muted-foreground">Analyzing live data</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            size="sm"
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "player" ? "default" : "outline"}
            onClick={() => setSelectedCategory("player")}
          >
            <Award className="mr-1 h-4 w-4" />
            Player
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "team" ? "default" : "outline"}
            onClick={() => setSelectedCategory("team")}
          >
            <BarChart2 className="mr-1 h-4 w-4" />
            Team
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === "game" ? "default" : "outline"}
            onClick={() => setSelectedCategory("game")}
          >
            <LineChart className="mr-1 h-4 w-4" />
            Game
          </Button>
        </div>

        <div className="space-y-2 mb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Confidence Threshold: {confidenceThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>

      {filteredPredictions.length > 0 ? (
        <div className="space-y-4">
          {filteredPredictions.map((prediction) => (
            <div key={prediction.id} className="p-4 bg-secondary/40 rounded-lg border border-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <span className="pill pill-primary mr-2">{prediction.category}</span>
                  <div className="flex items-center space-x-1">
                    {getImpactIcon(prediction.impact)}
                    <span className="text-xs">
                      {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)} Impact
                    </span>
                  </div>
                </div>
                <div className="text-sm font-bold text-primary">{prediction.probability}%</div>
              </div>
              
              <h4 className="font-medium mb-1">{prediction.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{prediction.description}</p>
              
              <div className="w-full bg-muted h-1.5 rounded-full mb-2">
                <div 
                  className={`h-full rounded-full ${
                    prediction.probability > 80 
                      ? 'bg-green-500' 
                      : prediction.probability > 65 
                        ? 'bg-primary' 
                        : 'bg-amber-500'
                  }`}
                  style={{ width: `${prediction.probability}%` }}
                ></div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {prediction.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No predictions match your current filters.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={() => {
              setSelectedCategory("all");
              setConfidenceThreshold(60);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIPredictionEngine;
