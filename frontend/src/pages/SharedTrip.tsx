import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TRIP, MOCK_ITINERARY, MOCK_BUDGET } from '@/utils/mockData';
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline';
import TripMap from '@/components/map/TravelMap';
import { BudgetOverview } from '@/components/budget/BudgetOverview';
import { Button } from '@/components/common/Button';
import { Sparkles } from 'lucide-react';

export default function SharedTripPage() {
  const { shareId } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch by shareId

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Read Only Banner */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left gap-4">
        <div>
          <h3 className="font-bold text-primary-700 dark:text-primary-400">Shared Trip View</h3>
          <p className="text-sm text-primary-600/80 dark:text-primary-300">You are viewing a read-only trip created with TripWise AI.</p>
        </div>
        <Button onClick={() => navigate('/register')}>
          <Sparkles className="w-4 h-4 mr-2" /> Plan Your Own Trip
        </Button>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{MOCK_TRIP.title}</h1>
        <p className="text-slate-500 text-lg">
          {MOCK_TRIP.startDate} to {MOCK_TRIP.endDate} • {MOCK_TRIP.travelers} Travelers
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            <ItineraryTimeline days={MOCK_ITINERARY.days} />
          </section>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Map</h2>
            <TripMap items={MOCK_ITINERARY.days.flatMap(d => d.items)} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Budget Overview</h2>
            <BudgetOverview analysis={MOCK_BUDGET} />
          </section>
        </div>
      </div>
    </div>
  );
}
