"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useGameState } from "@/hooks/use-game-state";
import { StatsCard } from "@/components/StatsCard";

export default function ProfilePage() {
  const { gameState, getWinRate, getNextLevelXP } = useGameState();

  const achievements = [
    { id: 'first-win', name: 'First Victory', description: 'Win your first race', icon: '🏆', rarity: 'Common' },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Reach 300+ km/h', icon: '⚡', rarity: 'Rare' },
    { id: 'drift-master', name: 'Drift Master', description: 'Score 50,000+ drift points', icon: '🌪️', rarity: 'Epic' },
    { id: 'car-collector', name: 'Car Collector', description: 'Own 10+ supercars', icon: '🚗', rarity: 'Rare' },
    { id: 'street-legend', name: 'Street Legend', description: 'Win 100+ races', icon: '👑', rarity: 'Legendary' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              DRIVER PROFILE
            </h1>
          </div>

          {/* Player Card */}
          <Card className="bg-black/80 backdrop-blur-md border-purple-500/30 mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl">
                  🏎️
                </div>

                {/* Player Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h2 
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {gameState.player.name}
                    </h2>
                    {gameState.player.currentTitle && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-lg px-4 py-1">
                        {gameState.player.currentTitle}
                      </Badge>
                    )}
                  </div>

                  {/* Level Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Level {gameState.player.level}</span>
                      <span className="text-gray-300">{getNextLevelXP()} XP to next level</span>
                    </div>
                    <Progress 
                      value={(gameState.player.xp % 1000) / 10} 
                      className="h-3"
                    />
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-green-400 mb-1"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        ${(gameState.player.cash / 1000).toFixed(0)}K
                      </div>
                      <div className="text-gray-400 text-sm uppercase tracking-wider">Cash</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-blue-400 mb-1"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {gameState.player.reputation.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-sm uppercase tracking-wider">Reputation</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-purple-400 mb-1"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {gameState.player.unlockedCars.length}
                      </div>
                      <div className="text-gray-400 text-sm uppercase tracking-wider">Cars Owned</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-red-400 mb-1"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {getWinRate()}%
                      </div>
                      <div className="text-gray-400 text-sm uppercase tracking-wider">Win Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            RACING STATISTICS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="RACES WON"
              value={gameState.stats.racesWon.toString()}
              icon="🏆"
              color="green"
              trend={`${gameState.stats.totalRaces} total races`}
            />
            <StatsCard
              title="BEST LAP TIME"
              value={gameState.stats.bestLapTime || "N/A"}
              icon="⏱️"
              color="blue"
              trend="Personal record"
            />
            <StatsCard
              title="TOP SPEED"
              value={`${gameState.stats.topSpeed} KM/H`}
              icon="⚡"
              color="red"
              trend="Maximum achieved"
            />
            <StatsCard
              title="DRIFT SCORE"
              value={gameState.stats.driftScore.toLocaleString()}
              icon="🌪️"
              color="purple"
              trend="Highest combo"
            />
          </div>

          {/* Additional Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  RACING RECORD
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.stats.racesWon}
                    </div>
                    <div className="text-gray-300 text-sm">Wins</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.stats.racesLost}
                    </div>
                    <div className="text-gray-300 text-sm">Losses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {getWinRate()}% Win Rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  SPECIAL ACHIEVEMENTS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.stats.policeEscapes}
                    </div>
                    <div className="text-gray-300 text-sm">Police Escapes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.achievements.length}
                    </div>
                    <div className="text-gray-300 text-sm">Unlocked Achievements</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {formatPlayTime(gameState.stats.totalPlayTime)}
                    </div>
                    <div className="text-gray-300 text-sm">Total Play Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  COLLECTION STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.player.unlockedCars.length}
                    </div>
                    <div className="text-gray-300 text-sm">Cars Owned</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.player.favoriteCars.length}
                    </div>
                    <div className="text-gray-300 text-sm">Favorites</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {gameState.player.titles.length}
                    </div>
                    <div className="text-gray-300 text-sm">Titles Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            ACHIEVEMENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const isUnlocked = gameState.achievements.includes(achievement.id);
              
              return (
                <Card 
                  key={achievement.id} 
                  className={`${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30' 
                      : 'bg-black/60 border-gray-700 opacity-60'
                  } transform hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">
                      {isUnlocked ? achievement.icon : '🔒'}
                    </div>
                    <h3 
                      className={`text-xl font-bold mb-2 ${
                        isUnlocked ? 'text-yellow-400' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {achievement.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {achievement.description}
                    </p>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}