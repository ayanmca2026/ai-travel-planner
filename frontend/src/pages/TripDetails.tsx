import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '@/components/common/Tabs';
import { Button } from '@/components/common/Button';
import { Share2, Download, Edit3, Trash2, Calendar, MapPin, Users, Wallet } from 'lucide-react';
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline';
import { BudgetOverview } from '@/components/budget/BudgetOverview';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHealthBar } from '@/components/budget/BudgetHealthBar';
import { BudgetOptimizer } from '@/components/budget/BudgetOptimizer';
import { SuggestedPrompts } from '@/components/assistant/SuggestedPrompts';
import { ChatWindow } from '@/components/assistant/ChatWindow';
import TripMap from '@/components/map/TravelMap';

// Mocks for presentation
import { MOCK_ITINERARY, MOCK_BUDGET, MOCK_TRIP } from '@/utils/mockData';

export default function TripDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // In a real app, you would fetch data here based on the `id`

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Sidebar Trip Info */}
      <div className="lg:w-80 flex flex-col gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="h-48 bg-slate-200 relative">
            <img src={MOCK_TRIP.imageUrl} alt={MOCK_TRIP.destination} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h1 className="text-2xl font-bold text-white">{MOCK_TRIP.destination}</h1>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Calendar className="w-5 h-5 mr-3 text-slate-400" />
              <span>{MOCK_TRIP.startDate} to {MOCK_TRIP.endDate}</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Users className="w-5 h-5 mr-3 text-slate-400" />
              <span>{MOCK_TRIP.travelers} Travelers</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Wallet className="w-5 h-5 mr-3 text-slate-400" />
              <span>₹{MOCK_TRIP.budget.toLocaleString()} Budget</span>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
            <Button variant="outline" size="sm" className="w-full"><Download className="w-4 h-4 mr-2" /> Export</Button>
            <Button variant="outline" size="sm" className="w-full"><Edit3 className="w-4 h-4 mr-2" /> Edit</Button>
            <Button variant="danger" size="sm" className="w-full"><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-[600px]">
        <Tabs 
          tabs={[
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'map', label: 'Map View' },
            { id: 'budget', label: 'Budget' },
          ]} 
          activeId={activeTab}
          onChange={setActiveTab}
          className="mb-6 bg-white dark:bg-slate-900 rounded-xl px-2 pt-2 border border-slate-200 dark:border-slate-800 sticky top-16 z-30"
        />
        
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <SuggestedPrompts />
          <Button onClick={() => setIsChatOpen(true)} className="flex-shrink-0 ml-4 hidden md:flex">
            Ask AI Assistant
          </Button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 pb-20">
          {activeTab === 'itinerary' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ItineraryTimeline days={MOCK_ITINERARY.days} />
            </div>
          )}
          
          {activeTab === 'map' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 h-full min-h-[500px]">
              <TripMap items={MOCK_ITINERARY.days.flatMap(d => d.items)} />
            </div>
          )}
          
          {activeTab === 'budget' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <BudgetOverview analysis={MOCK_BUDGET} />
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold mb-6">Cost Breakdown</h3>
                  <BudgetChart categories={MOCK_BUDGET.categories} />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold mb-6">Budget Health</h3>
                    <BudgetHealthBar 
                      percentage={(MOCK_BUDGET.totalEstimated / MOCK_BUDGET.totalBudget) * 100} 
                      health={MOCK_BUDGET.health} 
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">AI Savings Suggestions</h3>
                    <div className="space-y-4">
                      {MOCK_BUDGET.savings.map(s => (
                        <BudgetOptimizer key={s.id} suggestion={s} onApply={() => {}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Floating FAB for mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <Button onClick={() => setIsChatOpen(true)} className="rounded-full w-14 h-14 shadow-lg p-0 flex items-center justify-center">
          ✨
        </Button>
      </div>
    </div>
  );
}
