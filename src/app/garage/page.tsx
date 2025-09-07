"use client";

import { useState, useMemo } from "react";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CARS_DATABASE, CATEGORIES, type Car } from "@/lib/cars-data";

export default function GaragePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "speed" | "power">("name");
  const [favorites, setFavorites] = useState<string[]>(
    CARS_DATABASE.filter(car => car.favorite).map(car => car.id)
  );

  const filteredAndSortedCars = useMemo(() => {
    let filtered = CARS_DATABASE.filter(car => {
      const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;
      const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.price - a.price;
        case "speed":
          return b.specs.topSpeed - a.specs.topSpeed;
        case "power":
          return b.specs.power - a.specs.power;
        default:
          return a.brand.localeCompare(b.brand);
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleFavorite = (carId: string) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const unlockedCars = filteredAndSortedCars.filter(car => car.unlocked);
  const lockedCars = filteredAndSortedCars.filter(car => !car.unlocked);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              GARAGE
            </h1>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Your collection of the world's most extraordinary supercars and hypercars
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                {unlockedCars.length}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">UNLOCKED</div>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-500/30">
              <div className="text-2xl font-bold text-gray-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                {lockedCars.length}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">LOCKED</div>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                {favorites.length}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">FAVORITES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Search cars by brand or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto bg-black/60 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
                }`}
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex justify-center gap-3">
            <span className="text-gray-400 self-center">Sort by:</span>
            {[
              { key: "name", label: "Name" },
              { key: "price", label: "Price" },
              { key: "speed", label: "Speed" },
              { key: "power", label: "Power" }
            ].map((option) => (
              <Button
                key={option.key}
                variant={sortBy === option.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy(option.key as typeof sortBy)}
                className={sortBy === option.key ? "bg-gray-700" : "text-gray-400 hover:text-white"}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-gray-400 mb-2">No cars found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Unlocked Cars */}
              {unlockedCars.length > 0 && (
                <div className="mb-12">
                  <h2 
                    className="text-3xl font-bold text-green-400 mb-6 text-center"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    🔓 UNLOCKED CARS ({unlockedCars.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {unlockedCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={{
                          ...car,
                          favorite: favorites.includes(car.id)
                        }}
                        onFavorite={handleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Cars */}
              {lockedCars.length > 0 && (
                <div>
                  <h2 
                    className="text-3xl font-bold text-gray-400 mb-6 text-center"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    🔒 LOCKED CARS ({lockedCars.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {lockedCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={{
                          ...car,
                          favorite: favorites.includes(car.id)
                        }}
                        onFavorite={handleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}