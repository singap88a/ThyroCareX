import { useState } from 'react';
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
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-200 rounded-full -top-24 -right-24 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute delay-1000 bg-indigo-200 rounded-full -bottom-24 -left-24 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-6 transition-colors duration-300 text-primary hover:text-primaryHover">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 shadow-lg bg-primary rounded-2xl">
              <FaUser className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your ThyroCareX account</p>
        </div>

        {/* Login Form */}
        <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
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
                  className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium transition-colors duration-300 text-primary hover:text-primaryHover"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold text-lg hover:bg-primaryHover transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
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

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold transition-colors duration-300 text-primary hover:text-primaryHover"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
