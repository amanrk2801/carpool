import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car 
} from 'lucide-react';
import UserRatingDisplay from './UserRatingDisplay';
import WhatsAppButton from './WhatsAppButton';

const RideDetailsModal = ({ 
  isOpen, 
  ride, 
  onClose, 
  onEdit, 
  formatDate, 
  formatTime, 
  getStatusColor 
}) => {
  if (!isOpen || !ride) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ride Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* Ride Information */}
          <div className="space-y-6">
            {/* Route Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Route
              </h3>
              <div className="text-lg">
                <span className="font-medium">{ride.route?.from || ride.from || ride.fromLocation}</span>
                <span className="mx-3 text-blue-600">→</span>
                <span className="font-medium">{ride.route?.to || ride.to || ride.toLocation}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                  Date
                </h3>
                <p className="text-lg">{formatDate(ride.departureDate)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  Time
                </h3>
                <p className="text-lg">{formatTime(ride.departureTime)}</p>
              </div>
            </div>

            {/* Car & Seats Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Car className="h-5 w-5 mr-2 text-gray-600" />
                  Vehicle
                </h3>
                <p className="text-lg">{ride.carModel || 'Not specified'}</p>
                {ride.carNumber && (
                  <p className="text-sm text-gray-600">{ride.carNumber}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-600" />
                  Seats
                </h3>
                <p className="text-lg">
                  {ride.availableSeats || ride.totalSeats} available
                  {ride.totalSeats && ` of ${ride.totalSeats}`}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-800">
                {ride.isBookingView ? 'Booking Details' : 'Price per Seat'}
              </h3>
              {ride.isBookingView ? (
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="text-gray-600">Seats Booked:</span> 
                    <span className="font-semibold ml-2">{ride.seatsBooked}</span>
                  </p>
                  <p className="text-lg">
                    <span className="text-gray-600">Price per Seat:</span> 
                    <span className="font-semibold ml-2">₹{ride.pricePerSeat}</span>
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    Total Amount: ₹{ride.totalAmount}
                  </p>
                  {ride.paymentStatus && (
                    <p className="text-sm">
                      <span className="text-gray-600">Payment Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        ride.paymentStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                        ride.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {ride.paymentStatus}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-3xl font-bold text-green-600">₹{ride.pricePerSeat}</p>
              )}
            </div>

            {/* Additional Information */}
            {ride.additionalInfo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Additional Information</h3>
                <p className="text-gray-700">{ride.additionalInfo}</p>
              </div>
            )}

            {/* Status & Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Ride Status & Features</h3>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ride.status)}`}>
                  {ride.status || 'Active'}
                </span>
                {ride.instantBooking && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Instant Booking
                  </span>
                )}
              </div>
            </div>

            {/* Driver Information removed as requested */}

            {/* Passengers (if any) */}
            {ride.passengers && ride.passengers.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-600" />
                  Booked Passengers ({ride.passengers.length})
                </h3>
                <div className="space-y-2">
                  {ride.passengers.map((passenger, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                      <div className="flex-1">
                        <span className="font-medium">{passenger.name || 'Passenger'}</span>
                        <span className="text-sm text-gray-600 ml-2">({passenger.seatsBooked || 1} seat{(passenger.seatsBooked || 1) > 1 ? 's' : ''})</span>
                      </div>
                      {passenger.phone && (
                        <WhatsAppButton
                          phoneNumber={passenger.phone}
                          userName={passenger.name}
                          userType="passenger"
                          variant="icon"
                          className="ml-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            {!ride.isBookingView && onEdit && (
              <button 
                onClick={() => onEdit(ride)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Ride
              </button>
            )}
            {ride.isBookingView && ride.driver && ride.driver.phone && (
              <WhatsAppButton
                phoneNumber={ride.driver.phone}
                userName={ride.driver.name}
                userType="driver"
                variant="button"
                className="px-6 py-2"
              >
                Message Driver
              </WhatsAppButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsModal;
