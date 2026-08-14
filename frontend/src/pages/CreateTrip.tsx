import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { Badge } from '@/components/common/Badge';
import { MapPin, Users, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TRAVEL_STYLES, INTERESTS, TRANSPORT_OPTIONS, ACCOMMODATION_OPTIONS, FOOD_PREFERENCES } from '@/utils/constants';

const STEPS = [
  { id: 'location', title: 'Start' },
  { id: 'destination', title: 'Dest' },
  { id: 'dates', title: 'Dates' },
  { id: 'travelers', title: 'Travelers' },
  { id: 'budget', title: 'Budget' },
  { id: 'style', title: 'Style' },
  { id: 'interests', title: 'Interests' },
  { id: 'transport', title: 'Transport' },
  { id: 'stay', title: 'Stay' },
  { id: 'food', title: 'Food' },
  { id: 'review', title: 'Review' }
];

export default function CreateTripPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    startingLocation: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 15000,
    travelStyle: '',
    interests: [] as string[],
    transportation: '',
    accommodation: '',
    foodPreference: ''
  });

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else handleGenerate();
  };
  
  const prevStep = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleGenerate = () => {
    navigate('/ai-loader'); // Mock loader page
  };

  const isStepValid = () => {
    switch (step) {
      case 0: return formData.startingLocation.length > 0;
      case 1: return formData.destination.length > 0;
      case 2: return formData.startDate && formData.endDate && new Date(formData.startDate) <= new Date(formData.endDate);
      case 3: return formData.travelers > 0;
      case 4: return formData.budget > 0;
      case 5: return formData.travelStyle !== '';
      case 6: return formData.interests.length > 0;
      case 7: return formData.transportation !== '';
      case 8: return formData.accommodation !== '';
      case 9: return formData.foodPreference !== '';
      default: return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 mb-20 px-4">
      <div className="mb-10 mt-6 relative overflow-hidden px-4">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
        ></div>
        <div className="flex justify-between relative z-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                i < step ? 'bg-primary-500 text-white' : i === step ? 'bg-primary-100 text-primary-600 border-2 border-primary-500 dark:bg-primary-900' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] md:text-xs mt-1 font-medium hidden md:block ${i <= step ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="min-h-[450px] flex flex-col p-6 md:p-10 shadow-lg border border-slate-200 dark:border-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {/* Step 1 */}
            {step === 0 && (
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold">Where are you starting from?</h2>
                <p className="text-slate-500">Let us know your starting point to calculate transport costs.</p>
                <div className="mt-8 text-left">
                  <Input 
                    label="Starting City" 
                    placeholder="e.g. New Delhi, IN" 
                    icon={<MapPin className="w-5 h-5" />} 
                    value={formData.startingLocation} 
                    onChange={e => setFormData({...formData, startingLocation: e.target.value})} 
                  />
                </div>
              </div>
            )}
            
            {/* Step 2 */}
            {step === 1 && (
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold">Where do you want to go?</h2>
                <p className="text-slate-500">Pick your dream destination.</p>
                <div className="mt-8 text-left">
                  <Input 
                    label="Destination" 
                    placeholder="e.g. Goa, India" 
                    icon={<MapPin className="w-5 h-5 text-accent-500" />} 
                    value={formData.destination} 
                    onChange={e => setFormData({...formData, destination: e.target.value})} 
                  />
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="text-primary-600" onClick={() => setFormData({...formData, destination: 'Surprise Me!'})}>
                      <Sparkles className="w-4 h-4 mr-2" /> Surprise Me!
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold">When are you traveling?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <Input type="date" label="Start Date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  <Input type="date" label="End Date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold">Who's coming along?</h2>
                <div className="mt-8">
                  <Input type="number" min="1" max="20" label="Number of Travelers" icon={<Users className="w-5 h-5" />} value={formData.travelers} onChange={e => setFormData({...formData, travelers: parseInt(e.target.value)})} />
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 4 && (
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold">What's your total budget?</h2>
                <p className="text-slate-500 mb-8">Move the slider to set your total budget for the whole trip.</p>
                <div className="mt-12 mb-8">
                  <input 
                    type="range" min="1000" max="200000" step="1000" 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    value={formData.budget} 
                    onChange={e => setFormData({...formData, budget: parseInt(e.target.value)})} 
                  />
                  <div className="text-5xl font-bold text-primary-600 mt-6">₹{formData.budget.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-slate-500 mt-2">
                    ≈ ₹{Math.round(formData.budget / (formData.travelers || 1)).toLocaleString('en-IN')} per person
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {step === 5 && (
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Select your travel style</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TRAVEL_STYLES.map(style => (
                    <div 
                      key={style.id} 
                      onClick={() => setFormData({...formData, travelStyle: style.id})}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${formData.travelStyle === style.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-primary-300'}`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <h3 className="font-bold text-lg">{style.label}</h3>
                      <p className="text-sm text-slate-500 mt-1">{style.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7 */}
            {step === 6 && (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">What are your interests?</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {INTERESTS.map(interest => (
                    <Chip 
                      key={interest} 
                      label={interest} 
                      active={formData.interests.includes(interest)}
                      onClick={() => {
                        const newInterests = formData.interests.includes(interest)
                          ? formData.interests.filter(i => i !== interest)
                          : [...formData.interests, interest];
                        setFormData({...formData, interests: newInterests});
                      }}
                      className="text-lg py-2 px-4"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 8 */}
            {step === 7 && (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Preferred Transportation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {TRANSPORT_OPTIONS.map(opt => (
                    <label key={opt.id} className={`flex items-center p-4 border rounded-xl cursor-pointer ${formData.transportation === opt.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                      <input type="radio" name="transport" className="w-5 h-5 text-primary-600" checked={formData.transportation === opt.id} onChange={() => setFormData({...formData, transportation: opt.id})} />
                      <span className="ml-3 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9 */}
            {step === 8 && (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Preferred Accommodation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {ACCOMMODATION_OPTIONS.map(opt => (
                    <label key={opt.id} className={`flex items-center p-4 border rounded-xl cursor-pointer ${formData.accommodation === opt.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                      <input type="radio" name="accommodation" className="w-5 h-5 text-primary-600" checked={formData.accommodation === opt.id} onChange={() => setFormData({...formData, accommodation: opt.id})} />
                      <span className="ml-3 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10 */}
            {step === 9 && (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Food Preferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {FOOD_PREFERENCES.map(opt => (
                    <label key={opt.id} className={`flex items-center p-4 border rounded-xl cursor-pointer ${formData.foodPreference === opt.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                      <input type="radio" name="food" className="w-5 h-5 text-primary-600" checked={formData.foodPreference === opt.id} onChange={() => setFormData({...formData, foodPreference: opt.id})} />
                      <span className="ml-3 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 11: Review */}
            {step === 10 && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary-600">Ready to go?</h2>
                  <p className="text-slate-500">Review your trip details before we generate the perfect itinerary.</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 mb-1">Route</div>
                      <div className="font-bold text-base">{formData.startingLocation} → {formData.destination}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-1">Dates</div>
                      <div className="font-bold text-base">{formData.startDate} to {formData.endDate}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-1">Travelers & Budget</div>
                      <div className="font-bold text-base">{formData.travelers} people • ₹{formData.budget.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-1">Style</div>
                      <div className="font-bold text-base capitalize">{formData.travelStyle}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-slate-500 mb-2 text-sm">Interests</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map(i => <Badge key={i} variant="primary">{i}</Badge>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={prevStep} disabled={step === 0} className={step === 0 ? 'invisible' : ''}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={nextStep} disabled={!isStepValid()} size="lg" className={step === STEPS.length - 1 ? 'bg-accent-500 hover:bg-accent-600' : ''}>
            {step === STEPS.length - 1 ? (
              <><Sparkles className="w-4 h-4 mr-2" /> Generate Trip</>
            ) : (
              <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
