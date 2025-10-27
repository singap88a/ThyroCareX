import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar, FaMapMarker, FaStethoscope, FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    medicalHistory: {
      thyroidIssues: false,
      diabetes: false,
      heartDisease: false,
      cancer: false,
      allergies: false,
      medications: false
    },
    termsAccepted: false,
    newsletterSubscribed: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 2) {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Please select your gender';
    } else if (step === 3) {
      if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
      if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
      if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
      if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'ZIP code is required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user data - in real app, this would come from API
        const mockUser = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          id: '1'
        };

        login(mockUser);
        navigate('/');
      } catch {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            step <= currentStep
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
            First Name *
          </label>
          <div className="relative">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            <FaUser className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <div className="relative">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            <FaUser className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
          </div>
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email Address *
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
          <FaEnvelope className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password *
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
            placeholder="Create a strong password"
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

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <FaLock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute text-gray-400 transition-colors duration-300 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
          Phone Number *
        </label>
        <div className="relative">
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="(555) 123-4567"
          />
          <FaPhone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-700">
          Date of Birth *
        </label>
        <div className="relative">
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          <FaCalendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
        </div>
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Gender *
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['Male', 'Female', 'Other'].map((gender) => (
            <label key={gender} className="relative">
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                checked={formData.gender === gender.toLowerCase()}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 text-center ${
                formData.gender === gender.toLowerCase()
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                {gender}
              </div>
            </label>
          ))}
        </div>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Address */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <FaMapMarker className="w-5 h-5 mr-2 text-blue-600" />
          Address Information
        </h3>

        {/* Street */}
        <div>
          <label htmlFor="address.street" className="block mb-2 text-sm font-medium text-gray-700">
            Street Address *
          </label>
          <input
            id="address.street"
            name="address.street"
            type="text"
            value={formData.address.street}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors['address.street'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="123 Main Street"
          />
          {errors['address.street'] && <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* City */}
          <div>
            <label htmlFor="address.city" className="block mb-2 text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              id="address.city"
              name="address.city"
              type="text"
              value={formData.address.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors['address.city'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            {errors['address.city'] && <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>}
          </div>

          {/* State */}
          <div>
            <label htmlFor="address.state" className="block mb-2 text-sm font-medium text-gray-700">
              State *
            </label>
            <input
              id="address.state"
              name="address.state"
              type="text"
              value={formData.address.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors['address.state'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="State"
            />
            {errors['address.state'] && <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>}
          </div>

          {/* ZIP Code */}
          <div>
            <label htmlFor="address.zipCode" className="block mb-2 text-sm font-medium text-gray-700">
              ZIP Code *
            </label>
            <input
              id="address.zipCode"
              name="address.zipCode"
              type="text"
              value={formData.address.zipCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors['address.zipCode'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="12345"
            />
            {errors['address.zipCode'] && <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>}
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <FaStethoscope className="w-5 h-5 mr-2 text-blue-600" />
          Medical History (Optional)
        </h3>
        <p className="text-sm text-gray-600">Please check any conditions that apply to you:</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { key: 'thyroidIssues', label: 'Thyroid Issues' },
            { key: 'diabetes', label: 'Diabetes' },
            { key: 'heartDisease', label: 'Heart Disease' },
            { key: 'cancer', label: 'Cancer' },
            { key: 'allergies', label: 'Allergies' },
            { key: 'medications', label: 'Currently on Medications' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`medicalHistory.${key}`}
                checked={formData.medicalHistory[key]}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Terms and Newsletter */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="termsAccepted" className="block ml-2 text-sm text-gray-700">
            I agree to the{' '}
            <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-700">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
            *
          </label>
        </div>
        {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}

        <div className="flex items-start">
          <input
            id="newsletterSubscribed"
            name="newsletterSubscribed"
            type="checkbox"
            checked={formData.newsletterSubscribed}
            onChange={handleChange}
            className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="newsletterSubscribed" className="block ml-2 text-sm text-gray-700">
            Subscribe to our newsletter for health tips and updates
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-200 rounded-full -top-24 -right-24 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute delay-1000 bg-indigo-200 rounded-full -bottom-24 -left-24 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center mb-6 text-blue-600 transition-colors duration-300 hover:text-blue-700">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <FaUserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600">Join ThyroCareX for advanced thyroid care</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Registration Form */}
        <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 font-medium text-gray-700 transition-all duration-300 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
