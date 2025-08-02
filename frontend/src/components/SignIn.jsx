import { useState } from 'react';
import { Shield, Car, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  
  // Dummy user data for testing
  const dummyUsers = [
    { email: 'abc@gmail.com', password: '123456', name: 'abc xyz' },
    { email: 'driver@gmail.com', password: '123456', name: 'Driver Name' }
  ];
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form validation and loading
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call with dummy data validation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists in dummy data
      const user = dummyUsers.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // Store user data in localStorage for session
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Sign In successful:', user);
        
        // Direct navigation based on user type
        if (user.email === 'driver@gmail.com') {
          navigate('/offer-ride');
        } else {
          navigate('/find-ride');
        }
      } else {
        setErrors({ email: 'Invalid email or password. Try: user@test.com / 123456' });
      }
    } catch (error) {
      console.error('Sign In error:', error);
      setErrors({ email: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">Sign in to your account</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 sm:mb-6 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-blue-800 mb-2">
              Demo Credentials:
            </h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div className="break-all">
                <strong>Email:</strong> abc@gmail.com |{" "}
                <strong>Password:</strong> 123456
              </div>
              <div className="break-all">
                <strong>Email:</strong> driver@gmail.com |{" "}
                <strong>Password:</strong> 123456
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 touch-manipulation"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base touch-manipulation"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/join" className="text-blue-600 underline cursor-pointer">
                Join for free
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;