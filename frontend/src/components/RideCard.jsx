import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Share,
  Check,
  X
} from 'lucide-react';

const RideCard = ({ ride, onShowDetails, onEditRide, onDeleteRide, onStatusChange, formatDate, formatTime, getStatusColor }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Helper function to check if ride has passed
  const isRidePast = () => {
    if (!ride.departureDate || !ride.departureTime) return false;
    
    try {
      // Handle different date formats more robustly
      let dateStr = ride.departureDate;
      let timeStr = ride.departureTime;
      
      // Ensure proper ISO format for date parsing
      if (!dateStr.includes('T')) {
        dateStr = `${dateStr}T${timeStr}`;
      }
      
      const rideDateTime = new Date(dateStr);
      const now = new Date();
      
      return rideDateTime < now;
    } catch (error) {
      console.error('Error parsing ride date/time:', error);
      return false; // Default to not past if parsing fails
    }
  };

  // Helper function to get available status actions
  const getAvailableStatusActions = () => {
    const currentStatus = ride.status || 'ACTIVE';
    const isPast = isRidePast();
    
    const actions = [];
    
    if (currentStatus === 'ACTIVE') {
      // Allow drivers to mark rides as completed manually (not just past rides)
      // This gives drivers flexibility to complete rides when appropriate
      actions.push({ key: 'mark-completed', label: 'Mark as Completed', color: 'green', icon: 'Check' });
      actions.push({ key: 'cancel', label: 'Cancel Ride', color: 'orange', icon: 'X' });
    } else if (currentStatus === 'CANCELLED' && !isPast) {
      actions.push({ key: 'mark-active', label: 'Reactivate Ride', color: 'blue', icon: 'Calendar' });
    }
    
    return actions;
  };

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
        onShowDetails(ride);
        break;
      case 'edit':
        if (onEditRide) onEditRide(ride);
        break;
      case 'delete':
        if (onDeleteRide) onDeleteRide(ride);
        break;
      case 'mark-completed':
        if (onStatusChange) onStatusChange(ride, 'COMPLETED');
        break;
      case 'mark-active':
        if (onStatusChange) onStatusChange(ride, 'ACTIVE');
        break;
      case 'cancel':
        if (onStatusChange) onStatusChange(ride, 'CANCELLED');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${ride.route?.from || ride.from} → ${ride.route?.to || ride.to} on ${formatDate(ride.departureDate)}`);
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Carpool Ride',
            text: `${ride.route?.from || ride.from} → ${ride.route?.to || ride.to} on ${formatDate(ride.departureDate)} at ${formatTime(ride.departureTime)}`,
          });
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Route Information */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
            <div className="flex items-center flex-1 min-w-0">
              <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base truncate">
                {ride.route?.from || ride.from || ride.fromLocation} → {ride.route?.to || ride.to || ride.toLocation}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full self-start ${getStatusColor(ride.status)}`}>
              {ride.status || 'Active'}
            </span>
          </div>
          
          {/* Ride Details */}
          <div className="grid grid-cols-2 sm:flex sm:items-center text-xs sm:text-sm text-gray-600 gap-2 sm:space-x-4 sm:gap-0">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{formatDate(ride.departureDate)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{formatTime(ride.departureTime)}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{ride.availableSeats || ride.totalSeats} seats</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-green-600">₹{ride.pricePerSeat}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 justify-end sm:justify-start">
          <button 
            onClick={() => onShowDetails(ride)}
            className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-medium flex-1 sm:flex-none whitespace-nowrap"
          >
            Show Details
          </button>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={handleDropdownToggle}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => handleMenuAction('view')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4 mr-3" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleMenuAction('edit')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    disabled={!onEditRide}
                  >
                    <Edit className="h-4 w-4 mr-3" />
                    Edit Ride
                  </button>
                  <button
                    onClick={() => handleMenuAction('copy')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Copy className="h-4 w-4 mr-3" />
                    Copy Details
                  </button>
                  <button
                    onClick={() => handleMenuAction('share')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Share className="h-4 w-4 mr-3" />
                    Share Ride
                  </button>
                  <hr className="my-1" />
                  
                  {/* Dynamic Status Change Options */}
                  {getAvailableStatusActions().map((action) => {
                    const IconComponent = action.icon === 'Check' ? Check : 
                                        action.icon === 'X' ? X : 
                                        action.icon === 'Calendar' ? Calendar : null;
                    
                    const getColorClasses = (color) => {
                      switch (color) {
                        case 'green':
                          return 'text-green-600 hover:bg-green-50';
                        case 'orange':
                          return 'text-orange-600 hover:bg-orange-50';
                        case 'blue':
                          return 'text-blue-600 hover:bg-blue-50';
                        default:
                          return 'text-gray-600 hover:bg-gray-50';
                      }
                    };
                    
                    return (
                      <button
                        key={action.key}
                        onClick={() => handleMenuAction(action.key)}
                        className={`flex items-center w-full px-4 py-2 text-sm ${getColorClasses(action.color)}`}
                        disabled={!onStatusChange}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4 mr-3" />}
                        {action.label}
                      </button>
                    );
                  })}
                  
                  {getAvailableStatusActions().length > 0 && <hr className="my-1" />}
                  <button
                    onClick={() => handleMenuAction('delete')}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    disabled={!onDeleteRide}
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete Ride
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
