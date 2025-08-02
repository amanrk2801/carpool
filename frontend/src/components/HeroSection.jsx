import { Search, Plus, Shield, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
          Safe & Smart <span className="text-blue-600">Carpooling</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Connect with verified commuters across India. Save money, reduce pollution, and travel safely with GPS tracking.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <Link 
            to="/find-ride"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors text-sm sm:text-base touch-manipulation"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            Find a Ride
          </Link>
          <Link 
            to="/offer-ride"
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors text-sm sm:text-base touch-manipulation"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Offer a Ride
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
