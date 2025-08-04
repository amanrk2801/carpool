import { Car, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleLogoClick = () => {
    // If user is logged in, redirect to dashboard, otherwise go to home page
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-blue-600">CarpoolConnect</h1>
              </div>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
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
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-purple-700 hover:text-purple-800 px-4 py-2 text-sm font-medium transition-colors border border-purple-600 rounded-lg hover:bg-purple-50"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{user.firstName || user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-700 hover:text-red-800 px-4 py-2 text-sm font-medium transition-colors border border-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
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
                  Join
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {user && (
                <Link 
                  to="/dashboard"
                  className="text-purple-700 hover:text-purple-800 px-4 py-2 text-sm font-medium transition-colors border border-purple-600 rounded-lg hover:bg-purple-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/find-ride"
                className="text-blue-700 hover:text-blue-800 px-4 py-2 text-sm font-medium transition-colors border border-blue-600 rounded-lg hover:bg-blue-50 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Ride
              </Link>
              <Link 
                to="/offer-ride"
                className="text-green-700 hover:text-green-800 px-4 py-2 text-sm font-medium transition-colors border border-green-600 rounded-lg hover:bg-green-50 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Offer Ride
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/profile"
                    className="flex items-center justify-center text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{user.firstName || user.name}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-red-700 hover:text-red-800 px-4 py-2 text-sm font-medium transition-colors border border-red-600 rounded-lg hover:bg-red-50 text-center flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/join"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
