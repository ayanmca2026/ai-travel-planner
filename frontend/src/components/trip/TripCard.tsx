import { Trip, TripStatus } from '@/types/trip';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Calendar, Wallet, Users, MapPin } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: TripStatus) => {
    switch(status) {
      case TripStatus.PLANNING: return 'warning';
      case TripStatus.UPCOMING: return 'info';
      case TripStatus.ACTIVE: return 'success';
      case TripStatus.COMPLETED: return 'primary';
      default: return 'primary';
    }
  };

  return (
    <Card 
      className="cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      padding="none"
      onClick={() => navigate(`/trips/${trip.id}`)}
    >
      <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {trip.imageUrl ? (
          <img 
            src={trip.imageUrl} 
            alt={trip.destination} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <MapPin className="w-12 h-12 opacity-20" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusColor(trip.status)} className="shadow-sm">
            {trip.status}
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white line-clamp-1">{trip.destination}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Wallet className="w-4 h-4 mr-2 text-slate-400" />
            {formatCurrency(trip.budget)} total
          </div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Users className="w-4 h-4 mr-2 text-slate-400" />
            {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
          </div>
        </div>
      </div>
    </Card>
  );
}
