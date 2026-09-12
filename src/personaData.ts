import { PersonaConfig, PersonaId } from './types';

export const personas: Record<PersonaId, PersonaConfig> = {
  health: {
    id: 'health',
    name: 'Health-conscious user',
    subtitle: 'Health & environment conditions',
    status: 'Good conditions',
    statusType: 'good',
    message: 'Current conditions are suitable. Keep an eye on UV, humidity and air quality.',
    description: 'AQI, pollen, UV index, humidity, allergy and skin-sensitivity information.',
    iconName: '+',
    cards: [
      ['AQI', '42', 'Good air quality'],
      ['POLLEN', 'Low', 'Low allergy risk'],
      ['UV INDEX', '5', 'Moderate exposure'],
      ['HUMIDITY', '72%', 'Moderately humid']
    ]
  },
  fitness: {
    id: 'fitness',
    name: 'Outdoor fitness enthusiast',
    subtitle: 'Outdoor activity conditions',
    status: 'Good for outdoor activity',
    statusType: 'good',
    message: 'Current conditions are suitable for outdoor exercise.',
    description: 'Running hours, sunrise, sunset, wind, UV and heat alerts.',
    iconName: '↗',
    cards: [
      ['BEST RUNNING', '5:30–7:00 AM', 'Cooler conditions'],
      ['UV INDEX', '5', 'Use sun protection'],
      ['WIND', '14 km/h', 'Light breeze'],
      ['HEAT ALERT', 'Low', 'Comfortable activity']
    ]
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor explorer',
    subtitle: 'Outdoor comfort and safety conditions',
    status: 'Outdoor conditions look good',
    statusType: 'good',
    message: 'Conditions are suitable for outdoor plans. Check wind and heat before leaving.',
    description: 'Sunlight, wind, heat and comfort guidance for outdoor plans.',
    iconName: '⌁',
    cards: [
      ['SUNRISE', '5:58 AM', 'Plan an early start'],
      ['SUNSET', '6:22 PM', 'Daylight remaining'],
      ['WIND', '14 km/h', 'Light breeze'],
      ['HEAT ALERT', 'Low', 'Comfortable conditions']
    ]
  },
  beach: {
    id: 'beach',
    name: 'Beachgoer / Surfer',
    subtitle: 'Beach & sea conditions',
    status: 'Check sea conditions',
    statusType: 'risk',
    message: 'Review wave height, tide timing and water conditions before entering the sea.',
    description: 'Tide timings, waves, sea conditions and water temperature.',
    iconName: '≈',
    cards: [
      ['WAVE HEIGHT', '1.2 m', 'Moderate waves'],
      ['TIDE', '3:40 PM', 'Next high tide'],
      ['WATER TEMP', '27°', 'Comfortable'],
      ['SEA CONDITION', 'Moderate', 'Check before activity']
    ]
  },
  traveler: {
    id: 'traveler',
    name: 'Traveler',
    subtitle: 'Travel weather & destination insights',
    status: 'Travel conditions look good',
    statusType: 'good',
    message: 'No major weather concern currently detected for your selected destination.',
    description: 'Destination weather, severe alerts, saved places and packing suggestions.',
    iconName: '✈',
    image: '/assets/traveler.png',
    cards: [
      ['DESTINATION', 'London', 'Saved destination'],
      ['FORECAST', '18°', 'Partly cloudy'],
      ['RAIN', '35%', 'Carry a light raincoat'],
      ['ALERT', 'None', 'No severe warning']
    ]
  },
  family: {
    id: 'family',
    name: 'Parent / Family',
    subtitle: 'Family & school commute conditions',
    status: 'School commute looks good',
    statusType: 'good',
    message: 'No immediate severe weather warning. Monitor rain conditions during commute hours.',
    description: 'School commute conditions, rain alerts and severe weather warnings.',
    iconName: '👨‍👩‍👧',
    image: '/assets/family.png',
    cards: [
      ['SCHOOL COMMUTE', 'Good', 'Normal conditions'],
      ['RAIN', '20%', 'Low probability'],
      ['VISIBILITY', '8 km', 'Good visibility'],
      ['SEVERE ALERT', 'None', 'No warning']
    ]
  },
  farmer: {
    id: 'farmer',
    name: 'Farmer / Gardener',
    subtitle: 'Agriculture & gardening conditions',
    status: 'Monitor rainfall',
    statusType: 'risk',
    message: 'Rainfall conditions should be monitored before irrigation or outdoor agricultural work.',
    description: 'Rainfall, soil moisture, frost alerts and planting guidance.',
    iconName: '🌱',
    image: '/assets/farmer.png',
    cards: [
      ['RAINFALL', '12 mm', 'Expected today'],
      ['SOIL MOISTURE', '68%', 'Moderate moisture'],
      ['FROST ALERT', 'None', 'No frost expected'],
      ['TEMPERATURE', '28°', 'Suitable conditions']
    ]
  },
  commuter: {
    id: 'commuter',
    name: 'Commuter',
    subtitle: 'Journey, route & traffic conditions',
    status: 'Journey conditions look good',
    statusType: 'good',
    message: 'Your route is currently suitable. Mausam will continue tracking weather and your journey.',
    description: 'Route weather, GPS, ETA, speed, traffic, visibility and storm alerts.',
    iconName: '🚗',
    image: '/assets/commuter.png',
    cards: [
      ['ETA', '5:45 PM', 'Automatically updated'],
      ['YOUR SPEED', '40 km/h', 'Current speed'],
      ['RAIN', '6:00 PM', 'Expected on route'],
      ['VISIBILITY', '8 km', 'Good visibility']
    ]
  },
  event: {
    id: 'event',
    name: 'Event Planner',
    subtitle: 'Outdoor event planning conditions',
    status: 'Event conditions need monitoring',
    statusType: 'risk',
    message: 'There is a possibility of changing weather. Keep a backup arrangement ready.',
    description: 'Extended forecasts, rain probability and outdoor comfort conditions.',
    iconName: '□',
    cards: [
      ['RAIN PROBABILITY', '35%', 'Monitor forecast'],
      ['COMFORT INDEX', 'Good', 'Generally comfortable'],
      ['FORECAST', '7 Days', 'Extended outlook'],
      ['WIND', '14 km/h', 'Moderate breeze']
    ]
  }
};
