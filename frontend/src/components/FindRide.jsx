import { Shield, Car, MapPin, Calendar, Clock, Users, ArrowLeft, Search, Filter, Star, IndianRupee, Navigation } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

/**
 * FindRide Component
 * 
 * Features:
 * - Consistent design with other pages
 * - Search form for finding rides
 * - Filter options (price, time, preferences)
 * - List of available rides with driver details
 * - Interactive booking interface
 * - Real-time search and filtering
 * - Responsive design
 */
function FindRide() {
  // State for search inputs
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  // State for filters
  const [filters, setFilters] = useState({
    maxPrice: '',
    departureTime: '',
    instantBooking: false,
    allowSmoking: false,
    allowPets: false,
    allowFood: false,
    minRating: 0
  });

  // State for UI
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Dummy data for available rides
  const [availableRides] = useState([
    {
      id: 1,
      driver: {
        name: "Rahul Sharma",
        rating: 4.8,
        trips: 45,
        photo: "RS"
      },
      route: {
        from: "Mumbai, Maharashtra",
        to: "Pune, Maharashtra",
        stops: ["Lonavala"]
      },
      departure: {
        date: "2025-07-25",
        time: "09:00"
      },
      car: {
        model: "Honda City",
        number: "MH 12 AB 1234"
      },
      pricing: {
        pricePerSeat: 350,
        availableSeats: 3
      },
      preferences: {
        instantBooking: true,
        allowSmoking: false,
        allowPets: true,
        allowFood: true
      }
    },
    {
      id: 2,
      driver: {
        name: "Priya Patel",
        rating: 4.9,
        trips: 67,
        photo: "PP"
      },
      route: {
        from: "Mumbai, Maharashtra", 
        to: "Pune, Maharashtra",
        stops: []
      },
      departure: {
        date: "2025-07-25",
        time: "14:30"
      },
      car: {
        model: "Maruti Swift",
        number: "MH 14 CD 5678"
      },
      pricing: {
        pricePerSeat: 300,
        availableSeats: 2
      },
      preferences: {
        instantBooking: false,
        allowSmoking: false,
        allowPets: false,
        allowFood: true
      }
    },
    {
      id: 3,
      driver: {
        name: "Amit Kumar",
        rating: 4.7,
        trips: 32,
        photo: "AK"
      },
      route: {
        from: "Mumbai, Maharashtra",
        to: "Pune, Maharashtra", 
        stops: ["Khopoli", "Lonavala"]
      },
      departure: {
        date: "2025-07-25",
        time: "18:00"
      },
      car: {
        model: "Hyundai Creta",
        number: "MH 01 EF 9012"
      },
      pricing: {
        pricePerSeat: 400,
        availableSeats: 4
      },
      preferences: {
        instantBooking: true,
        allowSmoking: false,
        allowPets: false,
        allowFood: true
      }
    }
  ]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle passenger count change
  const handlePassengerChange = (increment) => {
    setSearchData(prev => ({
      ...prev,
      passengers: Math.max(1, Math.min(8, prev.passengers + increment))
    }));
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle ride booking
  const handleBookRide = (rideId) => {
    // Simulate booking
    alert(`Booking ride ${rideId}! You will be redirected to payment page.`);
  };

  // Handle contact driver
  const handleContactDriver = (driverName) => {
    alert(`Contacting ${driverName}... Chat window will open.`);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <ArrowLeft className="w-5 h-5 text-gray-600 mr-3 group-hover:text-blue-600 transition-colors" />
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
                className="text-green-700 hover:text-green-800 text-sm font-medium transition-colors border border-green-600 rounded-lg px-4 py-2 hover:bg-green-50"
              >
                Offer Ride
              </Link>
              <Link 
                to="/signin" 
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                to="/join" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-6">
              <Search className="w-4 h-4 mr-2" />
              Find Your Perfect Ride
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Find a Ride
            </h1>
            <p className="text-gray-600 text-lg">
              Search for available rides and travel with verified drivers across India
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* From Location */}
                <div>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={searchData.from}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Starting location"
                    />
                  </div>
                </div>

                {/* To Location */}
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="to"
                      name="to"
                      value={searchData.to}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Destination"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={searchData.date}
                      onChange={handleSearchChange}
                      min={getMinDate()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handlePassengerChange(-1)}
                      disabled={searchData.passengers <= 1}
                      className="w-10 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                      {searchData.passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePassengerChange(1)}
                      disabled={searchData.passengers >= 8}
                      className="w-10 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Search Rides
                    </div>
                  )}
                </button>
              </div>

              {/* Filters Section */}
              {showFilters && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price per Seat
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="maxPrice"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Any price"
                        />
                      </div>
                    </div>

                    {/* Departure Time */}
                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select
                        id="departureTime"
                        name="departureTime"
                        value={filters.departureTime}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Any time</option>
                        <option value="morning">Morning (6AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 6PM)</option>
                        <option value="evening">Evening (6PM - 12AM)</option>
                      </select>
                    </div>

                    {/* Minimum Rating */}
                    <div>
                      <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        id="minRating"
                        name="minRating"
                        value={filters.minRating}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">Any rating</option>
                        <option value="4">4+ stars</option>
                        <option value="4.5">4.5+ stars</option>
                        <option value="4.8">4.8+ stars</option>
                      </select>
                    </div>
                  </div>

                  {/* Preference Checkboxes */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Ride Preferences</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="instantBooking"
                          checked={filters.instantBooking}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Instant Booking</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowSmoking"
                          checked={filters.allowSmoking}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Smoking OK</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowPets"
                          checked={filters.allowPets}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Pets OK</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowFood"
                          checked={filters.allowFood}
                          onChange={handleFilterChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Food OK</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Rides ({availableRides.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Showing rides for {searchData.from} → {searchData.to}
                </div>
              </div>

              {/* Ride Cards */}
              <div className="space-y-4">
                {availableRides.map((ride) => (
                  <div key={ride.id} className="bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      {/* Driver Info */}
                      <div className="lg:col-span-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {ride.driver.photo}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{ride.driver.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              {ride.driver.rating} ({ride.driver.trips} trips)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Route & Time */}
                      <div className="lg:col-span-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-800">
                            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="font-medium">{ride.route.from}</span>
                          </div>
                          <div className="flex items-center text-gray-800">
                            <Navigation className="w-4 h-4 mr-2 text-green-600" />
                            <span className="font-medium">{ride.route.to}</span>
                          </div>
                          {ride.route.stops.length > 0 && (
                            <div className="text-sm text-gray-600">
                              Stops: {ride.route.stops.join(', ')}
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {new Date(ride.departure.date).toLocaleDateString()} at {ride.departure.time}
                          </div>
                        </div>
                      </div>

                      {/* Car & Preferences */}
                      <div className="lg:col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-700">
                            <Car className="w-4 h-4 mr-2" />
                            {ride.car.model}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {ride.pricing.availableSeats} seats available
                          </div>
                          <div className="flex space-x-1 mt-2">
                            {ride.preferences.instantBooking && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Instant</span>
                            )}
                            {ride.preferences.allowPets && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Pets OK</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="lg:col-span-3">
                        <div className="text-right space-y-3">
                          <div>
                            <div className="text-2xl font-bold text-gray-800">
                              ₹{ride.pricing.pricePerSeat}
                            </div>
                            <div className="text-sm text-gray-600">per seat</div>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => handleBookRide(ride.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              {ride.preferences.instantBooking ? 'Book Now' : 'Request Booking'}
                            </button>
                            <button
                              onClick={() => handleContactDriver(ride.driver.name)}
                              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Contact Driver
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasSearched && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to find your ride?</h3>
              <p className="text-gray-600">Enter your travel details above to search for available rides</p>
            </div>
          )}

          {/* Safety Notice */}
          <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-gray-700 flex items-start">
              <Shield className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
              All drivers are verified with background checks. GPS tracking and emergency support available 24/7 for your safety.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default FindRide;
