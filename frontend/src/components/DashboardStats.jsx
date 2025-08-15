import React from 'react';
import { Car, Users, Star, Calendar } from 'lucide-react';

const DashboardStats = ({ user, ridesCount, bookingsCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Car className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Rides Offered</p>
            <p className="text-2xl font-bold text-gray-900">{ridesCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Bookings Made</p>
            <p className="text-2xl font-bold text-gray-900">{bookingsCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Rating</p>
            <p className="text-2xl font-bold text-gray-900">{user.rating || '0.0'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Rides</p>
            <p className="text-2xl font-bold text-gray-900">{user.totalRides || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
