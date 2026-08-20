let rawApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ai-travel-planner-olui.onrender.com' : 'http://localhost:8000');
rawApiUrl = rawApiUrl.replace(/\/+$/, '');
rawApiUrl = rawApiUrl.replace(/\/api$/, '');
rawApiUrl = rawApiUrl + '/api';
export const API_URL = rawApiUrl;

export const TRAVEL_STYLES = [
  { id: 'backpacker', label: 'Backpacker', desc: 'Hostels, street food, public transport', icon: '🎒' },
  { id: 'budget', label: 'Budget', desc: 'Cheap hotels, local diners, mixed transport', icon: '💸' },
  { id: 'balanced', label: 'Balanced', desc: 'Mid-range comfort, occasional splurges', icon: '⚖️' },
  { id: 'comfort', label: 'Comfort', desc: 'Nice hotels, good restaurants, private transport', icon: '🛏️' },
];

export const INTERESTS = [
  'Nature', 'Adventure', 'Food', 'History', 'Photography',
  'Shopping', 'Nightlife', 'Culture', 'Beaches', 'Mountains', 'Hidden Gems'
];

export const TRANSPORT_OPTIONS = [
  { id: 'public', label: 'Public Transport' },
  { id: 'shared', label: 'Shared Cab/Auto' },
  { id: 'private', label: 'Private Vehicle' },
  { id: 'walking', label: 'Walking-focused' },
  { id: 'mix', label: 'Mix of all' },
];

export const ACCOMMODATION_OPTIONS = [
  { id: 'hostel', label: 'Hostel / Dorm' },
  { id: 'budget_hotel', label: 'Budget Hotel' },
  { id: 'homestay', label: 'Homestay' },
  { id: 'airbnb', label: 'Airbnb / Apartment' },
  { id: 'any', label: 'No preference' },
];

export const FOOD_PREFERENCES = [
  { id: 'street', label: 'Street Food mostly' },
  { id: 'local', label: 'Local Restaurants' },
  { id: 'mix', label: 'Mix of everything' },
  { id: 'veg', label: 'Strictly Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
];
