export type PageId =
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'journey'
  | 'forecast'
  | 'alerts'
  | 'nearby'
  | 'saved'
  | 'personalize'
  | 'settings'
  | 'edit-profile'
  | 'change-password';

export type Language = 'en' | 'te' | 'hi';
export type Theme = 'dark' | 'light';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type PersonaId =
  | 'health'
  | 'fitness'
  | 'outdoor'
  | 'beach'
  | 'traveler'
  | 'family'
  | 'farmer'
  | 'commuter'
  | 'event';

export interface PersonaConfig {
  id: PersonaId;
  name: string;
  subtitle: string;
  status: string;
  statusType: 'good' | 'risk';
  message: string;
  description: string;
  iconName: string;
  image?: string;
  cards: [label: string, value: string, desc: string][];
}

export interface SavedPlace {
  id: string;
  name: string;
  location: string;
  tag: string;
  distance: string;
}

export interface NearbyPlace {
  id: string;
  category: 'hospital' | 'shelter' | 'fuel' | 'pharmacy';
  categoryLabel: string;
  name: string;
  description: string;
  distance: string;
  iconLetter: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}
