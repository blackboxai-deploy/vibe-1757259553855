export interface RaceMode {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  duration: number; // seconds
  rewards: {
    cash: number;
    xp: number;
    unlocks?: string[];
  };
  requirements: {
    minLevel?: number;
    specificCar?: string[];
    category?: string[];
  };
  tracks: RaceTrack[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface RaceTrack {
  id: string;
  name: string;
  location: string;
  length: number; // km
  turns: number;
  difficulty: number; // 1-10
  weather: 'Clear' | 'Rain' | 'Night' | 'Fog';
  surface: 'Asphalt' | 'Dirt' | 'Mixed';
  image: string;
  bestTime?: string;
  description: string;
}

export const RACE_MODES: RaceMode[] = [
  {
    id: 'street',
    name: 'Street Racing',
    title: 'STREET RACING',
    description: 'Illegal underground races through city streets. High risk, high reward.',
    icon: '🏙️',
    difficulty: 'Medium',
    duration: 180,
    rewards: {
      cash: 50000,
      xp: 1500,
      unlocks: ['street-king-title']
    },
    requirements: {
      minLevel: 1
    },
    color: 'red',
    gradientFrom: 'from-red-600',
    gradientTo: 'to-orange-600',
    tracks: [
      {
        id: 'downtown-dash',
        name: 'Downtown Dash',
        location: 'Neo Tokyo',
        length: 5.2,
        turns: 18,
        difficulty: 7,
        weather: 'Night',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f29e0cfb-e859-45ea-8bd9-6aa174f0fcb5.png',
        bestTime: '2:15.33',
        description: 'Navigate through neon-lit streets with heavy traffic and tight corners.'
      },
      {
        id: 'highway-heat',
        name: 'Highway Heat',
        location: 'Miami Coast',
        length: 8.1,
        turns: 12,
        difficulty: 8,
        weather: 'Clear',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4f4cb8d3-dd04-4143-aabc-d9911d1e7d78.png',
        bestTime: '3:42.89',
        description: 'High-speed highway racing with police pursuit and ocean views.'
      },
      {
        id: 'underground-tunnel',
        name: 'Underground Tunnel',
        location: 'New York Subway',
        length: 3.8,
        turns: 8,
        difficulty: 9,
        weather: 'Night',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/746478b8-04f6-4f3c-a676-9d6b3c3d889f.png',
        bestTime: '1:58.67',
        description: 'Claustrophobic tunnel racing with echoing engine sounds and concrete walls.'
      }
    ]
  },
  {
    id: 'circuit',
    name: 'Circuit Racing',
    title: 'CIRCUIT RACING',
    description: 'Professional racing on world-famous circuits. Pure skill and speed.',
    icon: '🏁',
    difficulty: 'Hard',
    duration: 300,
    rewards: {
      cash: 75000,
      xp: 2500,
      unlocks: ['pro-racer-title', 'racing-suit']
    },
    requirements: {
      minLevel: 5,
      category: ['supercar', 'hypercar']
    },
    color: 'blue',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-purple-600',
    tracks: [
      {
        id: 'silverstone-grand',
        name: 'Silverstone Grand',
        location: 'United Kingdom',
        length: 5.9,
        turns: 18,
        difficulty: 8,
        weather: 'Rain',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/43ddf8ab-8d9e-456f-b388-e2ef2f153de5.png',
        bestTime: '1:24.56',
        description: 'Historic British circuit with challenging weather conditions.'
      },
      {
        id: 'monaco-street-circuit',
        name: 'Monaco Street Circuit',
        location: 'Monte Carlo',
        length: 3.3,
        turns: 19,
        difficulty: 10,
        weather: 'Clear',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/604ababd-3f32-4c1a-9771-cf89355dcab2.png',
        bestTime: '1:12.34',
        description: 'The most prestigious street circuit with unforgiving barriers.'
      },
      {
        id: 'spa-francorchamps',
        name: 'Spa-Francorchamps',
        location: 'Belgium',
        length: 7.0,
        turns: 19,
        difficulty: 9,
        weather: 'Fog',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/781fe97b-99c3-4c47-ab38-71b674a1850f.png',
        bestTime: '2:03.89',
        description: 'Legendary circuit through the Belgian Ardennes with elevation changes.'
      }
    ]
  },
  {
    id: 'time-trial',
    name: 'Time Trial',
    title: 'TIME TRIAL',
    description: 'Race against the clock. Perfect your racing line and set new records.',
    icon: '⏱️',
    difficulty: 'Easy',
    duration: 120,
    rewards: {
      cash: 25000,
      xp: 1000,
      unlocks: ['precision-driver-title']
    },
    requirements: {
      minLevel: 1
    },
    color: 'yellow',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-500',
    tracks: [
      {
        id: 'mountain-pass',
        name: 'Mountain Pass',
        location: 'Swiss Alps',
        length: 6.4,
        turns: 32,
        difficulty: 7,
        weather: 'Clear',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6c50d09-1ed7-4ef4-8c0e-a735f2ee79be.png',
        bestTime: '3:45.12',
        description: 'Challenging mountain road with breathtaking Alpine views.'
      },
      {
        id: 'desert-highway',
        name: 'Desert Highway',
        location: 'Nevada, USA',
        length: 12.5,
        turns: 6,
        difficulty: 5,
        weather: 'Clear',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5cde829d-3292-408c-910d-22c8d8f6b8b2.png',
        bestTime: '4:23.78',
        description: 'Long straight stretches perfect for testing top speed.'
      },
      {
        id: 'coastal-road',
        name: 'Coastal Road',
        location: 'California Coast',
        length: 9.2,
        turns: 24,
        difficulty: 6,
        weather: 'Clear',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e0e6658-1ee0-4384-beae-07eccdbeff71.png',
        bestTime: '4:56.34',
        description: 'Scenic coastal route with ocean views and flowing corners.'
      }
    ]
  },
  {
    id: 'drift',
    name: 'Drift Challenge',
    title: 'DRIFT CHALLENGE',
    description: 'Style over speed. Chain together perfect drifts for maximum points.',
    icon: '🌪️',
    difficulty: 'Hard',
    duration: 240,
    rewards: {
      cash: 60000,
      xp: 2000,
      unlocks: ['drift-king-title', 'smoke-tires']
    },
    requirements: {
      minLevel: 8,
      category: ['sports', 'supercar']
    },
    color: 'purple',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-600',
    tracks: [
      {
        id: 'tokyo-drift-garage',
        name: 'Tokyo Drift Garage',
        location: 'Shibuya, Tokyo',
        length: 2.1,
        turns: 15,
        difficulty: 9,
        weather: 'Night',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b7a06534-81e8-4600-94d1-3ab4a23f9d64.png',
        bestTime: '1:35.67',
        description: 'Underground garage with tight corners perfect for drifting.'
      },
      {
        id: 'mountain-touge',
        name: 'Mountain Touge',
        location: 'Mount Fuji, Japan',
        length: 5.8,
        turns: 28,
        difficulty: 10,
        weather: 'Night',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/28999942-4806-4958-8f43-258950d5a35e.png',
        bestTime: '3:12.45',
        description: 'Classic Japanese mountain pass with hairpin turns.'
      }
    ]
  },
  {
    id: 'police-chase',
    name: 'Police Chase',
    title: 'POLICE CHASE',
    description: 'Outrun the law in high-speed pursuits. Don\'t get caught!',
    icon: '🚔',
    difficulty: 'Extreme',
    duration: 360,
    rewards: {
      cash: 100000,
      xp: 3000,
      unlocks: ['outlaw-title', 'stealth-mode']
    },
    requirements: {
      minLevel: 12,
      category: ['supercar', 'hypercar']
    },
    color: 'red',
    gradientFrom: 'from-red-700',
    gradientTo: 'to-black',
    tracks: [
      {
        id: 'downtown-pursuit',
        name: 'Downtown Pursuit',
        location: 'Los Angeles',
        length: 15.3,
        turns: 45,
        difficulty: 10,
        weather: 'Night',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cf7c57ca-0398-44fd-ba2c-d14c36fe4838.png',
        bestTime: '8:45.23',
        description: 'Navigate through downtown while evading police helicopters.'
      },
      {
        id: 'highway-getaway',
        name: 'Highway Getaway',
        location: 'Interstate 95',
        length: 22.7,
        turns: 12,
        difficulty: 8,
        weather: 'Rain',
        surface: 'Asphalt',
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ff87a43b-acc9-4af2-81e9-d103e4058948.png',
        bestTime: '12:34.56',
        description: 'High-speed highway chase with roadblocks and spike strips.'
      }
    ]
  }
];

export const getRaceModeById = (id: string) => {
  return RACE_MODES.find(mode => mode.id === id);
};

export const getTrackById = (raceId: string, trackId: string) => {
  const race = getRaceModeById(raceId);
  return race?.tracks.find(track => track.id === trackId);
};

export const getAvailableRaceModes = (playerLevel: number) => {
  return RACE_MODES.filter(mode => 
    !mode.requirements.minLevel || playerLevel >= mode.requirements.minLevel
  );
};