import { ItineraryItem, ItemCategory } from '@/types/itinerary';
import { Card } from '@/components/common/Card';
import { formatTime, formatCurrency, formatDuration } from '@/utils/format';
import { MapPin, Clock, Wallet, Navigation, Map, Coffee, Bed, Camera, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Dropdown } from '@/components/common/Dropdown';

interface ItineraryItemProps {
  item: ItineraryItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ActivityCard({ item, onEdit, onDelete }: ItineraryItemProps) {
  const getIcon = () => {
    switch (item.category) {
      case ItemCategory.ATTRACTION: return <Camera className="w-5 h-5" />;
      case ItemCategory.RESTAURANT: return <Coffee className="w-5 h-5" />;
      case ItemCategory.ACCOMMODATION: return <Bed className="w-5 h-5" />;
      case ItemCategory.TRANSPORT: return <Navigation className="w-5 h-5" />;
      default: return <Map className="w-5 h-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (item.category) {
      case ItemCategory.ATTRACTION: return 'bg-primary-100 text-primary-600 dark:bg-primary-900/30';
      case ItemCategory.RESTAURANT: return 'bg-accent-100 text-accent-600 dark:bg-accent-900/30';
      case ItemCategory.ACCOMMODATION: return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30';
      case ItemCategory.TRANSPORT: return 'bg-slate-100 text-slate-600 dark:bg-slate-800';
      default: return 'bg-success-100 text-success-600 dark:bg-success-900/30';
    }
  };

  return (
    <div className="flex gap-4 relative group">
      <div className="flex flex-col items-center mt-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-slate-900 ${getCategoryColor()}`}>
          {getIcon()}
        </div>
        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 -mt-2 group-last:hidden"></div>
      </div>
      
      <Card className="flex-1 mb-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h4>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 mr-1" /> {formatTime(item.time)}
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> {formatDuration(item.duration)}
              </span>
              {item.cost > 0 && (
                <span className="flex items-center text-accent-600 dark:text-accent-400 font-medium">
                  <Wallet className="w-3.5 h-3.5 mr-1" /> {formatCurrency(item.cost)}
                </span>
              )}
            </div>
          </div>
          
          {(onEdit || onDelete) && (
            <Dropdown
              trigger={<button className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><MoreVertical className="w-5 h-5" /></button>}
              align="right"
              items={[
                { id: 'edit', label: 'Edit Activity', icon: <Edit2 className="w-4 h-4" />, onClick: () => onEdit?.(item.id) },
                { id: 'delete', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, danger: true, onClick: () => onDelete?.(item.id) },
              ]}
            />
          )}
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">{item.description}</p>
        
        {item.location && (
          <div className="mt-4 flex items-center text-xs text-primary-600 hover:underline cursor-pointer bg-primary-50 dark:bg-primary-900/10 p-2 rounded-lg inline-flex">
            <MapPin className="w-3.5 h-3.5 mr-1" /> {item.location.address}
          </div>
        )}
      </Card>
    </div>
  );
}
