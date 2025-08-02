import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import JoinFree from './components/Signup';
import OfferRide from './components/OfferRide';
import FindRide from './components/FindRide';
import HowItWorks from './components/HowItWorks';
import Safety from './components/Safety';
import Help from './components/Help';

/**
 * Main App Component
 * 
 * Features:
 * - React Router setup for navigation
 * - Route definitions for all pages
 * - Consistent layout structure
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/join" element={<JoinFree />} />
        
        {/* Ride Pages */}
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/find-ride" element={<FindRide />} />
        
        {/* Information Pages */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/help" element={<Help />} />
        
        {/* Fallback route - redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
