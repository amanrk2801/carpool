import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      if (response.success) {
        const userData = {
          ...response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, data: userData };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      if (response.success) {
        const registeredUser = {
          ...response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        };
        localStorage.setItem('user', JSON.stringify(registeredUser));
        setUser(registeredUser);
        return { success: true, data: registeredUser };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if user is logged in
      if (user) {
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    } finally {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      if (!user?.refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiService.refreshToken(user.refreshToken);
      if (response.success) {
        const updatedUser = {
          ...user,
          token: response.data.token,
          refreshToken: response.data.refreshToken || user.refreshToken,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, data: updatedUser };
      } else {
        throw new Error(response.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout user
      logout();
      return { success: false, error: error.message };
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await apiService.verifyEmail(token);
      if (response.success) {
        // Update user's email verification status if user is logged in
        if (user) {
          const updatedUser = { ...user, emailVerified: true };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await apiService.forgotPassword(email);
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await apiService.resetPassword(token, newPassword);
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshToken,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;