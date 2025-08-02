import { Car, Shield, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const isAuthPage = location.pathname === '/offer-ride' || location.pathname === '/find-ride';
  const showLogout = user && isAuthPage;

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-blue-600">CarpoolConnect</h1>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
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
            {showLogout ? (
              <>
                <div className="flex items-center text-gray-700 px-2">
                  <User className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
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
              {showLogout ? (
                <>
                  <div className="flex items-center justify-center text-gray-700 px-4 py-2">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
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
