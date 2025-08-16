import React, { useState, useEffect, useCallback } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profilePicture: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load user profile from backend
  const loadUserProfile = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.getUserProfile();
      if (response.success) {
        const userData = response.data;
        const profileData = {
          name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
          profilePicture: userData.profilePictureUrl || null
        };
        setUserProfile(profileData);
        setEditedProfile(profileData);
      } else {
        console.error('Failed to load profile:', response.message);
        // Fallback to user data from localStorage
        const fallbackProfile = {
          name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.location || '',
          bio: user.bio || '',
          profilePicture: user.profilePictureUrl || null
        };
        setUserProfile(fallbackProfile);
        setEditedProfile(fallbackProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to user data from localStorage
      const fallbackProfile = {
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        profilePicture: user.profilePictureUrl || null
      };
      setUserProfile(fallbackProfile);
      setEditedProfile(fallbackProfile);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserProfile();
  }, [user, loadUserProfile]);

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    setFieldErrors({});
    
    try {
      // Prepare the update request with the correct field names
      const profileUpdateRequest = {
        firstName: editedProfile.name.split(' ')[0] || '',
        lastName: editedProfile.name.split(' ').slice(1).join(' ') || '',
        phone: editedProfile.phone,
        location: editedProfile.location,
        bio: editedProfile.bio
      };

      // Call the API to update the profile
      const response = await apiService.updateUserProfile(profileUpdateRequest);
      
      if (response.success) {
        // Update local state with the response data
        const updatedUserData = response.data;
        const updatedProfile = {
          name: `${updatedUserData.firstName} ${updatedUserData.lastName}`.trim(),
          email: updatedUserData.email,
          phone: updatedUserData.phone,
          location: updatedUserData.location,
          bio: updatedUserData.bio,
          profilePicture: updatedUserData.profilePictureUrl
        };
        
        setUserProfile(updatedProfile);
        setEditedProfile(updatedProfile);
        setIsEditing(false);
        
        // Update localStorage to maintain consistency
        if (user) {
          const updatedUser = { 
            ...user, 
            firstName: updatedUserData.firstName,
            lastName: updatedUserData.lastName,
            name: updatedProfile.name,
            phone: updatedUserData.phone,
            location: updatedUserData.location,
            bio: updatedUserData.bio,
            profilePictureUrl: updatedUserData.profilePictureUrl
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        // Show success message (you can add a toast notification here)
        alert('Profile updated successfully!');
        
      } else {
        // Handle field-specific errors
        if (response.field) {
          setFieldErrors({ [response.field]: response.message });
        }
        setSaveError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(false);
    setSaveError('');
    setFieldErrors({});
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiService.deleteUserAccount();
      if (response.success) {
        // Clear user data and redirect to home
        localStorage.removeItem('user');
        alert('Account deleted successfully');
        navigate('/');
        window.location.reload(); // Force reload to clear auth context
      } else {
        alert('Failed to delete account: ' + response.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Redirect if no user is logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your profile</h2>
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {(editedProfile.profilePicture || userProfile.profilePicture) ? (
                    <img
                      src={editedProfile.profilePicture || userProfile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
                <p className="text-blue-100">{userProfile.email}</p>
              </div>
              
              <div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {saveError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {saveError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{userProfile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{userProfile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        fieldErrors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2">
                    <WhatsAppButton
                      phoneNumber={userProfile.phone}
                      userName={userProfile.name}
                      userType="user"
                      variant="text"
                      className="text-gray-900"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{userProfile.location}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell others a bit about yourself..."
                />
              ) : (
                <p className="text-gray-900 py-2">{userProfile.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-red-800 mb-2">Danger Zone</h4>
                <p className="text-red-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;