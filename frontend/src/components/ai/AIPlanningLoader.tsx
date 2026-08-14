import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plane, Map, Wallet, Calendar, Sparkles, Check } from 'lucide-react';
import { ProgressBar } from '@/components/common/ProgressBar';

const STEPS = [
  { icon: <Map className="w-8 h-8" />, text: "Analyzing destination..." },
  { icon: <Wallet className="w-8 h-8" />, text: "Finding budget-friendly options..." },
  { icon: <Calendar className="w-8 h-8" />, text: "Optimizing the route..." },
  { icon: <Sparkles className="w-8 h-8" />, text: "Calculating costs..." },
  { icon: <Plane className="w-8 h-8" />, text: "Building perfect itinerary..." },
];

export default function AIPlanningLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/trips/new-trip-123'), 500);
          return 100;
        }
        return p + 2.5; // Will take about 40 ticks * 100ms = 4 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    // Update step text based on progress
    if (progress < 20) setCurrentStep(0);
    else if (progress < 40) setCurrentStep(1);
    else if (progress < 60) setCurrentStep(2);
    else if (progress < 80) setCurrentStep(3);
    else setCurrentStep(4);
  }, [progress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full space-y-12">
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 text-primary-600 rounded-full flex items-center justify-center"
            >
              {progress >= 100 ? <Check className="w-10 h-10 text-success-500" /> : STEPS[currentStep].icon}
            </motion.div>
          </AnimatePresence>
          
          {/* Pulsing rings */}
          {progress < 100 && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 border-4 border-primary-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 border-4 border-primary-400 rounded-full animate-ping opacity-10 animation-delay-300"></div>
            </>
          )}
        </div>

        <div className="text-center space-y-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentStep}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {progress >= 100 ? "Trip Planned Successfully!" : STEPS[currentStep].text}
            </motion.h2>
          </AnimatePresence>
          <p className="text-slate-500">TripWise AI is crafting a personalized experience just for you.</p>
        </div>

        <div>
          <ProgressBar progress={progress} showPercentage color={progress >= 100 ? 'success' : 'primary'} />
        </div>
      </div>
    </div>
  );
}
