import { motion } from 'framer-motion';
import { ArrowRight, Map, Wallet, Zap, Shield, Sparkles, Navigation, CloudSun, Users } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-6 py-24 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Student Travel Companion</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Plan smarter. Spend less. Explore more. Let AI build your perfect itinerary optimized for your student budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto w-full">
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary-500 text-lg shadow-sm"
            />
            <Button size="lg" className="w-full sm:w-auto py-4 px-8 rounded-xl shrink-0" onClick={() => navigate('/trips/new')}>
              Plan My Trip <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-slate-50 dark:bg-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need for the perfect trip</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Sparkles className="h-6 w-6 text-primary-500" />, title: 'AI Planning', desc: 'Personalized itineraries generated in seconds.' },
              { icon: <Wallet className="h-6 w-6 text-success-500" />, title: 'Budget Optimization', desc: 'Find the best student deals and cheap alternatives.' },
              { icon: <Navigation className="h-6 w-6 text-accent-500" />, title: 'Smart Routes', desc: 'Optimized travel paths to save time and money.' },
              { icon: <Map className="h-6 w-6 text-primary-500" />, title: 'Live Maps', desc: 'Interactive maps with all your stops.' },
              { icon: <CloudSun className="h-6 w-6 text-warning-500" />, title: 'Weather Intelligence', desc: 'Activity suggestions based on forecast.' },
              { icon: <Shield className="h-6 w-6 text-success-500" />, title: 'Student Deals', desc: 'Exclusive discounts for verified students.' },
              { icon: <Users className="h-6 w-6 text-accent-500" />, title: 'Trip Sharing', desc: 'Collaborate easily with friends.' },
              { icon: <Zap className="h-6 w-6 text-primary-500" />, title: 'AI Assistant', desc: '24/7 on-trip help and recommendations.' },
            ].map((feature, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="h-12 w-12 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Comparison */}
      <section className="w-full py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Travel more, spend less</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl opacity-80 scale-95 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-medium text-slate-500 mb-4">Traditional Planning</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between"><span>Flights</span><span>₹4,000</span></div>
              <div className="flex justify-between"><span>Hotel (2 nights)</span><span>₹2,000</span></div>
              <div className="flex justify-between"><span>Food & Activities</span><span>₹1,200</span></div>
            </div>
            <div className="pt-4 border-t border-slate-300 dark:border-slate-600 flex justify-between font-bold text-2xl">
              <span>Total</span><span>₹7,200</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-600 to-indigo-800 text-white p-8 rounded-3xl shadow-xl transform md:-translate-x-4 z-10 relative">
            <div className="absolute -top-4 -right-4 bg-accent-500 text-white font-bold px-4 py-1 rounded-full rotate-12 shadow-lg">Save 30%!</div>
            <h3 className="text-xl font-medium text-primary-100 mb-4">With TripWise AI</h3>
            <div className="space-y-4 mb-8 text-primary-50">
              <div className="flex justify-between"><span>Student Flights</span><span>₹2,800</span></div>
              <div className="flex justify-between"><span>Top-rated Hostel</span><span>₹800</span></div>
              <div className="flex justify-between"><span>Smart Route Food</span><span>₹1,450</span></div>
            </div>
            <div className="pt-4 border-t border-primary-400/30 flex justify-between font-bold text-4xl">
              <span>Total</span><span>₹5,050</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="w-full bg-primary-600 py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-8">Your next adventure starts with a better plan</h2>
        <Button size="lg" variant="secondary" onClick={() => navigate('/register')} className="text-primary-600">
          Create Free Account
        </Button>
      </section>
    </div>
  );
}
