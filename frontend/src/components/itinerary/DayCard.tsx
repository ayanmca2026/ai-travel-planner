import { useState } from 'react';
import { ItineraryDay } from '@/types/itinerary';
import { formatCurrency, formatDate } from '@/utils/format';
import { ChevronDown, ChevronUp, Map } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import { motion, AnimatePresence } from 'framer-motion';

interface DayCardProps {
  day: ItineraryDay;
  isExpandedInitial?: boolean;
}

export function DayCard({ day, isExpandedInitial = false }: DayCardProps) {
  const [isExpanded, setIsExpanded] = useState(isExpandedInitial);

  return (
    <div className="mb-8">
      <div 
        className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors mb-6 sticky top-16 z-20 backdrop-blur-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex flex-col items-center justify-center font-bold">
            <span className="text-xs opacity-80 uppercase tracking-wider">Day</span>
            <span className="text-xl leading-none">{day.dayNumber}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{day.theme}</h3>
            <p className="text-sm text-slate-500">{formatDate(day.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Est. Cost</p>
            <p className="font-bold text-primary-600">{formatCurrency(day.estimatedCost)}</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-4 md:pl-8"
          >
            {day.items.length > 0 ? (
              day.items.map(item => (
                <ActivityCard key={item.id} item={item} />
              ))
            ) : (
              <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500">
                <Map className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p>No activities planned for this day yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
