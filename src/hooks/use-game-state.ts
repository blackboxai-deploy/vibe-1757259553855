"use client";

import { useState, useEffect, useCallback } from 'react';

export interface GameState {
  player: {
    id: string;
    name: string;
    level: number;
    xp: number;
    cash: number;
    reputation: number;
    currentCar: string | null;
    unlockedCars: string[];
    favoriteCars: string[];
    titles: string[];
    currentTitle: string | null;
  };
  stats: {
    racesWon: number;
    racesLost: number;
    totalRaces: number;
    bestLapTime: string | null;
    topSpeed: number;
    driftScore: number;
    policeEscapes: number;
    totalPlayTime: number; // seconds
  };
  achievements: string[];
  settings: {
    soundEnabled: boolean;
    musicVolume: number;
    sfxVolume: number;
    difficulty: 'Easy' | 'Normal' | 'Hard';
    units: 'Metric' | 'Imperial';
  };
}

const DEFAULT_GAME_STATE: GameState = {
  player: {
    id: 'player_001',
    name: 'Speed Demon',
    level: 15,
    xp: 12750,
    cash: 485000,
    reputation: 8420,
    currentCar: 'lamborghini-aventador',
    unlockedCars: [
      'lamborghini-aventador',
      'mclaren-720s', 
      'porsche-gt3rs',
      'nissan-gtr',
      'ford-gt'
    ],
    favoriteCars: ['lamborghini-aventador', 'porsche-gt3rs'],
    titles: [
      'Rookie Racer',
      'Street King',
      'Pro Racer',
      'Precision Driver'
    ],
    currentTitle: 'Pro Racer'
  },
  stats: {
    racesWon: 127,
    racesLost: 34,
    totalRaces: 161,
    bestLapTime: '1:23.45',
    topSpeed: 347,
    driftScore: 95420,
    policeEscapes: 23,
    totalPlayTime: 89640 // 24.9 hours
  },
  achievements: [
    'first-win',
    'speed-demon',
    'drift-master',
    'car-collector',
    'street-legend'
  ],
  settings: {
    soundEnabled: true,
    musicVolume: 0.7,
    sfxVolume: 0.8,
    difficulty: 'Normal',
    units: 'Metric'
  }
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [loading, setLoading] = useState(true);

  // Load game state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('nfs-game-state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState(parsed);
      }
    } catch (error) {
      console.warn('Failed to load game state from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('nfs-game-state', JSON.stringify(gameState));
      } catch (error) {
        console.warn('Failed to save game state to localStorage:', error);
      }
    }
  }, [gameState, loading]);

  // Player actions
  const updatePlayer = useCallback((updates: Partial<GameState['player']>) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, ...updates }
    }));
  }, []);

  const addCash = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, cash: prev.player.cash + amount }
    }));
  }, []);

  const spendCash = useCallback((amount: number) => {
    setGameState(prev => {
      const newCash = prev.player.cash - amount;
      if (newCash < 0) {
        throw new Error('Insufficient funds');
      }
      return {
        ...prev,
        player: { ...prev.player, cash: newCash }
      };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setGameState(prev => {
      const newXP = prev.player.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1; // 1000 XP per level
      
      return {
        ...prev,
        player: { 
          ...prev.player, 
          xp: newXP,
          level: Math.max(prev.player.level, newLevel)
        }
      };
    });
  }, []);

  const unlockCar = useCallback((carId: string) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        unlockedCars: prev.player.unlockedCars.includes(carId) 
          ? prev.player.unlockedCars 
          : [...prev.player.unlockedCars, carId]
      }
    }));
  }, []);

  const toggleFavoriteCar = useCallback((carId: string) => {
    setGameState(prev => {
      const isFavorite = prev.player.favoriteCars.includes(carId);
      return {
        ...prev,
        player: {
          ...prev.player,
          favoriteCars: isFavorite
            ? prev.player.favoriteCars.filter(id => id !== carId)
            : [...prev.player.favoriteCars, carId]
        }
      };
    });
  }, []);

  const selectCar = useCallback((carId: string) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, currentCar: carId }
    }));
  }, []);

  // Stats actions
  const updateStats = useCallback((updates: Partial<GameState['stats']>) => {
    setGameState(prev => ({
      ...prev,
      stats: { ...prev.stats, ...updates }
    }));
  }, []);

  const recordRaceResult = useCallback((result: {
    won: boolean;
    lapTime?: string;
    topSpeed?: number;
    driftScore?: number;
    cashEarned: number;
    xpEarned: number;
  }) => {
    setGameState(prev => {
      const newStats = {
        ...prev.stats,
        totalRaces: prev.stats.totalRaces + 1,
        racesWon: result.won ? prev.stats.racesWon + 1 : prev.stats.racesWon,
        racesLost: result.won ? prev.stats.racesLost : prev.stats.racesLost + 1,
      };

      // Update best lap time if better
      if (result.lapTime) {
        const currentBest = prev.stats.bestLapTime;
        if (!currentBest || result.lapTime < currentBest) {
          newStats.bestLapTime = result.lapTime;
        }
      }

      // Update top speed if higher
      if (result.topSpeed && result.topSpeed > prev.stats.topSpeed) {
        newStats.topSpeed = result.topSpeed;
      }

      // Update drift score if higher
      if (result.driftScore && result.driftScore > prev.stats.driftScore) {
        newStats.driftScore = result.driftScore;
      }

      return {
        ...prev,
        stats: newStats,
        player: {
          ...prev.player,
          cash: prev.player.cash + result.cashEarned,
          xp: prev.player.xp + result.xpEarned,
          level: Math.max(prev.player.level, Math.floor((prev.player.xp + result.xpEarned) / 1000) + 1)
        }
      };
    });
  }, []);

  // Achievement actions
  const unlockAchievement = useCallback((achievementId: string) => {
    setGameState(prev => ({
      ...prev,
      achievements: prev.achievements.includes(achievementId) 
        ? prev.achievements 
        : [...prev.achievements, achievementId]
    }));
  }, []);

  // Settings actions
  const updateSettings = useCallback((updates: Partial<GameState['settings']>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  }, []);

  // Utility functions
  const getWinRate = useCallback(() => {
    const total = gameState.stats.totalRaces;
    if (total === 0) return 0;
    return Math.round((gameState.stats.racesWon / total) * 100);
  }, [gameState.stats]);

  const getNextLevelXP = useCallback(() => {
    return (gameState.player.level * 1000) - gameState.player.xp;
  }, [gameState.player]);

  const canAfford = useCallback((amount: number) => {
    return gameState.player.cash >= amount;
  }, [gameState.player.cash]);

  const resetGameState = useCallback(() => {
    setGameState(DEFAULT_GAME_STATE);
    localStorage.removeItem('nfs-game-state');
  }, []);

  return {
    gameState,
    loading,
    // Player actions
    updatePlayer,
    addCash,
    spendCash,
    addXP,
    unlockCar,
    toggleFavoriteCar,
    selectCar,
    // Stats actions
    updateStats,
    recordRaceResult,
    // Achievement actions
    unlockAchievement,
    // Settings actions
    updateSettings,
    // Utility functions
    getWinRate,
    getNextLevelXP,
    canAfford,
    resetGameState
  };
}