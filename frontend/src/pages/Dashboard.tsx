import { useAuthStore } from '@/store/auth.store';
import { Card } from '@/components/common/Card';
import { Map, Wallet, MapPin, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
  
  const stats = [
    { title: 'Total Trips', value: '0', icon: <Map className="w-6 h-6 text-primary-500" />, bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { title: 'Places Explored', value: '0', icon: <MapPin className="w-6 h-6 text-accent-500" />, bg: 'bg-accent-50 dark:bg-accent-900/20' },
    { title: 'Money Saved', value: '₹0', icon: <Wallet className="w-6 h-6 text-success-500" />, bg: 'bg-success-50 dark:bg-success-900/20' },
    { title: 'Upcoming', value: '0', icon: <Calendar className="w-6 h-6 text-warning-500" />, bg: 'bg-warning-50 dark:bg-warning-900/20' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {greeting}, {user?.name || 'Traveler'}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Ready to plan your next student adventure?</p>
        </div>
        <Button onClick={() => navigate('/trips/new')}>
          <Plus className="w-4 h-4 mr-2" /> Plan a New Trip
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center gap-4 p-4 border-none shadow-sm dark:bg-slate-900">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Trips</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/trips')}>View All</Button>
        </div>
        
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 bg-transparent dark:border-slate-800">
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
            <Map className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No trips yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">You haven't planned any trips yet. Create your first itinerary to get started!</p>
          <Button onClick={() => navigate('/trips/new')}>
            Start Planning
          </Button>
        </Card>
      </div>
    </div>
  );
}
