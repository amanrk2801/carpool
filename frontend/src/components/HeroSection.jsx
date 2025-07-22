import { Search, Plus } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share the Journey,
            <span className="text-blue-600"> Split the Cost</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with trusted drivers and passengers in your area. Make commuting 
            affordable, eco-friendly, and social with our secure carpool platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find a Ride
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Offer a Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
