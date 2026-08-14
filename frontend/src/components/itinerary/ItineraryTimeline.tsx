import { ItineraryDay } from '@/types/itinerary';
import { DayCard } from './DayCard';

interface ItineraryTimelineProps {
  days: ItineraryDay[];
}

export function ItineraryTimeline({ days }: ItineraryTimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-10 md:left-14 top-8 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full hidden md:block"></div>
      
      {days.map((day, index) => (
        <DayCard 
          key={day.id} 
          day={day} 
          isExpandedInitial={index === 0} 
        />
      ))}
    </div>
  );
}
