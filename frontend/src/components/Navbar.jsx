import { Car, Shield, Phone } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="bg-blue-700 p-2 rounded-lg mr-3 group-hover:bg-blue-800 group-hover:scale-110 transition-all duration-300">
                <Car className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">CarpoolConnect</h1>
                <div className="flex items-center text-xs text-green-600">
                  <Shield className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                  Verified & Safe
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center text-sm text-gray-600 hover:text-blue-700 transition-colors cursor-pointer group">
              <Phone className="w-4 h-4 mr-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              24/7 Support
            </div>
            <button className="text-gray-700 hover:text-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50">
              Sign In
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              Join Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
