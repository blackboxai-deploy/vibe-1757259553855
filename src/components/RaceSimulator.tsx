"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRaceTimer } from "@/hooks/use-race-timer";
import { useGameState } from "@/hooks/use-game-state";
import { getRaceModeById, getTrackById } from "@/lib/race-modes";
import { getCarById } from "@/lib/cars-data";

interface RaceSimulatorProps {
  raceId: string;
  trackId: string;
  carId: string;
  onRaceComplete: (result: {
    won: boolean;
    finalTime: string;
    bestLapTime: string | null;
    position: number;
    cashEarned: number;
    xpEarned: number;
  }) => void;
}

export function RaceSimulator({ raceId, trackId, carId, onRaceComplete }: RaceSimulatorProps) {
  const { gameState, recordRaceResult } = useGameState();
  const raceMode = getRaceModeById(raceId);
  const track = getTrackById(raceId, trackId);
  const car = getCarById(carId);
  
  const totalLaps = raceId === 'time-trial' ? 1 : 3;
  const {
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    completeLap,
    formatTime,
    formattedCurrentTime,
    formattedBestTime,
    canStart,
    canPause,
    canResume,
    getProgress
  } = useRaceTimer(totalLaps);

  const [raceState, setRaceState] = useState<'ready' | 'countdown' | 'racing' | 'finished'>('ready');
  const [countdown, setCountdown] = useState(3);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [position, setPosition] = useState(1);
  const [opponents] = useState([
    { name: "Lightning McQueen", position: 2, speed: 285 },
    { name: "Max Verstappen", position: 3, speed: 290 },
    { name: "Ayrton Senna", position: 4, speed: 280 }
  ]);

  // Race countdown
  useEffect(() => {
    if (raceState === 'countdown') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setRaceState('racing');
            startTimer();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [raceState, startTimer]);

  // Speed simulation
  useEffect(() => {
    if (raceState === 'racing' && timer.isRunning) {
      const speedInterval = setInterval(() => {
        setCurrentSpeed(prev => {
          const targetSpeed = car ? car.specs.topSpeed * 0.8 : 250;
          const acceleration = Math.random() * 20 - 10; // Random acceleration
          const newSpeed = Math.max(0, Math.min(targetSpeed, prev + acceleration));
          return Math.round(newSpeed);
        });
      }, 200);

      return () => clearInterval(speedInterval);
    }
  }, [raceState, timer.isRunning, car]);

  // Auto-complete laps based on timer
  useEffect(() => {
    if (raceState === 'racing' && timer.isRunning) {
      const lapDuration = track ? (track.length / currentSpeed) * 3600 * 1000 : 60000; // Rough calculation
      
      if (timer.currentTime > 0 && timer.currentTime % lapDuration < 1000 && timer.currentLap <= totalLaps) {
        completeLap();
      }
    }
  }, [timer.currentTime, timer.isRunning, timer.currentLap, totalLaps, raceState, track, currentSpeed, completeLap]);

  // Handle race completion
  useEffect(() => {
    if (timer.isFinished && raceState === 'racing') {
      setRaceState('finished');
      setCurrentSpeed(0);
      
      // Calculate results
      const won = position === 1;
      const baseReward = raceMode?.rewards.cash || 10000;
      const bonusMultiplier = won ? 1.5 : position <= 3 ? 1.2 : 1.0;
      const cashEarned = Math.round(baseReward * bonusMultiplier);
      const xpEarned = raceMode?.rewards.xp || 500;

      const result = {
        won,
        finalTime: formattedCurrentTime,
        bestLapTime: formattedBestTime,
        position,
        cashEarned,
        xpEarned
      };

      // Record in game state
      recordRaceResult({
        won,
        lapTime: formattedBestTime || undefined,
        topSpeed: currentSpeed,
        cashEarned,
        xpEarned
      });

      onRaceComplete(result);
    }
  }, [timer.isFinished, raceState, position, raceMode, formattedCurrentTime, formattedBestTime, currentSpeed, recordRaceResult, onRaceComplete]);

  const handleStartRace = useCallback(() => {
    setRaceState('countdown');
    setPosition(1);
    setCurrentSpeed(0);
  }, []);

  const handlePauseRace = useCallback(() => {
    pauseTimer();
  }, [pauseTimer]);

  const handleResetRace = useCallback(() => {
    setRaceState('ready');
    setCountdown(3);
    setCurrentSpeed(0);
    setPosition(1);
    resetTimer();
  }, [resetTimer]);

  if (!raceMode || !track || !car) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">Race configuration error</div>
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Track Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('${track.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Race Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {track.name.toUpperCase()}
            </h1>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              {track.location} • {track.length}km • {track.weather}
            </p>
          </div>

          {/* Race Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-black/80 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {timer.currentLap}/{totalLaps}
                </div>
                <div className="text-sm text-gray-300">LAPS</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 backdrop-blur-md border-green-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {position}
                </div>
                <div className="text-sm text-gray-300">POSITION</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 backdrop-blur-md border-red-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {currentSpeed}
                </div>
                <div className="text-sm text-gray-300">KM/H</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 backdrop-blur-md border-yellow-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {formattedCurrentTime}
                </div>
                <div className="text-sm text-gray-300">TIME</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Race Progress</span>
              <span className="text-white">{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="h-3" />
          </div>
        </div>

        {/* Main Race Display */}
        <div className="max-w-4xl mx-auto">
          {/* Countdown Overlay */}
          {raceState === 'countdown' && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="text-center">
                <div 
                  className="text-9xl font-bold text-red-500 mb-4 animate-pulse"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {countdown}
                </div>
                <div className="text-2xl text-white">GET READY!</div>
              </div>
            </div>
          )}

          {/* Race Controls */}
          <div className="text-center mb-8">
            {raceState === 'ready' && (
              <Button 
                onClick={handleStartRace}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-6 text-xl font-bold"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                🏁 START RACE
              </Button>
            )}

            {raceState === 'racing' && (
              <div className="flex justify-center gap-4">
                {canPause && (
                  <Button onClick={handlePauseRace} variant="outline" size="lg">
                    ⏸️ PAUSE
                  </Button>
                )}
                {canResume && (
                  <Button onClick={startTimer} size="lg" className="bg-green-600 hover:bg-green-700">
                    ▶️ RESUME
                  </Button>
                )}
                <Button onClick={handleResetRace} variant="outline" size="lg">
                  🔄 RESET
                </Button>
              </div>
            )}

            {raceState === 'finished' && (
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {position === 1 ? '🏆 VICTORY!' : position <= 3 ? '🥉 PODIUM FINISH!' : '🏁 RACE FINISHED'}
                </div>
                <Button onClick={handleResetRace} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  🔄 RACE AGAIN
                </Button>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <Card className="bg-black/80 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                LEADERBOARD
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  position === 1 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <div className="text-white font-bold">{gameState.player.name}</div>
                      <div className="text-gray-400 text-sm">{car.brand} {car.model}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{formattedCurrentTime}</div>
                    {formattedBestTime && (
                      <div className="text-gray-400 text-sm">Best: {formattedBestTime}</div>
                    )}
                  </div>
                </div>

                {opponents.map((opponent, index) => (
                  <div key={opponent.name} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 2}
                      </div>
                      <div>
                        <div className="text-white font-bold">{opponent.name}</div>
                        <div className="text-gray-400 text-sm">AI Opponent</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">+{(index + 1) * 2}.{Math.floor(Math.random() * 99).toString().padStart(2, '0')}s</div>
                      <div className="text-gray-400 text-sm">{opponent.speed} km/h</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}