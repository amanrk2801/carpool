import React, { useState } from 'react';
import { 
  User, 
  Car, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  MoreVertical,
  Plus,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rides');

  // Mock data - in a real app, this would come from your API
  const mockRides = [
    {
      id: 1,
      from: 'Koramangala',
      to: 'Electronic City',
      date: '2025-08-15',
      time: '08:30 AM',
      seats: 3,
      price: 150,
      passengers: [
        { name: 'Priya Sharma', rating: 4.8 },
        { name: 'Amit Singh', rating: 4.9 }
      ],
      status: 'upcoming'
    },
    {
      id: 2,
      from: 'Whitefield',
      to: 'MG Road',
      date: '2025-08-10',
      time: '06:30 PM',
      seats: 2,
      price: 80,
      passengers: [
        { name: 'Sneha Patel', rating: 4.7 }
      ],
      status: 'completed'
    }
  ];

  const mockBookings = [
    {
      id: 1,
      from: 'HSR Layout',
      to: 'Indiranagar',
      date: '2025-08-12',
      time: '09:15 AM',
      driver: 'Vikash Gupta',
      driverRating: 4.9,
      price: 60,
      status: 'confirmed'
    },
    {
      id: 2,
      from: 'Marathahalli',
      to: 'Mysore',
      date: '2025-08-20',
      time: '02:00 PM',
      driver: 'Ananya Reddy',
      driverRating: 4.8,
      price: 350,
      status: 'pending'
    },
    {
      id: 3,
      from: 'BTM Layout',
      to: 'Airport',
      date: '2025-07-28',
      time: '07:45 AM',
      driver: 'Rahul Joshi',
      driverRating: 4.6,
      price: 200,
      status: 'completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const RideCard = ({ ride }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-semibold">{ride.from}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-semibold">{ride.to}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {ride.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {ride.time}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">{ride.passengers.length}/{ride.seats} seats</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-1 font-bold">₹</span>
            <span className="font-semibold text-green-600">{ride.price}</span>
          </div>
        </div>
        <span className={px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}}>
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </span>
      </div>

      {ride.passengers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Passengers:</h4>
          <div className="space-y-1">
            {ride.passengers.map((passenger, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{passenger.name}</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{passenger.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-semibold">{booking.from}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-semibold">{booking.to}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {booking.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {booking.time}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">Driver: {booking.driver}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm">{booking.driverRating}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 mr-1 font-bold">₹</span>
          <span className="font-semibold text-green-600">{booking.price}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
        {booking.status === 'pending' && (
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Cancel Booking
          </button>
        )}
        {booking.status === 'completed' && (
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Rate Driver
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your rides and bookings</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              My Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900">{mockRides.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <span className="text-yellow-600 text-2xl font-bold mr-3">₹</span>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-2xl font-bold text-gray-900">690</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/offer-ride')}
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Offer a Ride
            </button>
            <button
              onClick={() => navigate('/find-ride')}
              className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Find a Ride
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('rides')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'rides'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Car className="h-4 w-4 inline mr-2" />
                My Rides ({mockRides.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                My Bookings ({mockBookings.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filter by:</span>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>All Status</option>
                <option>Upcoming</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>All Dates</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>

            {/* Content */}
            {activeTab === 'rides' && (
              <div className="space-y-6">
                {mockRides.length > 0 ? (
                  mockRides.map(ride => (
                    <RideCard key={ride.id} ride={ride} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No rides yet</h3>
                    <p className="text-gray-600 mb-4">Start offering rides to help others and earn money!</p>
                    <button
                      onClick={() => navigate('/offer-ride')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Offer Your First Ride
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                {mockBookings.length > 0 ? (
                  mockBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Book your first ride to get started!</p>
                    <button
                      onClick={() => navigate('/find-ride')}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Find a Ride
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;