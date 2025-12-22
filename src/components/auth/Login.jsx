import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user data - in real app, this would come from API
        const mockUser = {
          firstName: 'John',
          lastName: 'Doe',
          email: formData.email,
          id: '1'
        };

        login(mockUser);
        navigate('/');
      } catch {
        setErrors({ general: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic here
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Graphics/Info */}
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex-col items-center justify-center p-12 transition-all duration-700 ${pageLoaded ? 'translate-x-0 opacity-100 rounded-r-[200px]' : '-translate-x-full opacity-0 rounded-[300px]'}`}>
        <div className="max-w-md text-center">
          <h1 className="mb-6 text-4xl font-bold text-white">Welcome Back!</h1>
          <p className="mb-8 text-xl text-blue-100">Anxiety focus on outcome!</p>
          <div className="mb-8">
            <p className="text-2xl font-semibold text-white">Hello, Welcome!</p>
            <p className="mt-2 text-blue-100">Sign in to continue your thyroid care journey</p>
          </div>
          <div className="mt-12">
            <p className="text-blue-100">Don't have an account?</p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 mt-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 transition-all duration-700 ${pageLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="w-full max-w-md">
          {/* Back Button - Mobile Only */}
          <div className="mb-6 lg:hidden">
            <Link to="/" className="inline-flex items-center text-blue-600 transition-colors duration-300 hover:text-blue-700">
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 shadow-lg rounded-2xl">
                <FaUser className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-600">Sign in to your ThyroCareX account</p>
          </div>

          {/* Login Form */}
          <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username/Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email or username"
                  />
                  <FaUser className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <FaLock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 transition-colors duration-300 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Signing In...' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">or login with social platforms</span>
                </div>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                <span className="font-medium text-gray-700">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link - Desktop hidden, shown in left panel */}
            <div className="mt-8 text-center lg:hidden">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;