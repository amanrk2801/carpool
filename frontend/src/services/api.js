// API Configuration and Service Layer
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.token;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle empty responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = {};
      }

      if (!response.ok) {
        if (response.status === 401) {
          // Token might be expired, redirect to login
          localStorage.removeItem('user');
          window.location.href = '/signin';
        }
        
        // For error responses, return the error data instead of throwing
        console.error(`API call failed for ${endpoint} with status ${response.status}:`, data);
        console.error('Error data structure:', JSON.stringify(data, null, 2));
        
        // Extract detailed error message from various possible fields
        let errorMessage = 'An error occurred';
        if (data.data && typeof data.data === 'string') {
          errorMessage = data.data; // Detailed error in data field
        } else if (data.error && data.error !== null) {
          errorMessage = data.error;
        } else if (data.message && data.message !== 'Validation failed') {
          errorMessage = data.message;
        } else if (data.data && data.data.message) {
          errorMessage = data.data.message; // Nested error message
        } else if (data.data && data.data.error) {
          errorMessage = data.data.error; // Nested error
        } else {
          errorMessage = data.message || `API call failed with status ${response.status}`;
        }
        
        return {
          success: false,
          data: null,
          message: errorMessage,
          error: errorMessage
        };
      }

      // Standardize response format
      if (data.success !== undefined) {
        return data; // Already in standard format
      } else {
        return {
          success: true,
          data: data,
          message: 'Success'
        };
      }
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      return {
        success: false,
        data: null,
        message: error.message || 'An error occurred'
      };
    }
  }

  // Authentication APIs
  async login(credentials) {
    return this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.apiCall('/auth/logout', {
      method: 'POST',
    });
  }

  // Ride APIs
  async offerRide(rideData) {
    return this.apiCall('/rides/offer', {
      method: 'POST',
      body: JSON.stringify(rideData),
    });
  }

  async searchRides(searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    return this.apiCall(`/rides/search?${queryString}`);
  }

  async getMyRides() {
    return this.apiCall('/rides/my-rides');
  }

  async getRideDetails(rideId) {
    return this.apiCall(`/rides/${rideId}`);
  }

  async updateRide(rideId, rideData) {
    return this.apiCall(`/rides/${rideId}/update`, {
      method: 'PUT',
      body: JSON.stringify(rideData),
    });
  }

  async deleteRide(rideId) {
    return this.apiCall(`/rides/${rideId}`, {
      method: 'DELETE',
    });
  }

  async cancelRide(rideId) {
    return this.apiCall(`/rides/${rideId}/cancel`, {
      method: 'DELETE',
    });
  }

  async updateRideStatus(rideId, status) {
    return this.apiCall(`/rides/${rideId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  async filterRides(filterParams) {
    const queryString = new URLSearchParams(filterParams).toString();
    return this.apiCall(`/rides/filter?${queryString}`);
  }

  async getFromLocations() {
    return this.apiCall('/rides/locations/from');
  }

  async getToLocations() {
    return this.apiCall('/rides/locations/to');
  }

  // Booking APIs
  async bookRide(rideId, bookingData) {
    return this.apiCall(`/rides/${rideId}/book`, {
      method: 'POST',
      body: JSON.stringify({
        seatsRequested: bookingData.seatsRequested || bookingData.seatsRequired || 1
      }),
    });
  }

  async getMyBookings() {
    return this.apiCall('/bookings/my-bookings');
  }

  async getMyRideBookings() {
    return this.apiCall('/bookings/my-ride-bookings');
  }

  async cancelBooking(bookingId) {
    console.log('Canceling booking with ID:', bookingId);
    console.log('Current user token:', this.getAuthToken());
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('Current user from localStorage:', { id: user.id, email: user.email, name: user.name });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return this.apiCall(`/bookings/${bookingId}/cancel`, {
      method: 'PUT',
    });
  }

  async confirmBooking(bookingId) {
    return this.apiCall(`/bookings/${bookingId}/confirm`, {
      method: 'PUT',
    });
  }

  // User profile APIs (to be implemented when backend is ready)
  async getUserProfile() {
    return this.apiCall('/users/profile');
  }

  async updateUserProfile(profileData) {
    return this.apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Rating APIs
  async createRating(ratingData) {
    return this.apiCall('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  async getUserRatings(userId) {
    return this.apiCall(`/ratings/user/${userId}`);
  }

  async getRecentUserRatings(userId, limit = 5) {
    return this.apiCall(`/ratings/user/${userId}/recent?limit=${limit}`);
  }

  async updateUserStats(userId) {
    return this.apiCall(`/ratings/user/${userId}/update-stats`, {
      method: 'POST',
    });
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
