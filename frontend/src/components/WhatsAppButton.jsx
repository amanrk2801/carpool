import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

const WhatsAppButton = ({ 
  phoneNumber, 
  userName, 
  userType = 'user', // 'driver' or 'passenger' or 'user'
  className = '', 
  variant = 'button', // 'button', 'text', 'icon'
  message = '',
  children 
}) => {
  if (!phoneNumber) return null;

  const getDefaultMessage = () => {
    if (message) return message;
    
    const greetings = {
      driver: `Hi ${userName || 'there'}, I found you through CarpoolConnect app. I would like to discuss about the ride.`,
      passenger: `Hi ${userName || 'there'}, I found you through CarpoolConnect app. I would like to discuss about the ride booking.`,
      user: `Hi ${userName || 'there'}, I found you through CarpoolConnect app.`
    };
    
    return greetings[userType] || greetings.user;
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsApp(phoneNumber, getDefaultMessage());
  };

  const formatPhoneDisplay = (phone) => {
    // Format phone number for display
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 10) {
      return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
    }
    if (clean.length === 12 && clean.startsWith('91')) {
      return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
    }
    return phone;
  };

  if (variant === 'text') {
    return (
      <span 
        onClick={handleClick}
        className={`cursor-pointer text-green-600 hover:text-green-800 hover:underline transition-colors ${className}`}
        title="Click to message on WhatsApp"
      >
        {children || formatPhoneDisplay(phoneNumber)}
      </span>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors ${className}`}
        title="Message on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </button>
    );
  }

  // Default button variant
  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ${className}`}
      title="Message on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      <span>{children || 'Message on WhatsApp'}</span>
    </button>
  );
};

export default WhatsAppButton;
