"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RACE_MODES } from "@/lib/race-modes";
import Link from "next/link";

export default function RacesPage() {
  const [playerLevel] = useState(15); // Mock player level
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Extreme': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isRaceModeAvailable = (raceMode: typeof RACE_MODES[0]) => {
    return !raceMode.requirements.minLevel || playerLevel >= raceMode.requirements.minLevel;
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              RACE MODES
            </h1>
            <p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Choose your racing style and dominate the streets, circuits, and everything in between
            </p>
          </div>

          {/* Player Level Display */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/60 backdrop-blur-md px-8 py-4 rounded-lg border border-blue-500/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                  LEVEL {playerLevel}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">PRO RACER</div>
                <Progress value={75} className="mt-2 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Race Modes Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RACE_MODES.map((raceMode) => {
              const available = isRaceModeAvailable(raceMode);
              
              return (
                <Card 
                  key={raceMode.id} 
                  className={`bg-black/80 backdrop-blur-md border transition-all duration-300 transform hover:scale-105 ${
                    available 
                      ? 'border-gray-700 hover:border-blue-500' 
                      : 'border-gray-800 opacity-60'
                  }`}
                >
                  <CardHeader className="p-0">
                    {/* Hero Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div 
                        className={`w-full h-64 bg-gradient-to-br ${raceMode.gradientFrom} ${raceMode.gradientTo} flex items-center justify-center`}
                        style={{
                          backgroundImage: `url('${raceMode.tracks[0]?.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative text-center text-white z-10">
                          <div className="text-6xl mb-4">{raceMode.icon}</div>
                          <h2 
                            className="text-4xl font-bold"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {raceMode.title}
                          </h2>
                        </div>
                      </div>

                      {/* Lock Overlay */}
                      {!available && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🔒</div>
                            <div className="text-white font-bold">LEVEL {raceMode.requirements.minLevel} REQUIRED</div>
                          </div>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={getDifficultyColor(raceMode.difficulty)}>
                          {raceMode.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-6">{raceMode.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs uppercase tracking-wide">Duration</div>
                        <div className="text-white font-bold">{Math.floor(raceMode.duration / 60)}:{(raceMode.duration % 60).toString().padStart(2, '0')}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs uppercase tracking-wide">Tracks</div>
                        <div className="text-white font-bold">{raceMode.tracks.length}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs uppercase tracking-wide">Cash Reward</div>
                        <div className="text-green-400 font-bold">${(raceMode.rewards.cash / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs uppercase tracking-wide">XP Reward</div>
                        <div className="text-blue-400 font-bold">{raceMode.rewards.xp.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Tracks Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Featured Tracks</h4>
                      <div className="space-y-2">
                        {raceMode.tracks.slice(0, 2).map((track) => (
                          <div key={track.id} className="flex items-center justify-between bg-gray-900/30 rounded-lg p-2">
                            <div>
                              <div className="text-white text-sm font-medium">{track.name}</div>
                              <div className="text-gray-400 text-xs">{track.location} • {track.length}km</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-400">Best: {track.bestTime}</div>
                              <div className="text-xs text-yellow-400">★★★★☆</div>
                            </div>
                          </div>
                        ))}
                        {raceMode.tracks.length > 2 && (
                          <div className="text-center text-gray-500 text-xs">
                            +{raceMode.tracks.length - 2} more tracks
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Unlock Requirements */}
                    {raceMode.requirements.category && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Car Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {raceMode.requirements.category.map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex gap-3">
                      {available ? (
                        <>
                          <Link href={`/race/${raceMode.id}`} className="flex-1">
                            <Button 
                              className={`w-full bg-gradient-to-r ${raceMode.gradientFrom} ${raceMode.gradientTo} hover:opacity-90 text-white font-bold`}
                              style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                              START RACE
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="px-4">
                            📊
                          </Button>
                        </>
                      ) : (
                        <Button 
                          className="w-full bg-gray-600 hover:bg-gray-700" 
                          disabled
                        >
                          🔒 LOCKED - LEVEL {raceMode.requirements.minLevel} REQUIRED
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            YOUR RACING STATS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  47
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Races Won</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  1:23.45
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Best Lap Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  89,420
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Drift Score</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-900/20 to-red-900/20 border-yellow-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  12
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Police Chases Won</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}