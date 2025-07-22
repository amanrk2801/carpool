import { Car } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Car className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-blue-600">CarpoolConnect</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
