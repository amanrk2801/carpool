import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, Karnataka',
    bio: 'Software engineer who loves carpooling to beat Bangalore traffic and make new friends!',
    profilePicture: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  useEffect(() => {
    if (user) {
      const defaultProfile = {
        name: 'User Name',
        email: 'user@example.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, Karnataka',
        bio: 'Software engineer who loves carpooling to beat Bangalore traffic and make new friends!',
        profilePicture: null
      };

      const profileData = {
        name: user.firstName || user.name || defaultProfile.name,
        email: user.email || defaultProfile.email,
        phone: user.phone || defaultProfile.phone,
        location: user.location || defaultProfile.location,
        bio: user.bio || defaultProfile.bio,
        profilePicture: user.profilePicture || null
      };
      setUserProfile(profileData);
      setEditedProfile(profileData);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    
    // Update localStorage to maintain consistency
    if (user) {
      try {
        const updatedUser = { 
          ...user, 
          name: editedProfile.name,
          firstName: editedProfile.name.split(' ')[0], // Update firstName too
          email: editedProfile.email,
          phone: editedProfile.phone,
          location: editedProfile.location,
          bio: editedProfile.bio,
          profilePicture: editedProfile.profilePicture
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Force a page refresh to update AuthContext
        window.location.reload();
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
    
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(false);
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
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
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
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{userProfile.phone}</p>
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
            <div className="pt-4">
              <button className="text-red-600 hover:text-red-800 font-medium">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;