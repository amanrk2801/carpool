// WhatsApp utility functions for frontend
export const formatPhoneForWhatsApp = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  // If it's a 10-digit number, add India country code
  if (cleanNumber.length === 10) {
    return `91${cleanNumber}`;
  }
  
  // If it already starts with 91, use as is
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    return cleanNumber;
  }
  
  // Return the clean number as is for other cases
  return cleanNumber;
};

export const createWhatsAppLink = (phoneNumber, message = '') => {
  const formattedNumber = formatPhoneForWhatsApp(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${formattedNumber}${message ? `?text=${encodedMessage}` : ''}`;
};

export const openWhatsApp = (phoneNumber, message = '') => {
  const link = createWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
};
