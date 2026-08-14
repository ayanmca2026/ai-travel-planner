export enum ItemCategory {
  ATTRACTION = 'ATTRACTION',
  RESTAURANT = 'RESTAURANT',
  ACTIVITY = 'ACTIVITY',
  TRANSPORT = 'TRANSPORT',
  ACCOMMODATION = 'ACCOMMODATION'
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  duration: number;
  category: ItemCategory;
  location?: { lat: number; lng: number; address: string };
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  theme: string;
  items: ItineraryItem[];
  estimatedCost: number;
}

export interface FullItinerary {
  tripId: string;
  days: ItineraryDay[];
  totalCost: number;
}
