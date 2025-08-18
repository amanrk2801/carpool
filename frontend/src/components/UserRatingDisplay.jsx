import React from 'react';
import { Star, User } from 'lucide-react';

const UserRatingDisplay = ({ user, showDetails = false, hideIfOfferingRide = false }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const formatRating = (rating) => {
    if (!rating || rating === 0) return '0.0';
    return Number(rating).toFixed(1);
  };

  if (hideIfOfferingRide) return null;
  return (
    <div className={`flex items-center ${showDetails ? 'flex-col sm:flex-row' : ''} gap-2`}>
      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {user?.rating && user.rating > 0 ? (
          <>
            {renderStars(user.rating)}
            <span className="text-sm font-medium text-gray-700 ml-1">
              {formatRating(user.rating)}
            </span>
          </>
        ) : (
          <>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-gray-300" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">No ratings yet</span>
          </>
        )}
      </div>

      {/* Total Rides */}
      {showDetails && (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{user?.totalRides || 0} rides</span>
        </div>
      )}
    </div>
  );
};

export default UserRatingDisplay;
