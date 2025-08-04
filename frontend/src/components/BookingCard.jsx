import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  MoreVertical,
  Eye,
  X,
  MessageCircle,
  Star,
  Receipt,
  Check
} from 'lucide-react';

const BookingCard = ({ 
  booking, 
  onViewBooking, 
  onCancelBooking, 
  onContactDriver, 
  onRateDriver, 
  onConfirmBooking,
  onRejectBooking,
  onContactPassenger,
  onRatePassenger,
  isDriverView = false,
  getStatusColor, 
  formatDate, 
  formatTime 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuAction = (action) => {
    setShowDropdown(false);
    switch (action) {
      case 'view':
        if (onViewBooking) onViewBooking(booking);
        break;
      case 'cancel':
        if (onCancelBooking) onCancelBooking(booking);
        break;
      case 'contact':
        if (isDriverView && onContactPassenger) {
          onContactPassenger(booking);
        } else if (onContactDriver) {
          onContactDriver(booking);
        }
        break;
      case 'rate':
        if (isDriverView && onRatePassenger) {
          onRatePassenger(booking);
        } else if (onRateDriver) {
          onRateDriver(booking);
        }
        break;
      case 'confirm':
        if (onConfirmBooking) onConfirmBooking(booking);
        break;
      case 'reject':
        if (onRejectBooking) onRejectBooking(booking);
        break;
      default:
        break;
    }
  };

  // Debug logging for driver view
  if (isDriverView) {
    console.log('BookingCard in driver view:', {
      bookingId: booking.id,
      status: booking.status,
      statusType: typeof booking.status,
      statusLower: booking.status?.toLowerCase(),
      isCompleted: booking.status?.toLowerCase() === 'completed',
      passengerName: booking.passenger?.name || booking.passengerName,
      passengerPhone: booking.passenger?.phone || booking.passengerPhone,
      onRatePassenger: !!onRatePassenger
    });
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex-1 min-w-0">
          {/* Route Information */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
            <div className="flex items-center flex-1 min-w-0">
              <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base truncate">
                {booking.ride?.from || booking.from || booking.fromLocation} → {booking.ride?.to || booking.to || booking.toLocation}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full self-start sm:self-center ${getStatusColor(booking.status)}`}>
              {booking.status || 'Pending'}
            </span>
          </div>
          
          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{formatDate ? formatDate(booking.ride?.departureDate || booking.date) : booking.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{formatTime ? formatTime(booking.ride?.departureTime || booking.time) : booking.time}</span>
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {isDriverView 
                  ? (booking.passenger?.name || booking.passengerName || 'Unknown Passenger')
                  : (booking.driver?.name || booking.driverName || 'Unknown Driver')
                }
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="font-medium text-green-600">₹{booking.totalAmount || booking.price || (booking.seatsBooked * booking.ride?.pricePerSeat)}</span>
            </div>
          </div>

          {/* Additional Booking Info */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
            {booking.seatsBooked && (
              <span className="text-gray-500">
                {booking.seatsBooked} seat{booking.seatsBooked > 1 ? 's' : ''} booked
              </span>
            )}
            
            {/* Passenger Contact Info for Driver View */}
            {isDriverView && (booking.passenger?.phone || booking.passengerPhone) && (
              <span className="text-blue-600 font-medium">
                📞 {booking.passenger?.phone || booking.passengerPhone}
              </span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 justify-stretch sm:justify-start mt-4 sm:mt-0">
          {/* Driver View - Show Confirm/Reject for Pending Bookings */}
          {isDriverView && (booking.status?.toLowerCase() === 'pending' || !booking.status) ? (
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => onConfirmBooking && onConfirmBooking(booking)}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-xs sm:text-sm font-medium flex-1 sm:flex-none whitespace-nowrap flex items-center justify-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </button>
              <button 
                onClick={() => onRejectBooking && onRejectBooking(booking)}
                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium flex-1 sm:flex-none whitespace-nowrap flex items-center justify-center"
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </button>
            </div>
          ) : (
            /* Regular View Details Button */
            <button 
              onClick={() => onViewBooking && onViewBooking(booking)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-medium w-full sm:w-auto"
            >
              View Details
            </button>
          )}
          
          {/* Dropdown Menu */}
          <div className="relative ml-auto sm:ml-2" ref={dropdownRef}>
            <button 
              onClick={handleDropdownToggle}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">{/* Menu items continue here */}
                  <button
                    onClick={() => handleMenuAction('view')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4 mr-3" />
                    View Details
                  </button>
                  
                  {/* Driver View Options */}
                  {isDriverView ? (
                    <>
                      <button
                        onClick={() => handleMenuAction('contact')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        disabled={!onContactPassenger}
                      >
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Contact Passenger
                      </button>
                      {booking.status?.toLowerCase() === 'completed' && (
                        <button
                          onClick={() => handleMenuAction('rate')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          disabled={!onRatePassenger}
                        >
                          <Star className="h-4 w-4 mr-3" />
                          Rate Passenger
                        </button>
                      )}
                      {(booking.status?.toLowerCase() === 'pending' || !booking.status) && (
                        <>
                          <hr className="my-1" />
                          <button
                            onClick={() => handleMenuAction('confirm')}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                            disabled={!onConfirmBooking}
                          >
                            <Check className="h-4 w-4 mr-3" />
                            Accept Booking
                          </button>
                          <button
                            onClick={() => handleMenuAction('reject')}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            disabled={!onRejectBooking}
                          >
                            <X className="h-4 w-4 mr-3" />
                            Reject Booking
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    /* Passenger View Options */
                    <>
                      <button
                        onClick={() => handleMenuAction('contact')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        disabled={!onContactDriver}
                      >
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Contact Driver
                      </button>
                      {booking.status?.toLowerCase() === 'completed' && (
                        <button
                          onClick={() => handleMenuAction('rate')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          disabled={!onRateDriver}
                        >
                          <Star className="h-4 w-4 mr-3" />
                          Rate Driver
                        </button>
                      )}
                      <button
                        onClick={() => handleMenuAction('receipt')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Receipt className="h-4 w-4 mr-3" />
                        Download Receipt
                      </button>
                      <hr className="my-1" />
                      {(booking.status?.toLowerCase() === 'pending' || booking.status?.toLowerCase() === 'confirmed') ? (
                        <button
                          onClick={() => handleMenuAction('cancel')}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          disabled={!onCancelBooking}
                        >
                          <X className="h-4 w-4 mr-3" />
                          Cancel Booking
                        </button>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
