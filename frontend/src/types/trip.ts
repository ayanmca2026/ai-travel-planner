export enum TripStatus {
  PLANNING = 'PLANNING',
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: TripStatus;
  travelers: number;
  imageUrl?: string;
}

export interface TripCreate {
  startingLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  travelStyle: string;
  interests: string[];
  transportation: string;
  accommodation: string;
  foodPreference: string;
}
