export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: 'supercar' | 'hypercar' | 'sports' | 'classic' | 'electric';
  price: number;
  specs: {
    topSpeed: number; // km/h
    acceleration: string; // 0-100 km/h
    power: number; // HP
    weight: number; // kg
    drivetrain: 'AWD' | 'RWD' | 'FWD';
  };
  performance: {
    speed: number; // 1-10 scale
    handling: number; // 1-10 scale
    acceleration: number; // 1-10 scale
    braking: number; // 1-10 scale
  };
  image: string;
  color: string;
  unlocked: boolean;
  favorite: boolean;
  description: string;
}

export const CARS_DATABASE: Car[] = [
  {
    id: 'lamborghini-aventador',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    model: 'Aventador SVJ',
    year: 2023,
    category: 'hypercar',
    price: 517000,
    specs: {
      topSpeed: 350,
      acceleration: '2.8s',
      power: 770,
      weight: 1525,
      drivetrain: 'AWD'
    },
    performance: {
      speed: 10,
      handling: 8,
      acceleration: 9,
      braking: 8
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc92dbe5-12b8-477b-8bd6-d28f3256c176.png',
    color: 'Orange',
    unlocked: true,
    favorite: true,
    description: 'The ultimate expression of Lamborghini\'s V12 legacy. Pure adrenaline in automotive form.'
  },
  {
    id: 'mclaren-720s',
    name: '720S',
    brand: 'McLaren',
    model: '720S',
    year: 2023,
    category: 'supercar',
    price: 299000,
    specs: {
      topSpeed: 341,
      acceleration: '2.9s',
      power: 720,
      weight: 1419,
      drivetrain: 'RWD'
    },
    performance: {
      speed: 9,
      handling: 10,
      acceleration: 9,
      braking: 9
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df592983-e3dc-4769-a767-fa5b9496d5dc.png',
    color: 'Papaya Orange',
    unlocked: true,
    favorite: false,
    description: 'McLaren\'s masterpiece of aerodynamic efficiency and raw performance.'
  },
  {
    id: 'ferrari-sf90',
    name: 'SF90 Stradale',
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2023,
    category: 'hypercar',
    price: 625000,
    specs: {
      topSpeed: 340,
      acceleration: '2.5s',
      power: 1000,
      weight: 1570,
      drivetrain: 'AWD'
    },
    performance: {
      speed: 10,
      handling: 9,
      acceleration: 10,
      braking: 9
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/de9ce6e5-c931-4b4e-9ee2-5657d33dcfcb.png',
    color: 'Rosso Corsa',
    unlocked: false,
    favorite: false,
    description: 'Ferrari\'s first plug-in hybrid supercar. The future of prancing horse performance.'
  },
  {
    id: 'porsche-gt3rs',
    name: '911 GT3 RS',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2023,
    category: 'sports',
    price: 223000,
    specs: {
      topSpeed: 296,
      acceleration: '3.0s',
      power: 525,
      weight: 1450,
      drivetrain: 'RWD'
    },
    performance: {
      speed: 8,
      handling: 10,
      acceleration: 8,
      braking: 10
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa72d47e-a677-4d4b-8a70-2e7295b7f435.png',
    color: 'Guards Red',
    unlocked: true,
    favorite: true,
    description: 'The track-focused evolution of the iconic 911. Precision engineering at its finest.'
  },
  {
    id: 'bugatti-chiron',
    name: 'Chiron Pur Sport',
    brand: 'Bugatti',
    model: 'Chiron Pur Sport',
    year: 2023,
    category: 'hypercar',
    price: 3500000,
    specs: {
      topSpeed: 380,
      acceleration: '2.3s',
      power: 1500,
      weight: 1940,
      drivetrain: 'AWD'
    },
    performance: {
      speed: 10,
      handling: 7,
      acceleration: 10,
      braking: 8
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2d404df7-4bba-4dcc-b1f1-ae75273a1cf5.png',
    color: 'Dark Blue Carbon',
    unlocked: false,
    favorite: false,
    description: 'The pinnacle of automotive engineering. 1,500 horsepower of pure luxury and speed.'
  },
  {
    id: 'koenigsegg-regera',
    name: 'Regera',
    brand: 'Koenigsegg',
    model: 'Regera',
    year: 2023,
    category: 'hypercar',
    price: 1900000,
    specs: {
      topSpeed: 400,
      acceleration: '2.8s',
      power: 1360,
      weight: 1628,
      drivetrain: 'RWD'
    },
    performance: {
      speed: 10,
      handling: 8,
      acceleration: 10,
      braking: 8
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9cc16b7d-c874-4a1c-a4b9-5a48b84b2e42.png',
    color: 'Ghost White',
    unlocked: false,
    favorite: false,
    description: 'Swedish engineering marvel combining hybrid technology with extreme performance.'
  },
  {
    id: 'nissan-gtr',
    name: 'GT-R NISMO',
    brand: 'Nissan',
    model: 'GT-R NISMO',
    year: 2023,
    category: 'sports',
    price: 215000,
    specs: {
      topSpeed: 315,
      acceleration: '2.7s',
      power: 600,
      weight: 1720,
      drivetrain: 'AWD'
    },
    performance: {
      speed: 9,
      handling: 8,
      acceleration: 9,
      braking: 8
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e1e227b8-c636-4d84-821a-86fbe76e723d.png',
    color: 'Midnight Black',
    unlocked: true,
    favorite: false,
    description: 'Godzilla evolved. Japanese precision meets track-bred performance.'
  },
  {
    id: 'tesla-roadster',
    name: 'Roadster',
    brand: 'Tesla',
    model: 'Roadster',
    year: 2024,
    category: 'electric',
    price: 250000,
    specs: {
      topSpeed: 400,
      acceleration: '1.9s',
      power: 1020,
      weight: 1800,
      drivetrain: 'AWD'
    },
    performance: {
      speed: 10,
      handling: 8,
      acceleration: 10,
      braking: 9
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84353a41-4280-4507-8c58-ffb77ba4f4b6.png',
    color: 'Pearl White',
    unlocked: false,
    favorite: false,
    description: 'The future of supercars. Electric performance that defies physics.'
  },
  {
    id: 'aston-martin-valkyrie',
    name: 'Valkyrie',
    brand: 'Aston Martin',
    model: 'Valkyrie',
    year: 2023,
    category: 'hypercar',
    price: 3200000,
    specs: {
      topSpeed: 402,
      acceleration: '2.5s',
      power: 1176,
      weight: 1030,
      drivetrain: 'RWD'
    },
    performance: {
      speed: 10,
      handling: 10,
      acceleration: 10,
      braking: 10
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3fae4a14-9115-4e81-b875-b6e3e50c4a58.png',
    color: 'Racing Green',
    unlocked: false,
    favorite: false,
    description: 'Formula 1 technology for the road. Adrian Newey\'s aerodynamic masterpiece.'
  },
  {
    id: 'ford-gt',
    name: 'GT',
    brand: 'Ford',
    model: 'GT',
    year: 2023,
    category: 'supercar',
    price: 450000,
    specs: {
      topSpeed: 347,
      acceleration: '3.0s',
      power: 647,
      weight: 1386,
      drivetrain: 'RWD'
    },
    performance: {
      speed: 9,
      handling: 9,
      acceleration: 9,
      braking: 9
    },
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c9c98e3c-9e52-4d04-9f75-9664a4368c40.png',
    color: 'Gulf Blue',
    unlocked: true,
    favorite: false,
    description: 'American racing heritage reborn. Le Mans-winning DNA in street form.'
  }
];

export const getCarsByCategory = (category: Car['category']) => {
  return CARS_DATABASE.filter(car => car.category === category);
};

export const getUnlockedCars = () => {
  return CARS_DATABASE.filter(car => car.unlocked);
};

export const getFavoriteCars = () => {
  return CARS_DATABASE.filter(car => car.favorite && car.unlocked);
};

export const getCarById = (id: string) => {
  return CARS_DATABASE.find(car => car.id === id);
};

export const CATEGORIES = [
  { id: 'all', name: 'All Cars', icon: '🚗' },
  { id: 'hypercar', name: 'Hypercars', icon: '🏎️' },
  { id: 'supercar', name: 'Supercars', icon: '🚙' },
  { id: 'sports', name: 'Sports Cars', icon: '🏁' },
  { id: 'electric', name: 'Electric', icon: '⚡' },
  { id: 'classic', name: 'Classic', icon: '🚘' }
] as const;