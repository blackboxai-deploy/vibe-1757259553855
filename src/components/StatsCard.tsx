"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  color: "red" | "blue" | "yellow" | "purple" | "green";
  trend?: string;
}

const colorClasses = {
  red: {
    border: "border-red-500/30",
    hoverBorder: "hover:border-red-500",
    text: "text-red-400",
    gradient: "from-red-500/10 to-red-900/10"
  },
  blue: {
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500",
    text: "text-blue-400",
    gradient: "from-blue-500/10 to-blue-900/10"
  },
  yellow: {
    border: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-500",
    text: "text-yellow-400",
    gradient: "from-yellow-500/10 to-yellow-900/10"
  },
  purple: {
    border: "border-purple-500/30",
    hoverBorder: "hover:border-purple-500",
    text: "text-purple-400",
    gradient: "from-purple-500/10 to-purple-900/10"
  },
  green: {
    border: "border-green-500/30",
    hoverBorder: "hover:border-green-500",
    text: "text-green-400",
    gradient: "from-green-500/10 to-green-900/10"
  }
};

export function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`bg-black/80 backdrop-blur-md ${colorClass.border} ${colorClass.hoverBorder} transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-${color}-500/25`}>
      <CardContent className="p-6">
        <div className={`bg-gradient-to-br ${colorClass.gradient} rounded-lg p-4`}>
          {/* Icon and Title */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            <div className={`w-3 h-3 ${colorClass.text.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
          </div>
          
          {/* Value */}
          <div 
            className={`text-3xl md:text-4xl font-bold ${colorClass.text} mb-2`}
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {value}
          </div>
          
          {/* Title */}
          <div 
            className="text-gray-300 text-sm font-semibold tracking-wider uppercase mb-2"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {title}
          </div>
          
          {/* Trend */}
          {trend && (
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${colorClass.text.replace('text-', 'bg-')} rounded-full`}></div>
              <span className="text-xs text-gray-400">{trend}</span>
            </div>
          )}
          
          {/* Progress Bar Animation */}
          <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-1 ${colorClass.text.replace('text-', 'bg-')} rounded-full animate-pulse`}
              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}