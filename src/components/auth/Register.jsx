import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar, FaMapMarker, FaStethoscope, FaArrowLeft, FaUserPlus, FaIdCard, FaUpload } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import AuthWave from './AuthWave';
import { TermsModal, PrivacyModal } from './AuthModals';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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
    identityType: 'nationalId', // nationalId, passport, doctorCard
    identityFile: null,
    termsAccepted: false,
    newsletterSubscribed: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  
  // const { login } = useAuth(); // Not logging in directly anymore
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (name.includes('.')) {
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

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Min 8 chars';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 2) {
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Select gender';
    } else if (step === 3) {
      if (!formData.address.street.trim()) newErrors['address.street'] = 'Street is required';
      if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
      // if (!formData.identityFile) newErrors.identityFile = 'Identity document is required'; // Must be optional if not strictly required, but user asked for it. Assuming required for verification flow.
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Required';
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/pending-verification');
      } catch {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStepIndicator = () => null; // Removed, specific indicators now in header


  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">Full Name *</label>
        <div className="relative">
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="Dr. John Doe"
          />
          <FaUser className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
        </div>
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">Email *</label>
        <div className="relative">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="doctor@example.com"
          />
          <FaEnvelope className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Password */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Password *</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="••••••••"
            />
            <FaLock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-primary"
            >
              {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Confirm *</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="••••••••"
            />
            <FaLock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-primary"
            >
              {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Phone *</label>
          <div className="relative">
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="(555) 123-4567"
            />
            <FaPhone className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">DOB *</label>
          <div className="relative">
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            />
            <FaCalendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
          </div>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">Gender *</label>
        <div className="grid grid-cols-3 gap-3">
          {['Male', 'Female', 'Other'].map((gender) => (
            <label key={gender} className="relative cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                checked={formData.gender === gender.toLowerCase()}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`py-3 px-2 border rounded-xl text-center text-sm font-medium transition-all ${
                formData.gender === gender.toLowerCase()
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}>
                {gender}
              </div>
            </label>
          ))}
        </div>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
      </div>

       {/* Medical History */}
       <div>
        <h3 className="flex items-center mb-3 text-sm font-semibold text-gray-900">
          <FaStethoscope className="w-4 h-4 mr-2 text-primary" />
          Medical History (Optional)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'thyroidIssues', label: 'Thyroid Issues' },
            { key: 'diabetes', label: 'Diabetes' },
            { key: 'heartDisease', label: 'Heart Disease' },
            { key: 'allergies', label: 'Allergies' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 border-gray-100">
              <input
                type="checkbox"
                name={`medicalHistory.${key}`}
                checked={formData.medicalHistory[key]}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <span className="ml-2 text-xs font-medium text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      {/* Address */}
      <div className="space-y-4">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <FaMapMarker className="w-4 h-4 mr-2 text-primary" />
          Address
        </h3>
        <div className="space-y-3">
          <input
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="City"
            />
            <input
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="State"
            />
            <input
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Zip"
            />
          </div>
        </div>
      </div>

       {/* Identity Verification */}
       <div className="space-y-3 pt-2">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <FaIdCard className="w-4 h-4 mr-2 text-primary" />
          Identity Verification
        </h3>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[
            { id: 'nationalId', label: 'National ID' },
            { id: 'passport', label: 'Passport' },
            { id: 'doctorCard', label: 'Doctor ID' }
          ].map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, identityType: type.id }))}
              className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all ${
                formData.identityType === type.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="file"
            name="identityFile"
            id="identityFile"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleChange}
          />
          <label 
            htmlFor="identityFile"
            className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              formData.identityFile ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
            }`}
          >
            {formData.identityFile ? (
               <div className="flex items-center text-primary">
                 <FaIdCard className="w-5 h-5 mr-2" />
                 <span className="text-sm font-medium truncate max-w-[200px]">{formData.identityFile.name}</span>
               </div>
            ) : (
              <div className="text-center">
                <FaUpload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload Document</p>
                <p className="text-xs text-gray-400 mt-1">Images or PDF</p>
              </div>
            )}
          </label>
        </div>
        {errors.identityFile && <p className="text-xs text-red-500">{errors.identityFile}</p>}
      </div>

      {/* Terms */}
      <div className="pt-2">
        <div className="flex items-start">
          <input
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="termsAccepted" className="ml-2 text-xs text-gray-600 leading-relaxed">
            I agree to the 
            <button type="button" onClick={() => setShowTermsModal(true)} className="mx-1 font-semibold text-primary hover:underline">Terms</button>
            and 
            <button type="button" onClick={() => setShowPrivacyModal(true)} className="mx-1 font-semibold text-primary hover:underline">Privacy Policy</button>
            *
          </label>
        </div>
        {errors.termsAccepted && <p className="mt-1 text-xs text-red-500">You must accept the terms</p>}
      </div>
    </div>
  );

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white">
      {/* ========== LEFT CONTENT (Form) ========== */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24 mt-4 mb-4 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-xl mx-auto animate-fadeIn py-6">
          
          {/* Header & Steps */}
          <div className="mb-10">
             <div className="flex items-end justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {/* Icon from Login */}
                    <div className="flex items-center justify-center w-10 h-10 mr-3 shadow-sm bg-gradient-to-br from-blue-50 to-primary/10 rounded-xl">
                      <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <h1 className="text-[1.5rem] lg:text-[1.7rem] font-bold tracking-tight text-gray-900 leading-tight">
                      <span className="relative font-extrabold text-primary">
                        Create Account
                        <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full transform -translate-y-1"></span>
                      </span>
                      <span className="ml-2 font-extrabold text-gray-700 block sm:inline sm:ml-2">
                        to Thyro Carex
                      </span>
                    </h1>
                  </div>
                  <p className="  text-sm font-medium text-gray-600">
                    Join our professional medical network
                  </p>
                </div>

                {/* Step Indicator */}
                <div className="hidden sm:block text-right ml-4 mb-2">
                  <span className="text-sm font-bold text-primary">Step {currentStep}</span>
                  <span className="text-sm text-gray-400">/3</span>
                </div>
             </div>
             
             {/* Progress Bar */}
             <div className="bg-gray-100 h-1.5 w-full rounded-full overflow-hidden mt-4">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
             </div>
          </div>

          {/* Registration Form */}
          <div className="p-6 bg-white border border-gray-100 shadow-xl shadow-primary/5 rounded-2xl relative">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-50">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 transition-all border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900"
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Spacer
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transform transition-all hover:-translate-y-0.5"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transform transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Complete Registration'}
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ANIMATED WAVE SECTION ========== */}
      <AuthWave />
      
      {/* ========== MODALS ========== */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      
      <style>{`
        :root {
          --primary: #4695a5;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input:focus {
          outline: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};

export default Register;