import React from 'react';
import { Car, Users } from 'lucide-react';

const EmptyState = ({ type, onAction }) => {
  if (type === 'rides') {
    return (
      <div className="text-center py-12">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No rides offered yet</h3>
        <p className="text-gray-600 mb-4">Start offering rides to earn money and help fellow travelers!</p>
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Offer Your First Ride
        </button>
      </div>
    );
  }

  if (type === 'bookings') {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-600 mb-4">Find and book rides to start your carpool journey!</p>
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Find a Ride
        </button>
      </div>
    );
  }

  return null;
};

export default EmptyState;
