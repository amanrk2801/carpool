import { Car, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Features:
 * - Consistent branding across all pages
 * - Navigation links to Sign In and Join Free pages
 * - Responsive design
 * - Hover effects and transitions
 */
function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-600">CarpoolConnect</h1>
                <div className="flex items-center text-xs text-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified & Safe
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/find-ride"
              className="text-blue-700 hover:text-blue-800 px-4 py-2 text-sm font-medium transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Find Ride
            </Link>
            <Link 
              to="/offer-ride"
              className="text-green-700 hover:text-green-800 px-4 py-2 text-sm font-medium transition-colors border border-green-600 rounded-lg hover:bg-green-50"
            >
              Offer Ride
            </Link>
            <Link 
              to="/signin"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/join"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Join Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
