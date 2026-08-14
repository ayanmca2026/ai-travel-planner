import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/Home';
import FeaturesPage from './pages/Home';
import HowItWorksPage from './pages/Home';
import AboutPage from './pages/Home';
import SharedTripPage from './pages/SharedTrip';

import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';

import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/Dashboard';
import CreateTripPage from './pages/CreateTrip';
import TripDetailPage from './pages/TripDetails';
import SavedTripsPage from './pages/SavedTrips';
import MapViewPage from './pages/MapView';
import BudgetPage from './pages/Budget';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import AIAssistantPage from './pages/Assistant';
import AIPlanningLoader from './components/ai/AIPlanningLoader';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/share/:shareId" element={<SharedTripPage />} />
      </Route>
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="/ai-loader" element={<AIPlanningLoader />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/trips/new" element={<CreateTripPage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
        <Route path="/trips/:id/map" element={<MapViewPage />} />
        <Route path="/trips/:id/budget" element={<BudgetPage />} />
        
        <Route path="/trips" element={<SavedTripsPage />} />
        <Route path="/explore" element={<div className="p-8 font-bold">Explore Destinations (Coming Soon)</div>} />
        <Route path="/saved" element={<div className="p-8 font-bold">Saved Places (Coming Soon)</div>} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
