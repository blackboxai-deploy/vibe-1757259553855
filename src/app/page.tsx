"use client";

import { HeroSection } from "@/components/HeroSection";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      
      {/* Player Stats Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            DRIVER STATS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="RACES WON"
              value="127"
              icon="🏆"
              color="yellow"
              trend="+12 this week"
            />
            <StatsCard
              title="TOP SPEED"
              value="347 KM/H"
              icon="⚡"
              color="red"
              trend="Personal best"
            />
            <StatsCard
              title="CARS OWNED"
              value="23"
              icon="🚗"
              color="blue"
              trend="+2 this month"
            />
            <StatsCard
              title="DRIFT SCORE"
              value="95,420"
              icon="🌪️"
              color="purple"
              trend="New record!"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            QUICK START
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Street Racing */}
            <Card className="bg-black/80 backdrop-blur-md border-red-500/30 hover:border-red-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div 
                  className="w-full h-48 bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46c4891d-48b0-4192-9e1d-c76a86f30c16.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="bg-black/60 rounded-lg p-4">
                    <span className="text-4xl">🏙️</span>
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl text-red-400"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  STREET RACING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Race through neon-lit city streets. Avoid traffic, outsmart rivals, and dominate the underground scene.
                </p>
                <Link href="/race/street">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    START STREET RACE
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Circuit Racing */}
            <Card className="bg-black/80 backdrop-blur-md border-blue-500/30 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div 
                  className="w-full h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2bce00d3-8e40-4451-ba7a-ee384d338841.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="bg-black/60 rounded-lg p-4">
                    <span className="text-4xl">🏁</span>
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl text-blue-400"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  CIRCUIT RACING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Professional racing on world-class circuits. Perfect your racing lines and chase the podium.
                </p>
                <Link href="/race/circuit">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    START CIRCUIT RACE
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Time Trial */}
            <Card className="bg-black/80 backdrop-blur-md border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div 
                  className="w-full h-48 bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d66a4ad7-b618-47ad-b640-b6883762f859.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="bg-black/60 rounded-lg p-4">
                    <span className="text-4xl">⏱️</span>
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl text-yellow-400"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  TIME TRIAL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Race against the clock. Set new records and perfect your driving skills on every corner.
                </p>
                <Link href="/race/time-trial">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    START TIME TRIAL
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            RECENT ACTIVITY
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-400">Victory at Sunset Boulevard</h3>
                    <p className="text-gray-400">Finished 1st place • 2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">🚗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-400">New Car Unlocked</h3>
                    <p className="text-gray-400">Lamborghini Aventador • Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}