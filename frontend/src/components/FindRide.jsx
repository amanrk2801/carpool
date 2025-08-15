import { Car, MapPin, Calendar, Users, Search, Star, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function FindRide() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchData, setSearchData] = useState({ from: '', to: '', date: '', time: '', passengers: 1 });
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingRideId, setBookingRideId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    
    try {
      // Validate inputs
      if (!searchData.from.trim()) {
        setError('Please enter a departure location');
        setIsSearching(false);
        return;
      }
      if (!searchData.to.trim()) {
        setError('Please enter a destination');
        setIsSearching(false);
        return;
      }
      if (!searchData.date) {
        setError('Please select a departure date');
        setIsSearching(false);
        return;
      }
      
      const searchParams = {
        from: searchData.from.trim(),
        to: searchData.to.trim(),
        date: searchData.date,
        passengers: searchData.passengers
      };

      console.log('Search params:', searchParams);

      const response = await apiService.searchRides(searchParams);
      
      if (response.success) {
        setRides(response.data || []);
        setHasSearched(true);
      } else {
        setError(response.message || 'Failed to search rides');
        setRides([]);
        setHasSearched(true);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching for rides');
      setRides([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e) => {
    setSearchData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookRide = async (ride) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    setIsBooking(true);
    setBookingRideId(ride.id);
    setError('');

    try {
      console.log('Booking ride:', ride.id, 'with data:', {
        seatsRequested: searchData.passengers || 1,
        pickupLocation: searchData.from || ride.from,
        dropLocation: searchData.to || ride.to,
      });

      const bookingData = {
        seatsRequested: searchData.passengers || 1,
        pickupLocation: searchData.from || ride.from,
        dropLocation: searchData.to || ride.to,
      };

      const response = await apiService.bookRide(ride.id, bookingData);
      console.log('Booking response:', response);
      
      if (response.success) {
        alert('Ride booked successfully! Check your dashboard for booking details.');
        navigate('/dashboard');
      } else {
        console.error('Booking failed:', response);
        setError(response.message || response.error || 'Failed to book ride');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('An error occurred while booking the ride: ' + err.message);
    } finally {
      setIsBooking(false);
      setBookingRideId(null);
    }
  };

  const handleContactDriver = (ride) => {
    alert(`Contact driver: ${ride.driver?.name || 'Driver'} at ${ride.driver?.phone || 'Phone not available'}`);
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Find a Ride</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">Search for available rides and travel with verified drivers.</p>
          {user && (
            <div className="mt-4 inline-block bg-blue-100 text-blue-800 p-2 sm:p-3 rounded-lg text-sm sm:text-base">
              Welcome, <strong>{user.firstName || user.name}</strong>!
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-6 sm:mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="relative lg:col-span-1">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="text" name="from" value={searchData.from} onChange={handleChange}
                  placeholder="From" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
              </div>
              <div className="relative lg:col-span-1">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="text" name="to" value={searchData.to} onChange={handleChange}
                  placeholder="To" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
              </div>
              <div className="relative lg:col-span-1">
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="date" name="date" value={searchData.date} onChange={handleChange} min={getMinDate()}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
              </div>
              <div className="relative lg:col-span-1">
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="time" name="time" value={searchData.time} onChange={handleChange}
                  placeholder="Time" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
              </div>
              <div className="flex items-center justify-center border rounded-lg px-3 py-2 lg:col-span-1">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <button type="button" onClick={() => setSearchData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 font-bold touch-manipulation">
                  -
                </button>
                <span className="text-lg font-bold mx-3 min-w-[2rem] text-center">{searchData.passengers}</span>
                <button type="button" onClick={() => setSearchData(prev => ({ ...prev, passengers: Math.min(8, prev.passengers + 1) }))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 font-bold touch-manipulation">
                  +
                </button>
              </div>
            </div>
            <button type="submit" disabled={isSearching}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base touch-manipulation">
              {isSearching ? 'Searching...' : <><Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />Search Rides</>}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {hasSearched ? (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 px-2">Available Rides ({rides.length})</h2>
            {rides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start lg:items-center">
                  <div className="lg:col-span-3 flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {(ride.driver?.name || 'Unknown').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{ride.driver?.name || 'Unknown Driver'}</h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                        {ride.driver?.rating || '0.0'} • {ride.carModel || 'Car'}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(ride.departureDate).toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {ride.departureTime}
                        </div>
                      </div>
                      <div className="font-medium text-sm sm:text-base">
                        <MapPin className="h-4 w-4 inline mr-1 text-gray-400" />
                        {ride.route?.from || ride.from || ride.fromLocation} → {ride.route?.to || ride.to || ride.toLocation}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        {ride.availableSeats || ride.totalSeats} seats available
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 lg:text-right space-y-2">
                    <div className="text-xl sm:text-2xl font-bold">₹{ride.pricePerSeat}</div>
                    <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                      <button 
                        onClick={() => handleBookRide(ride)}
                        disabled={isBooking && bookingRideId === ride.id}
                        className="flex-1 lg:w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base touch-manipulation"
                      >
                        {isBooking && bookingRideId === ride.id ? 'Booking...' : 'Book Ride'}
                      </button>
                      <button 
                        onClick={() => handleContactDriver(ride)}
                        className="flex-1 lg:w-full border border-gray-300 hover:bg-gray-100 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base touch-manipulation"
                      >
                        Contact Driver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 px-4">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Find Your Next Adventure</h3>
            <p className="text-sm sm:text-base text-gray-500">Enter your travel details above to discover available rides.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FindRide;
