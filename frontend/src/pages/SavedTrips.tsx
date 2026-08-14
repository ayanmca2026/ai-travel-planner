import { useState } from 'react';
import { TripCard } from '@/components/trip/TripCard';
import { MOCK_TRIP } from '@/utils/mockData';
import { Input } from '@/components/common/Input';
import { Search, Filter } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { Map } from 'lucide-react';

export default function SavedTripsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  
  // Mock array
  const trips = [MOCK_TRIP, { ...MOCK_TRIP, id: 'trip-124', title: 'Manali Adventure', destination: 'Manali, India', status: 'COMPLETED' }];

  const filteredTrips = trips.filter(t => 
    t.destination.toLowerCase().includes(search.toLowerCase()) && 
    (filter === 'All' || t.status === filter)
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Trips</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage and view all your saved itineraries.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input 
            placeholder="Search trips..." 
            icon={<Search className="w-5 h-5" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-500" />
          <select 
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="PLANNING">Planning</option>
          </select>
        </div>
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip as any} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<Map className="w-8 h-8" />}
          title="No trips found"
          description="You haven't saved any trips matching your search yet."
        />
      )}
    </div>
  );
}
