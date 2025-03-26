
import React from 'react';
import { Activity, Calendar, CheckCircle } from 'lucide-react';

interface GameStatusIndicatorProps {
  status: 'scheduled' | 'live' | 'final';
  currentQuarter?: number;
  timeRemaining?: string;
  startTime?: string;
}

const GameStatusIndicator = ({ 
  status, 
  currentQuarter, 
  timeRemaining, 
  startTime 
}: GameStatusIndicatorProps) => {
  if (status === 'live') {
    return (
      <div className="flex items-center space-x-2">
        <div className="pill pill-live flex items-center">
          <Activity className="w-3 h-3 mr-1" />
          <span>LIVE</span>
        </div>
        <span className="text-sm font-medium text-destructive">{`Q${currentQuarter} · ${timeRemaining}`}</span>
      </div>
    );
  } else if (status === 'scheduled') {
    return (
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <div className="text-sm font-medium text-muted-foreground">
          Starting {startTime}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-2">
        <div className="pill pill-muted flex items-center">
          <CheckCircle className="w-3 h-3 mr-1" />
          <span>FINAL</span>
        </div>
      </div>
    );
  }
};

export default GameStatusIndicator;
