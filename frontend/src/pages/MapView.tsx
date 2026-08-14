import { useState } from 'react';
import TripMap from '@/components/map/TravelMap';
import { MOCK_ITINERARY } from '@/utils/mockData';
import { MapPin, Navigation } from 'lucide-react';

export default function MapViewPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const items = MOCK_ITINERARY.days.flatMap(d => d.items);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 md:-m-8">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
            <h2 className="font-bold text-lg flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary-600" /> Locations</h2>
            <p className="text-xs text-slate-500 mt-1">Select an item to view on map</p>
          </div>
          
          <div className="p-4 space-y-6">
            {MOCK_ITINERARY.days.map((day) => (
              <div key={day.id}>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 sticky top-16 bg-white dark:bg-slate-900 py-1">
                  Day {day.dayNumber}
                </h3>
                <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                  {day.items.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setActiveItem(item.id)}
                      className={`relative flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeItem === item.id 
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 z-10 relative left-1.5" />
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-white leading-tight mb-1">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative z-0 min-h-[400px]">
          <TripMap items={items} />
          
          {/* Legend/Controls Overlay */}
          <div className="absolute top-4 right-4 z-[400] bg-white dark:bg-slate-900 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 flex flex-col gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs font-medium">
              <div className="w-3 h-3 rounded-full bg-primary-500" /> Attractions
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <div className="w-3 h-3 rounded-full bg-accent-500" /> Restaurants
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <div className="w-3 h-3 rounded-full bg-emerald-500" /> Accommodation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
