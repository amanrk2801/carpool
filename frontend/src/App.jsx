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
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/join" element={<JoinFree />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/find-ride" element={<FindRide />} />
        
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/help" element={<Help />} />
        
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
