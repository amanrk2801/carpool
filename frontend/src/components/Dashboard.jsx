import React, { useState, useEffect } from 'react';
import { 
  Plus,
  AlertCircle,
  RefreshCw,
  Users,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import RideCard from './RideCard';
import BookingCard from './BookingCard';
import RideDetailsModal from './RideDetailsModal';
import EditRideModal from './EditRideModal';
import RatingModal from './RatingModal';
import DashboardStats from './DashboardStats';
import EmptyState from './EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('rides');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rides, setRides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rideBookings, setRideBookings] = useState([]); // Bookings on user's rides
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [showEditRide, setShowEditRide] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const [editRideData, setEditRideData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user's rides and bookings from API
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      setError('');
      
      try {
        // Fetch rides offered by user
        const ridesResponse = await apiService.getMyRides();
        if (ridesResponse.success) {
          setRides(ridesResponse.data || []);
        }

        // Fetch bookings from API (bookings where user is passenger)
        const bookingsResponse = await apiService.getMyBookings();
        if (bookingsResponse.success) {
          console.log('My bookings received:', bookingsResponse.data);
          setBookings(bookingsResponse.data || []);
        } else {
          console.error('Failed to fetch bookings:', bookingsResponse.message);
          setBookings([]); // Set empty array if fetch fails
        }

        // Fetch ride bookings (bookings on user's rides where user is driver)
        const rideBookingsResponse = await apiService.getMyRideBookings();
        if (rideBookingsResponse.success) {
          console.log('Ride bookings received:', rideBookingsResponse.data);
          console.log('First ride booking structure:', rideBookingsResponse.data?.[0]);
          setRideBookings(rideBookingsResponse.data || []);
        } else {
          console.error('Failed to fetch ride bookings:', rideBookingsResponse.message);
          setRideBookings([]); // Set empty array if fetch fails
        }
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err.message && err.message.includes('authentication')) {
          // Authentication failed, redirect to signin
          logout();
          navigate('/signin');
          return;
        }
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, logout, navigate]);

  const handleShowRideDetails = (ride) => {
    setSelectedRide(ride);
    setShowRideDetails(true);
  };

  const handleCloseRideDetails = () => {
    setSelectedRide(null);
    setShowRideDetails(false);
  };

  const handleDeleteRide = async (ride) => {
    if (!window.confirm(`Are you sure you want to delete the ride from ${ride.route?.from || ride.from} to ${ride.route?.to || ride.to}?`)) {
      return;
    }

    try {
      const response = await apiService.deleteRide(ride.id);
      
      if (response.success) {
        // Remove the ride from the local state
        setRides(prevRides => prevRides.filter(r => r.id !== ride.id));
      } else {
        setError(response.message || 'Failed to delete ride');
      }
    } catch (err) {
      console.error('Error deleting ride:', err);
      setError('Failed to delete ride. Please try again.');
    }
  };

  const handleStatusChange = async (ride, newStatus) => {
    const statusMessages = {
      'COMPLETED': 'mark this ride as completed',
      'CANCELLED': 'cancel this ride',
      'ACTIVE': 'reactivate this ride'
    };
    
    const confirmMessage = statusMessages[newStatus] || `change the ride status to ${newStatus}`;
    
    if (!window.confirm(`Are you sure you want to ${confirmMessage}?`)) {
      return;
    }

    try {
      const response = await apiService.updateRideStatus(ride.id, newStatus);
      
      if (response.success) {
        // Update the ride in the local state
        setRides(prevRides => 
          prevRides.map(r => 
            r.id === ride.id ? { ...r, status: newStatus } : r
          )
        );
        
        // If ride is marked as completed, update all related bookings to completed as well
        if (newStatus === 'COMPLETED') {
          // Update ride bookings (bookings on this driver's ride)
          setRideBookings(prevBookings => 
            prevBookings.map(booking => 
              booking.rideId === ride.id || booking.ride?.id === ride.id 
                ? { ...booking, status: 'COMPLETED' } 
                : booking
            )
          );
          
          // Update user's own bookings if they have booked this ride as a passenger
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking.rideId === ride.id || booking.ride?.id === ride.id 
                ? { ...booking, status: 'COMPLETED' } 
                : booking
            )
          );
        }
        
        // If ride is cancelled, update all related bookings to cancelled as well
        if (newStatus === 'CANCELLED') {
          // Update ride bookings (bookings on this driver's ride)
          setRideBookings(prevBookings => 
            prevBookings.map(booking => 
              booking.rideId === ride.id || booking.ride?.id === ride.id 
                ? { ...booking, status: 'CANCELLED' } 
                : booking
            )
          );
          
          // Update user's own bookings if they have booked this ride as a passenger
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking.rideId === ride.id || booking.ride?.id === ride.id 
                ? { ...booking, status: 'CANCELLED' } 
                : booking
            )
          );
        }
        
        // Show success message
        const successMessages = {
          'COMPLETED': 'Ride marked as completed successfully',
          'CANCELLED': 'Ride cancelled successfully',
          'ACTIVE': 'Ride reactivated successfully'
        };
        
        // You can add a toast notification here if you have one
        console.log(successMessages[newStatus] || 'Ride status updated successfully');
        
      } else {
        setError(response.message || 'Failed to update ride status');
      }
    } catch (error) {
      console.error('Status change error:', error);
      
      // Provide more specific error messages based on common scenarios
      let errorMessage = 'Failed to update ride status. Please try again.';
      if (error.message.includes('Cannot mark future rides as completed')) {
        errorMessage = 'Cannot mark future rides as completed. Please wait until after the departure time.';
      } else if (error.message.includes('Cannot change status of a completed ride')) {
        errorMessage = 'Cannot change the status of completed rides.';
      } else if (error.message.includes('Cannot reactivate rides that have already started')) {
        errorMessage = 'Cannot reactivate rides that have already started.';
      } else if (error.message.includes('Unauthorized')) {
        errorMessage = 'You are not authorized to change this ride status.';
      }
      
      setError(errorMessage);
    }
  };

  // Booking handlers
  const handleViewBooking = (booking) => {
    // Create a ride object from the booking data for the modal
    const rideFromBooking = {
      id: booking.rideId || booking.ride?.id,
      fromLocation: booking.ride?.from,
      toLocation: booking.ride?.to,
      from: booking.ride?.from,
      to: booking.ride?.to,
      departureDate: booking.ride?.departureDate,
      departureTime: booking.ride?.departureTime,
      carModel: booking.ride?.carModel,
      carNumber: booking.ride?.carNumber,
      pricePerSeat: booking.ride?.pricePerSeat,
      totalSeats: booking.ride?.totalSeats,
      availableSeats: booking.ride?.availableSeats,
      additionalInfo: booking.ride?.additionalInfo,
      status: booking.status, // Use booking status instead of ride status
      driver: booking.driver,
      // Add booking-specific information
      bookingId: booking.id,
      seatsBooked: booking.seatsBooked,
      totalAmount: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      isBookingView: true // Flag to indicate this is a booking view
    };
    
    setSelectedRide(rideFromBooking);
    setShowRideDetails(true);
  };

  const handleCancelBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to cancel your booking for the ride from ${booking.ride?.from || booking.from} to ${booking.ride?.to || booking.to}?`)) {
      return;
    }

    try {
      // Debug logging
      console.log('Current user:', user);
      console.log('Booking to cancel:', booking);
      console.log('Booking ID:', booking.id);
      console.log('Booking passenger ID:', booking.passengerId || booking.passenger?.id);
      console.log('Current user ID:', user?.id);
      
      const response = await apiService.cancelBooking(booking.id);
      
      if (response.success) {
        // Remove the booking from the local state or update its status
        setBookings(prevBookings => prevBookings.filter(b => b.id !== booking.id));
      } else {
        console.log('Cancel booking failed:', response);
        setError(response.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  const handleContactDriver = (booking) => {
    // This would typically open a chat/messaging interface
    alert(`Contact driver: ${booking.driver?.name || booking.driverName} at ${booking.driver?.phone || 'Phone not available'}`);
  };

  const handleContactPassenger = (booking) => {
    // This would typically open a chat/messaging interface
    alert(`Contact passenger: ${booking.passenger?.name || booking.passengerName} at ${booking.passenger?.phone || booking.passengerPhone || 'Phone not available'}`);
  };

  const handleRateDriver = (booking) => {
    // Open rating modal for driver
    setRatingData({
      rideId: booking.rideId || booking.ride?.id,
      rateeId: booking.driver?.id || booking.driverId,
      rateeName: booking.driver?.name || booking.driverName || 'Driver'
    });
    setShowRatingModal(true);
  };

  const handleRatePassenger = (booking) => {
    // Open rating modal for passenger
    setRatingData({
      rideId: booking.rideId || booking.ride?.id,
      rateeId: booking.passenger?.id || booking.passengerId,
      rateeName: booking.passenger?.name || booking.passengerName || 'Passenger'
    });
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setRatingData(null);
  };

  const handleRatingSubmitted = (newRating) => {
    console.log('Rating submitted:', newRating);
    // You could refresh the bookings or show a success message here
  };

  const handleConfirmBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to confirm ${booking.passenger?.name || 'this passenger'}'s booking?`)) {
      return;
    }

    try {
      const response = await apiService.confirmBooking(booking.id);
      
      if (response.success) {
        // Update the booking status in local state
        setRideBookings(prevBookings => 
          prevBookings.map(b => 
            b.id === booking.id ? { ...b, status: 'CONFIRMED' } : b
          )
        );
      } else {
        setError(response.message || 'Failed to confirm booking');
      }
    } catch (err) {
      console.error('Error confirming booking:', err);
      setError('Failed to confirm booking. Please try again.');
    }
  };

  const handleRejectBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to reject ${booking.passenger?.name || 'this passenger'}'s booking?`)) {
      return;
    }

    try {
      const response = await apiService.cancelBooking(booking.id);
      
      if (response.success) {
        // Remove the booking from local state or update status to cancelled
        setRideBookings(prevBookings => 
          prevBookings.map(b => 
            b.id === booking.id ? { ...b, status: 'CANCELLED' } : b
          )
        );
      } else {
        setError(response.message || 'Failed to reject booking');
      }
    } catch (err) {
      console.error('Error rejecting booking:', err);
      setError('Failed to reject booking. Please try again.');
    }
  };

  const handleEditRide = (ride) => {
    // Prevent editing if this is a booking view
    if (ride.isBookingView) {
      console.warn('Cannot edit rides from booking view');
      return;
    }

    setEditRideData({
      id: ride.id,
      from: ride.route?.from || ride.from || ride.fromLocation || '',
      to: ride.route?.to || ride.to || ride.toLocation || '',
      departureDate: ride.departureDate || '',
      departureTime: ride.departureTime || '',
      carModel: ride.carModel || '',
      carNumber: ride.carNumber || '',
      totalSeats: ride.totalSeats || ride.availableSeats || 1,
      pricePerSeat: ride.pricePerSeat || '',
      additionalInfo: ride.additionalInfo || '',
      instantBooking: ride.instantBooking || false
    });
    setShowRideDetails(false);
    setShowEditRide(true);
  };

  const handleCloseEditRide = () => {
    setEditRideData({});
    setShowEditRide(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditRideData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdateRide = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const updateData = {
        from: editRideData.from,
        to: editRideData.to,
        departureDate: editRideData.departureDate,
        departureTime: editRideData.departureTime,
        carModel: editRideData.carModel,
        carNumber: editRideData.carNumber,
        passengers: parseInt(editRideData.totalSeats),
        pricePerSeat: parseFloat(editRideData.pricePerSeat),
        additionalInfo: editRideData.additionalInfo,
        instantBooking: editRideData.instantBooking
      };

      const response = await apiService.updateRide(editRideData.id, updateData);
      
      if (response.success) {
        // Refresh rides data
        await refreshData();
        setShowEditRide(false);
        setEditRideData({});
      } else {
        setError(response.message || 'Failed to update ride');
      }
    } catch (err) {
      console.error('Error updating ride:', err);
      setError('Failed to update ride. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': 
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    try {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const ridesResponse = await apiService.getMyRides();
      if (ridesResponse.success) {
        setRides(ridesResponse.data || []);
      }
      setError('');
    } catch {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to access dashboard</h2>
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName || user.name}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your rides and bookings</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => navigate('/find-ride')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Find a Ride
              </button>
              <button
                onClick={() => navigate('/offer-ride')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Offer Ride
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <DashboardStats 
          user={user} 
          ridesCount={rides.length} 
          bookingsCount={bookings.length + rideBookings.length} 
        />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('rides')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'rides'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Rides ({rides.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('ride-requests')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'ride-requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Ride Requests ({rideBookings.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <>
                {/* My Rides Tab */}
                {activeTab === 'rides' && (
                  <div>
                    {rides.length > 0 ? (
                      rides.map(ride => {
                        // Find passengers for this ride
                        const ridePassengers = rideBookings.filter(booking => 
                          (booking.rideId === ride.id || booking.ride?.id === ride.id) && 
                          ['CONFIRMED', 'COMPLETED'].includes(booking.status)
                        );

                        return (
                          <div key={ride.id} className="mb-6">
                            <RideCard
                              ride={ride}
                              onShowDetails={handleShowRideDetails}
                              onEditRide={handleEditRide}
                              onDeleteRide={handleDeleteRide}
                              onStatusChange={handleStatusChange}
                              formatDate={formatDate}
                              formatTime={formatTime}
                              getStatusColor={getStatusColor}
                            />
                            
                            {/* Show passengers for rides with bookings */}
                            {ridePassengers.length > 0 && (
                              <div className="mt-3 ml-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">
                                  {ride.status === 'COMPLETED' ? 'Passengers on this ride:' : 'Confirmed passengers:'}
                                </h4>
                                <div className="space-y-2">
                                  {ridePassengers.map(booking => (
                                    <div key={booking.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                      <div className="flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                          booking.status === 'COMPLETED' ? 'bg-green-100' : 'bg-blue-100'
                                        }`}>
                                          <Users className={`h-4 w-4 ${
                                            booking.status === 'COMPLETED' ? 'text-green-600' : 'text-blue-600'
                                          }`} />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">
                                            {booking.passenger?.name || booking.passengerName || 'Passenger'}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {booking.seatsBooked} seat{booking.seatsBooked > 1 ? 's' : ''} • ₹{booking.totalAmount}
                                            {booking.passenger?.phone && (
                                              <span> • {booking.passenger.phone}</span>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {ride.status === 'COMPLETED' && booking.status === 'COMPLETED' ? (
                                          <button
                                            onClick={() => handleRatePassenger(booking)}
                                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors flex items-center space-x-1"
                                          >
                                            <Star className="h-3 w-3" />
                                            <span>Rate Passenger</span>
                                          </button>
                                        ) : (
                                          <span className={`px-2 py-1 text-xs rounded-full ${
                                            booking.status === 'CONFIRMED' 
                                              ? 'bg-green-100 text-green-800' 
                                              : 'bg-blue-100 text-blue-800'
                                          }`}>
                                            {booking.status}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Show message when no passengers booked */}
                            {ride.status === 'ACTIVE' && ridePassengers.length === 0 && (
                              <div className="mt-3 ml-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-600 text-center">
                                  No passengers have booked this ride yet
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <EmptyState 
                        type="rides" 
                        onAction={() => navigate('/offer-ride')} 
                      />
                    )}
                  </div>
                )}

                {/* My Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div>
                    {bookings.length > 0 ? (
                      bookings.map(booking => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onViewBooking={handleViewBooking}
                          onCancelBooking={handleCancelBooking}
                          onContactDriver={handleContactDriver}
                          onRateDriver={handleRateDriver}
                          getStatusColor={getStatusColor}
                          formatDate={formatDate}
                          formatTime={formatTime}
                        />
                      ))
                    ) : (
                      <EmptyState 
                        type="bookings" 
                        onAction={() => navigate('/find-ride')} 
                      />
                    )}
                  </div>
                )}

                {/* Ride Requests Tab */}
                {activeTab === 'ride-requests' && (
                  <div>
                    {rideBookings.length > 0 ? (
                      rideBookings.map(booking => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onViewBooking={handleViewBooking}
                          onConfirmBooking={handleConfirmBooking}
                          onRejectBooking={handleRejectBooking}
                          onContactPassenger={handleContactPassenger}
                          onRatePassenger={handleRatePassenger}
                          getStatusColor={getStatusColor}
                          formatDate={formatDate}
                          formatTime={formatTime}
                          isDriverView={true} // Flag to show driver-specific actions
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No ride requests yet</h3>
                        <p className="text-gray-500">Passengers will appear here when they book your rides</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <RideDetailsModal
        isOpen={showRideDetails}
        ride={selectedRide}
        onClose={handleCloseRideDetails}
        onEdit={handleEditRide}
        formatDate={formatDate}
        formatTime={formatTime}
        getStatusColor={getStatusColor}
      />
      
      <EditRideModal
        isOpen={showEditRide}
        rideData={editRideData}
        isUpdating={isUpdating}
        onClose={handleCloseEditRide}
        onSubmit={handleUpdateRide}
        onChange={handleEditInputChange}
      />

      <RatingModal
        isOpen={showRatingModal}
        onClose={handleCloseRatingModal}
        rideId={ratingData?.rideId}
        rateeId={ratingData?.rateeId}
        rateeName={ratingData?.rateeName}
        onRatingSubmitted={handleRatingSubmitted}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;