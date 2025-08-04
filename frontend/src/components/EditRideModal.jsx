import React from 'react';

const EditRideModal = ({ 
  isOpen, 
  rideData, 
  isUpdating, 
  onClose, 
  onSubmit, 
  onChange 
}) => {
  if (!isOpen || !rideData.id) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Ride</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* Edit Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from"
                  value={rideData.from}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Starting location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to"
                  value={rideData.to}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Destination"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="departureDate"
                  value={rideData.departureDate}
                  onChange={onChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={rideData.departureTime}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Car Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={rideData.carModel}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Honda City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Number
                </label>
                <input
                  type="text"
                  name="carNumber"
                  value={rideData.carNumber}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., MH01AB1234"
                />
              </div>
            </div>

            {/* Seats & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats <span className="text-red-500">*</span>
                </label>
                <select
                  name="totalSeats"
                  value={rideData.totalSeats}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option 
                      key={num} 
                      value={num}
                      disabled={rideData.bookedSeats && num < rideData.bookedSeats}
                    >
                      {num} {rideData.bookedSeats && num < rideData.bookedSeats ? '(Not allowed - Already booked)' : ''}
                    </option>
                  ))}
                </select>
                {rideData.bookedSeats > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Cannot reduce below {rideData.bookedSeats} seat{rideData.bookedSeats !== 1 ? 's' : ''} (already booked)
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Seat <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerSeat"
                  value={rideData.pricePerSeat}
                  onChange={onChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Amount in ₹"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={rideData.additionalInfo}
                onChange={onChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional details about the ride..."
              />
            </div>

            {/* Instant Booking */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="instantBooking"
                id="instantBooking"
                checked={rideData.instantBooking}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="instantBooking" className="ml-2 block text-sm text-gray-700">
                Allow instant booking (passengers can book without approval)
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Ride'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRideModal;
