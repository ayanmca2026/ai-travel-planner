export interface Place {
  id: string;
  name: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  category: string;
  rating?: number;
  priceLevel?: number; // 1-4
  imageUrl?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  popularCategories: string[];
  averageCostPerDay: number;
  imageUrl: string;
}

export interface SavedPlace extends Place {
  savedAt: string;
  notes?: string;
}
