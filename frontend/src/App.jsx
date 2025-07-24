import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import JoinFree from './components/JoinFree';
import OfferRide from './components/OfferRide';

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
      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/join" element={<JoinFree />} />
        
        {/* Ride Pages */}
        <Route path="/offer-ride" element={<OfferRide />} />
        
        {/* Fallback route - redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
