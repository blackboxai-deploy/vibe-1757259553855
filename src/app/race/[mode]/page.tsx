"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { RaceSimulator } from "@/components/RaceSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRaceModeById } from "@/lib/race-modes";
import { getUnlockedCars, getCarById } from "@/lib/cars-data";
import { useGameState } from "@/hooks/use-game-state";

interface RaceResult {
  won: boolean;
  finalTime: string;
  bestLapTime: string | null;
  position: number;
  cashEarned: number;
  xpEarned: number;
}

export default function RaceModePage() {
  const params = useParams();
  const router = useRouter();
  const { gameState } = useGameState();
  const raceMode = getRaceModeById(params.mode as string);
  
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  
  const unlockedCars = getUnlockedCars();

  useEffect(() => {
    if (raceMode?.tracks.length) {
      setSelectedTrack(raceMode.tracks[0].id);
    }
    if (gameState.player.currentCar) {
      setSelectedCar(gameState.player.currentCar);
    } else if (unlockedCars.length > 0) {
      setSelectedCar(unlockedCars[0].id);
    }
  }, [raceMode, gameState.player.currentCar, unlockedCars]);

  const handleStartRace = () => {
    if (selectedTrack && selectedCar) {
      setRaceStarted(true);
      setRaceResult(null);
    }
  };

  const handleRaceComplete = (result: RaceResult) => {
    setRaceResult(result);
    setRaceStarted(false);
  };

  const handleBackToSetup = () => {
    setRaceStarted(false);
    setRaceResult(null);
  };

  const selectedCarData = getCarById(selectedCar);
  const selectedTrackData = raceMode?.tracks.find(t => t.id === selectedTrack);

  if (!raceMode) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">Race mode not found</div>
          <Button onClick={() => router.push("/races")}>
            Back to Races
          </Button>
        </div>
      </div>
    );
  }

  // Check if player meets requirements
  const meetsRequirements = () => {
    if (raceMode.requirements.minLevel && gameState.player.level < raceMode.requirements.minLevel) {
      return false;
    }
    if (raceMode.requirements.category && selectedCarData) {
      return raceMode.requirements.category.includes(selectedCarData.category);
    }
    return true;
  };

  // Race Results Screen
  if (raceResult) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-12">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {raceResult.won ? "VICTORY!" : "RACE COMPLETE"}
            </h1>
            <div className="text-6xl mb-4">
              {raceResult.position === 1 ? "🏆" : raceResult.position <= 3 ? "🥉" : "🏁"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-black/80 backdrop-blur-md border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  RACE RESULTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Position:</span>
                  <span className="text-white font-bold">#{raceResult.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Final Time:</span>
                  <span className="text-white font-bold">{raceResult.finalTime}</span>
                </div>
                {raceResult.bestLapTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Best Lap:</span>
                    <span className="text-white font-bold">{raceResult.bestLapTime}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-md border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  REWARDS EARNED
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Cash:</span>
                  <span className="text-green-400 font-bold">+${raceResult.cashEarned.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Experience:</span>
                  <span className="text-blue-400 font-bold">+{raceResult.xpEarned.toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Reputation:</span>
                  <span className="text-purple-400 font-bold">+{Math.floor(raceResult.xpEarned / 10)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleBackToSetup}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              🔄 RACE AGAIN
            </Button>
            <Button 
              onClick={() => router.push("/races")}
              variant="outline"
              size="lg"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              🏁 BACK TO RACES
            </Button>
            <Button 
              onClick={() => router.push("/garage")}
              variant="outline"
              size="lg"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              🚗 GARAGE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Race Simulator Screen
  if (raceStarted && selectedTrack && selectedCar) {
    return (
      <RaceSimulator
        raceId={params.mode as string}
        trackId={selectedTrack}
        carId={selectedCar}
        onRaceComplete={handleRaceComplete}
      />
    );
  }

  // Race Setup Screen
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {raceMode.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {raceMode.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Track Selection */}
          <Card className="bg-black/80 backdrop-blur-md border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                SELECT TRACK
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger className="bg-black/60 border-gray-700">
                  <SelectValue placeholder="Choose a track..." />
                </SelectTrigger>
                <SelectContent>
                  {raceMode.tracks.map((track) => (
                    <SelectItem key={track.id} value={track.id}>
                      {track.name} - {track.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedTrackData && (
                <div 
                  className="rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url('${selectedTrackData.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px'
                  }}
                >
                  <div className="bg-black/60 h-full p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-lg">{selectedTrackData.name}</h3>
                    <p className="text-gray-300 text-sm">{selectedTrackData.description}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-400">Length: {selectedTrackData.length}km</span>
                      <span className="text-gray-400">Turns: {selectedTrackData.turns}</span>
                      <span className="text-gray-400">Weather: {selectedTrackData.weather}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Car Selection */}
          <Card className="bg-black/80 backdrop-blur-md border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                SELECT CAR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedCar} onValueChange={setSelectedCar}>
                <SelectTrigger className="bg-black/60 border-gray-700">
                  <SelectValue placeholder="Choose a car..." />
                </SelectTrigger>
                <SelectContent>
                  {unlockedCars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.brand} {car.model} ({car.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCarData && (
                <div 
                  className="rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url('${selectedCarData.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px'
                  }}
                >
                  <div className="bg-black/60 h-full p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-lg">{selectedCarData.brand} {selectedCarData.model}</h3>
                    <p className="text-gray-300 text-sm">{selectedCarData.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <span className="text-gray-400">Top Speed: {selectedCarData.specs.topSpeed} km/h</span>
                      <span className="text-gray-400">Power: {selectedCarData.specs.power} HP</span>
                      <span className="text-gray-400">0-100: {selectedCarData.specs.acceleration}</span>
                      <span className="text-gray-400">Drive: {selectedCarData.specs.drivetrain}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Race Info & Start Button */}
        <div className="mt-8">
          <Card className="bg-black/80 backdrop-blur-md border-yellow-500/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {Math.floor(raceMode.duration / 60)}:{(raceMode.duration % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-300">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                    ${(raceMode.rewards.cash / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-300">Cash Reward</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {raceMode.rewards.xp.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">XP Reward</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {raceMode.difficulty}
                  </div>
                  <div className="text-sm text-gray-300">Difficulty</div>
                </div>
              </div>

              <div className="text-center">
                {!meetsRequirements() ? (
                  <div className="mb-4">
                    <div className="text-red-400 mb-2">❌ Requirements not met</div>
                    {raceMode.requirements.minLevel && gameState.player.level < raceMode.requirements.minLevel && (
                      <div className="text-gray-400 text-sm">Minimum level {raceMode.requirements.minLevel} required</div>
                    )}
                    {raceMode.requirements.category && selectedCarData && !raceMode.requirements.category.includes(selectedCarData.category) && (
                      <div className="text-gray-400 text-sm">
                        Requires: {raceMode.requirements.category.join(", ")} category vehicle
                      </div>
                    )}
                  </div>
                ) : (
                  <Button 
                    onClick={handleStartRace}
                    size="lg"
                    disabled={!selectedTrack || !selectedCar}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-12 py-6 text-xl font-bold"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    🏁 START RACE
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}