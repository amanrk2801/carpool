import { Search, Plus, Shield, Users, Star } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-700 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-600 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-green-200">
            <Shield className="w-4 h-4 mr-2" />
            Verified & Trusted by 50,000+ Users
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Travel Safe, Share Smart,
            <span className="text-blue-700"> Save Money</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with India's most reliable carpool network. Every member undergoes verification, 
            every trip includes live tracking, and every ride prioritizes your security and comfort.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <Users className="w-5 h-5 text-blue-700 mr-2 group-hover:scale-110 transition-transform" />
              50,000+ Verified Members
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <Star className="w-5 h-5 text-yellow-500 mr-2 group-hover:scale-110 transition-transform group-hover:rotate-12" />
              4.8/5 Safety Rating
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <Shield className="w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
              100% Identity Verified
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Find a Safe Ride
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Offer a Trusted Ride
            </button>
          </div>
          
          {/* Security Assurance */}
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <p className="text-gray-700 font-medium flex items-start">
              <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              Security Guarantee: Real-time GPS monitoring, instant emergency alerts, 
              and round-the-clock assistance. Your protection comes first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
