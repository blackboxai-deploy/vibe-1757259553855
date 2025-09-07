"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Car } from "@/lib/cars-data";
import Link from "next/link";

interface CarCardProps {
  car: Car;
  onFavorite?: (carId: string) => void;
}

export function CarCard({ car, onFavorite }: CarCardProps) {
  const categoryColors = {
    hypercar: "bg-red-500/20 text-red-400 border-red-500/30",
    supercar: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    sports: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    electric: "bg-green-500/20 text-green-400 border-green-500/30",
    classic: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <Card className={`bg-black/80 backdrop-blur-md border transition-all duration-300 transform hover:scale-105 ${
      car.unlocked ? 'border-gray-700 hover:border-blue-500' : 'border-gray-800 hover:border-gray-600'
    }`}>
      <CardHeader className="p-0">
        {/* Car Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-48 object-cover transition-all duration-300 ${
              car.unlocked ? 'filter-none' : 'filter grayscale'
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c0fc567-4b52-4d68-9bd6-46e947d32dda.png + ' ' + car.model)}`;
            }}
          />
          
          {/* Lock Overlay */}
          {!car.unlocked && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <div className="text-white font-bold">LOCKED</div>
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => onFavorite?.(car.id)}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 ${
              car.favorite ? 'bg-red-500/80 text-white' : 'bg-black/50 text-gray-400 hover:text-red-400'
            }`}
          >
            {car.favorite ? '❤️' : '🤍'}
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColors[car.category]} backdrop-blur-md`}>
              {car.category.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Car Info */}
        <div className="mb-4">
          <h3 
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {car.brand} {car.model}
          </h3>
          <p className="text-gray-400 text-sm">{car.year} • {car.color}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div 
            className="text-2xl font-bold text-yellow-400"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {formatPrice(car.price)}
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Top Speed</div>
            <div className="text-white font-bold">{car.specs.topSpeed} km/h</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">0-100</div>
            <div className="text-white font-bold">{car.specs.acceleration}</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Power</div>
            <div className="text-white font-bold">{car.specs.power} HP</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Drive</div>
            <div className="text-white font-bold">{car.specs.drivetrain}</div>
          </div>
        </div>

        {/* Performance Bars */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Speed</span>
            <span className="text-white">{car.performance.speed}/10</span>
          </div>
          <Progress value={car.performance.speed * 10} className="h-1" />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Handling</span>
            <span className="text-white">{car.performance.handling}/10</span>
          </div>
          <Progress value={car.performance.handling * 10} className="h-1" />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {car.unlocked ? (
            <>
              <Link href={`/races?car=${car.id}`} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  SELECT CAR
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="px-3">
                📊
              </Button>
            </>
          ) : (
            <Button 
              className="w-full bg-gray-600 hover:bg-gray-700" 
              size="sm"
              disabled
            >
              🔒 UNLOCK
            </Button>
          )}
        </div>

        {/* Description */}
        {car.unlocked && (
          <p className="text-xs text-gray-400 mt-3 italic">
            {car.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}