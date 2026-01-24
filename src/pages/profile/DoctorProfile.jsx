import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Settings,
  Shield,
  BarChart3,
  Camera,
  Save,
  Eye,
  EyeOff,
  Download,
  Upload,
  Activity,
  Users,
  FileText,
  Target,
  Star,
  TrendingUp,
  Bell
} from 'lucide-react';
import doctorService from '../../services/doctorService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    medicaLicenseNumber: "",
    address: "",
    professionalBio: "",
    hospital: "",
    profileImage: null,
    // Add other fields as necessary from API response
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await doctorService.getProfile();
        if (response && response.succeeded) {
           // The API returns PascalCase or camelCase depending on serialization. 
           // Based on Curl: data keys are camelCase (fullName, email, etc)
           setProfileData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });



  const [performanceStats, setPerformanceStats] = useState({
    totalPatients: { current: 0, target: 156, change: "+12" },
    totalDiagnoses: { current: 0, target: 289, change: "+23" },
    accuracyRate: { current: 0, target: 92, change: "+2%" },
    avgResponseTime: { current: 0, target: 45, change: "-5 mins" },
    patientSatisfaction: { current: 0, target: 94, change: "+3%" },
    monthlyGrowth: { current: 0, target: 15, change: "+4%" }
  });

  const [activityData, setActivityData] = useState([
    { day: 'Mon', diagnoses: 12, patients: 8 },
    { day: 'Tue', diagnoses: 18, patients: 12 },
    { day: 'Wed', diagnoses: 15, patients: 10 },
    { day: 'Thu', diagnoses: 22, patients: 15 },
    { day: 'Fri', diagnoses: 14, patients: 9 },
    { day: 'Sat', diagnoses: 8, patients: 5 },
    { day: 'Sun', diagnoses: 5, patients: 3 }
  ]);

  // Animate statistics on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPerformanceStats(prev => ({
        totalPatients: { ...prev.totalPatients, current: prev.totalPatients.target },
        totalDiagnoses: { ...prev.totalDiagnoses, current: prev.totalDiagnoses.target },
        accuracyRate: { ...prev.accuracyRate, current: prev.accuracyRate.target },
        avgResponseTime: { ...prev.avgResponseTime, current: prev.avgResponseTime.target },
        patientSatisfaction: { ...prev.patientSatisfaction, current: prev.patientSatisfaction.target },
        monthlyGrowth: { ...prev.monthlyGrowth, current: prev.monthlyGrowth.target }
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (title, description, type = 'success') => {
    const id = Date.now();
    const newToast = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        newProfileImage: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
        const formData = new FormData();
        // Append all fields
        // Note: The API requires specific keys. Based on curl: Id, FullName, Email, gender, PhoneNumber, Specialization...
        // We might need to map them or ensure state matches.
        // Let's assume the state keys match what we need or mapped here.
        // But the GET response keys are camelCase, the PUT request body in prompt shows PascalCase mostly.
        
        // Add ID from user context (decoded token) logic
        if (user && user.DoctorId) {
             formData.append('Id', user.DoctorId);
        }

        if (!profileData.medicaLicenseNumber || profileData.medicaLicenseNumber.trim() === '') {
             toast.error("Medical License Number is required");
             return;
        }

        if (profileData.medicaLicenseNumber) {
             formData.append('MedicaLicenseNumber', profileData.medicaLicenseNumber);
        }

        formData.append('FullName', profileData.fullName);
        formData.append('Email', profileData.email);
        formData.append('PhoneNumber', profileData.phoneNumber);
        formData.append('Specialization', profileData.specialization);
        formData.append('Address', profileData.address);
        formData.append('Hospital', profileData.hospital || '');
        formData.append('ProfessionalBio', profileData.professionalBio || '');
        formData.append('gender', profileData.gender || 1); 
        
        // If there's a new image (we need to handle file input change separately)
        if (profileData.newProfileImage) {
            formData.append('ProfileImage', profileData.newProfileImage);
        }

        const response = await doctorService.updateProfile(formData);
        if (response.succeeded) {
            toast.success("Profile Updated Successfully");
            setIsEditing(false);
        } else {
            toast.error(response.message || "Could not update profile");
        }
    } catch (error) {
        console.error("Update error", error);
        toast.error("An unexpected error occurred");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    
    try {
        const response = await doctorService.changePassword({
            email: profileData.email,
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
        });

        if (response.succeeded) {
            toast.success("Your password has been updated successfully");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } else {
             toast.error(response.message || "Failed to change password");
        }
    } catch (error) {
        console.error("Password change error", error);
        toast.error(error.response?.data?.message || "Failed to change password");
    }
  };



  const exportData = () => {
    toast.success("Your data export file will be sent to your email");
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'statistics', label: 'Analytics', icon: BarChart3 }
  ];

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'from-green-500 to-emerald-600';
    if (percentage >= 75) return 'from-blue-500 to-cyan-600';
    if (percentage >= 60) return 'from-yellow-500 to-amber-600';
    return 'from-red-500 to-orange-600';
  };

  const getChangeColor = (change) => {
    return change.includes('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
      {/* Toast Notifications */}

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                <p className="text-slate-600">Manage your personal information and account settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="p-8 mb-8 transition-all duration-300 border shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-md">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
            <div className={`relative group ${!isEditing ? 'cursor-default' : ''}`}>
              {isEditing ? (
                  <>
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center shadow-lg w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-[#00A2C2] overflow-hidden relative">
                        {profileData.profileImage || profileData.previewImage ? (
                            <img 
                                src={profileData.previewImage || (profileData.profileImage && profileData.profileImage.startsWith('http') ? profileData.profileImage : `https://thyrocarex.runasp.net/${profileData.profileImage}`)} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                onError={(e) => {e.target.style.display='none';}} 
                            />
                        ) : (
                            <User className="w-12 h-12 text-white" />
                        )}
                    </div>
                    <div className="absolute flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white shadow-md rounded-xl -bottom-2 -right-2 hover:bg-slate-50 group-hover:scale-110 hover:shadow-lg">
                        <Camera className="w-5 h-5 text-gray-600" />
                    </div>
                  </label>
                  <input 
                    id="profile-image-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                   />
                  </>
              ) : (
                  <div className="flex items-center justify-center shadow-lg w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-[#00A2C2] overflow-hidden relative">
                      {profileData.profileImage || profileData.previewImage ? (
                          <img 
                              src={profileData.previewImage || (profileData.profileImage && profileData.profileImage.startsWith('http') ? profileData.profileImage : `https://thyrocarex.runasp.net/${profileData.profileImage}`)} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              onError={(e) => {e.target.style.display='none';}}
                          />
                      ) : (
                          <User className="w-12 h-12 text-white" />
                      )}
                  </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-3xl font-bold text-slate-900">
                {profileData.fullName || "Doctor"}
              </h2>
              <p className="mb-2 text-xl font-semibold text-primary">{profileData.specialization}</p>
              <p className="text-slate-600">{profileData.hospital}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">Verified</span>
                <span className="px-3 py-1 text-sm font-medium rounded-full text-emerald-700 bg-emerald-100">Active</span>
                <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">Premium</span>
              </div>
            </div>
            
            {isEditing && (
                <label htmlFor="profile-image-upload" className="flex items-center px-6 py-3 space-x-2 font-medium transition-all duration-200 bg-white border shadow-sm text-slate-700 border-slate-300 rounded-xl hover:bg-slate-50 hover:shadow-md cursor-pointer">
                <Upload className="w-5 h-5 text-slate-600" />
                <span>Update Photo</span>
                </label>
            )}

            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center px-6 py-3 space-x-2 font-medium transition-all duration-200 border shadow-sm rounded-xl hover:shadow-md ml-auto
                ${isEditing ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-primary text-white border-transparent hover:bg-primary/90'}`}
            >
              <Settings className="w-5 h-5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>



        {/* Main Content Tabs */}
        <div className="overflow-hidden border shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm rounded-2xl">
          {/* Tab Headers */}
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900">Personal Information</h3>
                  <p className="text-slate-600">Update your personal and professional information</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      readOnly
                      value={profileData.email}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-500 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phoneNumber}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Medical License Number</label>
                    <input
                      type="text"
                      value={profileData.medicaLicenseNumber || ''}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, medicaLicenseNumber: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                   <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Specialization</label>
                    <input
                      type="text" 
                      value={profileData.specialization}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                   <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Hospital/Institution</label>
                    <input
                      type="text"
                      value={profileData.hospital || ''}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hospital: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium text-slate-700">Professional Bio</label>
                  <textarea
                    value={profileData.professionalBio || ''}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({ ...prev, professionalBio: e.target.value }))}
                    rows={4}
                    className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                  />
                </div>
                
                 <div>
                    <label className="block mb-3 text-sm font-medium text-slate-700">Address</label>
                    <input
                      type="text"
                      value={profileData.address || ''}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full px-4 py-3 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary
                        ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    />
                  </div>

                {isEditing && (
                <button 
                  onClick={handleSaveProfile}
                  className="w-full bg-gradient-to-r from-primary to-[#00A2C2] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900">Security & Password</h3>
                  <p className="text-slate-600">Manage your password and security settings</p>
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium text-slate-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute transition-colors duration-200 transform -translate-y-1/2 text-slate-400 right-3 top-1/2 hover:text-slate-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium text-slate-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute transition-colors duration-200 transform -translate-y-1/2 text-slate-400 right-3 top-1/2 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium text-slate-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute transition-colors duration-200 transform -translate-y-1/2 text-slate-400 right-3 top-1/2 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleChangePassword}
                  className="w-full bg-gradient-to-r from-primary to-[#00A2C2] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Update Password
                </button>

                <div className="pt-8 border-t border-slate-200">
                  <h4 className="mb-6 text-xl font-semibold text-slate-900">Additional Security</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-600">Extra security for your account</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <Bell className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Login Alerts</p>
                          <p className="text-sm text-slate-600">Notify on new device login</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900">Performance Analytics</h3>
                  <p className="text-slate-600">Detailed report of your activity and system performance</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 gap-6 lg:col-span-2 sm:grid-cols-2">
                    {[
                      { 
                        key: 'totalPatients', 
                        label: 'Total Patients', 
                        icon: Users,
                        format: (val) => val,
                        color: 'from-blue-500 to-cyan-500'
                      },
                      { 
                        key: 'totalDiagnoses', 
                        label: 'Diagnoses', 
                        icon: FileText,
                        format: (val) => val,
                        color: 'from-purple-500 to-pink-500'
                      },
                      { 
                        key: 'accuracyRate', 
                        label: 'Accuracy Rate', 
                        icon: Target,
                        format: (val) => `${val}%`,
                        color: 'from-green-500 to-emerald-500'
                      },
                      { 
                        key: 'patientSatisfaction', 
                        label: 'Satisfaction', 
                        icon: Star,
                        format: (val) => `${val}%`,
                        color: 'from-amber-500 to-orange-500'
                      }
                    ].map((metric) => {
                      const Icon = metric.icon;
                      const stat = performanceStats[metric.key];
                      const percentage = (stat.current / stat.target) * 100;
                      
                      return (
                        <div 
                          key={metric.key}
                          className="p-6 transition-all duration-300 transform border shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md hover:-translate-y-1"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-slate-100">
                              <Icon className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className={`text-sm font-medium ${getChangeColor(stat.change)}`}>
                              {stat.change}
                            </div>
                          </div>
                          
                          <div className="mb-2 text-2xl font-bold text-slate-900">
                            {metric.format(stat.current)}
                          </div>
                          <div className="text-sm font-medium text-slate-600">{metric.label}</div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between mb-1 text-xs text-slate-500">
                              <span>Progress</span>
                              <span>{Math.round(percentage)}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-200">
                                <div 
                                className={`h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${metric.color}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Weekly Activity Chart */}
                  <div className="p-6 transition-all duration-300 transform border shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-slate-900">Weekly Activity</h3>
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    
                    <div className="space-y-4">
                      {activityData.map((day) => (
                        <div key={day.day} className="flex items-center justify-between">
                          <span className="w-8 text-sm font-medium text-slate-600">{day.day}</span>
                          <div className="flex-1 mx-4">
                            <div className="flex space-x-1">
                              {/* Diagnoses Bar */}
                              <div 
                                className="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-primary to-cyan-500"
                                style={{ width: `${(day.diagnoses / 25) * 100}%` }}
                              ></div>
                              {/* Patients Bar */}
                              <div 
                                className="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                style={{ width: `${(day.patients / 20) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 text-xs text-right text-slate-500">
                            {day.diagnoses} / {day.patients}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center mt-6 space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-cyan-500"></div>
                        <span className="text-slate-600">Diagnoses</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <span className="text-slate-600">Patients</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h4 className="mb-6 text-xl font-semibold text-slate-900">Data Export</h4>
                  <div className="flex flex-col items-center justify-between p-8 border border-slate-200 sm:flex-row bg-gradient-to-r from-slate-50 to-primary/5 rounded-3xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Download className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-slate-900">Export All Data</p>
                        <p className="mt-1 text-slate-600">Download a copy of all your personal data and statistics</p>
                      </div>
                    </div>
                    <button
                      onClick={exportData}
                      className="flex items-center px-8 py-3 mt-6 space-x-2 font-semibold transition-all duration-200 bg-white border shadow-sm text-slate-700 border-slate-300 sm:mt-0 rounded-xl hover:bg-slate-50 hover:shadow-md"
                    >
                      <Download className="w-5 h-5" />
                      <span>Export Data</span>
                    </button>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;