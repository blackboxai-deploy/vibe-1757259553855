"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9b314468-51c4-475f-a959-8fc357184bd9.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-blue-900/30"></div>
      </div>

      {/* Animated Speed Lines */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        {/* Title */}
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          NEED FOR SPEED
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 tracking-wider font-light"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          UNLEASH THE BEAST WITHIN
        </p>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-lg border border-red-500/30">
            <div className="text-3xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>350+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">SUPERCARS</div>
          </div>
          <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-lg border border-blue-500/30">
            <div className="text-3xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>25</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">RACE TRACKS</div>
          </div>
          <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-lg border border-yellow-500/30">
            <div className="text-3xl font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>∞</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">ADRENALINE</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/races">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-bold tracking-wider transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              🏁 START RACING
            </Button>
          </Link>
          
          <Link href="/garage">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 px-8 py-6 text-lg font-bold tracking-wider transform hover:scale-105 transition-all duration-300"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              🚗 EXPLORE GARAGE
            </Button>
          </Link>
        </div>

        {/* Speed Meter Animation */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-32 h-16 border-4 border-red-500 rounded-t-full relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 w-1 h-12 bg-red-500 origin-bottom transform -rotate-45 animate-pulse"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-center mt-2">
              <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>320</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">KM/H</div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effect Simulation */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-60 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}