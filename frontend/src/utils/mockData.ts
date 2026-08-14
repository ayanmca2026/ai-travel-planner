import { BudgetHealth, BudgetCategory, SavingSuggestion, BudgetAnalysis } from '@/types/budget';
import { TripStatus } from '@/types/trip';
import { ItemCategory } from '@/types/itinerary';

export const MOCK_TRIP = {
  id: 'trip-123',
  title: 'Goa Getaway',
  destination: 'Goa, India',
  startDate: '2026-12-15',
  endDate: '2026-12-20',
  budget: 15000,
  status: TripStatus.UPCOMING,
  travelers: 2,
  imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
};

export const MOCK_ITINERARY = {
  tripId: 'trip-123',
  totalCost: 12500,
  days: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: '2026-12-15',
      theme: 'Arrival & Beach Chill',
      estimatedCost: 3500,
      items: [
        {
          id: 'item-1',
          time: '10:00',
          title: 'Arrive at Goa Airport',
          description: 'Take pre-booked shared cab to hostel in Anjuna.',
          cost: 400,
          duration: 60,
          category: ItemCategory.TRANSPORT,
          location: { lat: 15.3803, lng: 73.8350, address: 'Dabolim Airport' }
        },
        {
          id: 'item-2',
          time: '13:00',
          title: 'Lunch at Curlies',
          description: 'Famous beach shack with great seafood and views.',
          cost: 800,
          duration: 90,
          category: ItemCategory.RESTAURANT,
          location: { lat: 15.5731, lng: 73.7408, address: 'Anjuna Beach' }
        }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: '2026-12-16',
      theme: 'Forts & Culture',
      estimatedCost: 2000,
      items: [
        {
          id: 'item-3',
          time: '09:00',
          title: 'Aguada Fort',
          description: '17th-century Portuguese fort and lighthouse.',
          cost: 100,
          duration: 120,
          category: ItemCategory.ATTRACTION,
          location: { lat: 15.4925, lng: 73.7768, address: 'Fort Aguada' }
        }
      ]
    }
  ]
};

export const MOCK_BUDGET: BudgetAnalysis = {
  totalBudget: 15000,
  totalEstimated: 12500,
  remaining: 2500,
  perPerson: 6250,
  health: BudgetHealth.HEALTHY,
  categories: [
    { id: 'cat-1', name: 'Transport', allocated: 4000, spent: 3500, color: '#6366f1' }, // Indigo
    { id: 'cat-2', name: 'Accommodation', allocated: 5000, spent: 4000, color: '#10b981' }, // Emerald
    { id: 'cat-3', name: 'Food', allocated: 4000, spent: 3000, color: '#f59e0b' }, // Amber
    { id: 'cat-4', name: 'Activities', allocated: 2000, spent: 2000, color: '#ec4899' }, // Pink
  ],
  savings: [
    {
      id: 'save-1',
      title: 'Switch to public transport for Airport drop',
      description: 'The local KTDC bus runs every hour directly to Anjuna for much cheaper.',
      originalCost: 400,
      suggestedCost: 100,
      savingsAmount: 300,
      category: 'Transport',
      actionText: 'Apply Change'
    }
  ]
};
