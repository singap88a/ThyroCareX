import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar, FaMapMarker, FaStethoscope, FaArrowLeft, FaUserPlus, FaIdCard, FaUpload } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import AuthWave from './AuthWave';
import { TermsModal, PrivacyModal } from './AuthModals';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
    DateofBirth: '',
    Gender: '', // 1 or 2 as int
    Specialization: '',
    Hospital: '',
    MedicalLicenseNumber: '',
    Address: '',
    City: '',
    ZipCode: '',
    IdentificationImage: null,
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      if (!formData.FullName || !formData.FullName.trim()) newErrors.FullName = 'Full Name is required';
      if (!formData.Email) {
        newErrors.Email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
        newErrors.Email = 'Invalid email';
      }
      if (!formData.Password) {
        newErrors.Password = 'Password is required';
      } else if (formData.Password.length < 8) {
        newErrors.Password = 'Min 8 chars';
      }
      if (formData.Password !== formData.ConfirmPassword) {
        newErrors.ConfirmPassword = 'Passwords do not match';
      }
    } else if (step === 2) {
      if (!formData.PhoneNumber) newErrors.PhoneNumber = 'Phone is required';
      if (!formData.DateofBirth) newErrors.DateofBirth = 'Date of birth is required';
      if (!formData.Gender) newErrors.Gender = 'Select gender';
      if (!formData.Specialization) newErrors.Specialization = 'Specialization is required';
    } else if (step === 3) {
      if (!formData.Address || !formData.Address.trim()) newErrors.Address = 'Street is required';
      if (!formData.City || !formData.City.trim()) newErrors.City = 'City is required';
      // if (!formData.identityFile) newErrors.identityFile = 'Identity document is required'; 
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

  const { register } = useAuth(); // Get register from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsLoading(true);
      setErrors({});
      try {
        const data = new FormData();
        data.append('FullName', formData.FullName);
        data.append('Email', formData.Email);
        data.append('Password', formData.Password);
        data.append('ConfirmPassword', formData.ConfirmPassword);
        data.append('PhoneNumber', formData.PhoneNumber);
        data.append('Gender', formData.Gender); // Ensure this is converted to int if needed by backend, but FormData handles strings mainly. API expects int32, usually backend parses string "1" to int 1.
        data.append('DateofBirth', formData.DateofBirth);
        data.append('Specialization', formData.Specialization);
        data.append('Hospital', formData.Hospital || '');
        data.append('MedicalLicenseNumber', formData.MedicalLicenseNumber || '');
        data.append('Address', formData.Address);
        data.append('City', formData.City);
        data.append('ZipCode', formData.ZipCode);
        if (formData.IdentificationImage) {
            data.append('IdentificationImage', formData.IdentificationImage);
        }

        const response = await register(data);
        
        if (response.succeeded) {
             toast.success(response.message || "Registration successful! Please wait for admin approval.");
             setIsSuccess(true);
             // navigate('/login'); 
        } else {
             setErrors({ general: response.message || 'Registration failed' });
             toast.error(response.message || 'Registration failed');
        }
      } catch (err) {
        console.error(err);
        setErrors({ general: err.response?.data?.message || 'Registration failed. Please try again.' });
        toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
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
            name="FullName"
            type="text"
            value={formData.FullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.FullName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="Dr. John Doe"
          />
          <FaUser className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
        </div>
        {errors.FullName && <p className="mt-1 text-xs text-red-500">{errors.FullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">Email *</label>
        <div className="relative">
          <input
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.Email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="doctor@example.com"
          />
          <FaEnvelope className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
        </div>
        {errors.Email && <p className="mt-1 text-xs text-red-500">{errors.Email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Password */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Password *</label>
          <div className="relative">
            <input
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.Password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.Password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
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
          {errors.Password && <p className="mt-1 text-xs text-red-500">{errors.Password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Confirm *</label>
          <div className="relative">
            <input
              name="ConfirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.ConfirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.ConfirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
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
              name="PhoneNumber"
              type="tel"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.PhoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="010xxxxxxx"
            />
            <FaPhone className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">DOB *</label>
          <div className="relative">
            <input
              name="DateofBirth"
              type="date"
              value={formData.DateofBirth}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.DateofBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            />
            <FaCalendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         {/* Hospital */}
         <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Hospital</label>
            <div className="relative">
               <input
               name="Hospital"
               type="text"
               value={formData.Hospital}
               onChange={handleChange}
               className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.Hospital ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
               }`}
               placeholder="Tabarak Hospital"
               />
               <FaMapMarker className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
            </div>
         </div>

         {/* Medical License Number */}
         <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">License Number</label>
            <div className="relative">
               <input
               name="MedicalLicenseNumber"
               type="text"
               value={formData.MedicalLicenseNumber}
               onChange={handleChange}
               className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.MedicalLicenseNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
               }`}
               placeholder="000000333"
               />
               <FaIdCard className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
            </div>
         </div>
      </div>

      {/* Specialization */}
      <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Specialization *</label>
          <div className="relative">
            <input
              name="Specialization"
              type="text"
              value={formData.Specialization}
              onChange={handleChange}
              className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.Specialization ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="e.g. Endocrinology"
            />
            <FaStethoscope className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3.5 top-1/2" />
          </div>
          {errors.Specialization && <p className="mt-1 text-xs text-red-500">{errors.Specialization}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">Gender *</label>
        <div className="grid grid-cols-3 gap-3">
          {[
              { label: 'Male', value: 1 }, 
              { label: 'Female', value: 2 }, 
              { label: 'Other', value: 0 } 
          ].map((option) => (
            <label key={option.label} className="relative cursor-pointer">
              <input
                type="radio"
                name="Gender"
                value={option.value}
                checked={parseInt(formData.Gender) === option.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`py-3 px-2 border rounded-xl text-center text-sm font-medium transition-all ${
                parseInt(formData.Gender) === option.value
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}>
                {option.label}
              </div>
            </label>
          ))}
        </div>
        {errors.Gender && <p className="mt-1 text-xs text-red-500">{errors.Gender}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      {/* Address */}
      <div className="space-y-4">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <FaMapMarker className="w-4 h-4 mr-2 text-primary" />
          Location
        </h3>
        <div className="space-y-3">
          <input
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              name="City"
              value={formData.City}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="City"
            />
            {/* Using ZipCode directly */}
            <input
              name="ZipCode"
              value={formData.ZipCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Zip Code"
            />
          </div>
        </div>
      </div>

       {/* Identity Verification */}
       <div className="space-y-3 pt-2">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <FaIdCard className="w-4 h-4 mr-2 text-primary" />
          Identification Image
        </h3>
        
        <div className="relative">
          <input
            type="file"
            name="IdentificationImage"
            id="IdentificationImage"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <label 
            htmlFor="IdentificationImage"
            className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              formData.IdentificationImage ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
            }`}
          >
            {formData.IdentificationImage ? (
               <div className="flex items-center text-primary">
                 <FaIdCard className="w-5 h-5 mr-2" />
                 <span className="text-sm font-medium truncate max-w-[200px]">{formData.IdentificationImage.name}</span>
               </div>
            ) : (
              <div className="text-center">
                <FaUpload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload Image</p>
                <p className="text-xs text-gray-400 mt-1">.jpg, .png</p>
              </div>
            )}
          </label>
        </div>
        {errors.IdentificationImage && <p className="text-xs text-red-500">{errors.IdentificationImage}</p>}
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
          
          {/* Success Screen */}
          {isSuccess ? (
             <div className="flex flex-col items-center justify-center p-8 bg-white border border-green-100 shadow-xl shadow-green-50 rounded-2xl animate-fadeIn text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                   <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                   <p className="text-gray-600 max-w-sm mx-auto">
                      Your account has been created and is currently under review by our administrators.
                   </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 w-full max-w-sm">
                   <p className="text-sm text-blue-800 font-medium">
                      Please wait for admin approval. You will be notified once your account is active.
                   </p>
                </div>

                <Link 
                   to="/login" 
                   className="w-full max-w-sm px-6 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transform transition-all hover:-translate-y-0.5"
                >
                   Go to Login
                </Link>
             </div>
          ) : (
            <>
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
            </>
          )}
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