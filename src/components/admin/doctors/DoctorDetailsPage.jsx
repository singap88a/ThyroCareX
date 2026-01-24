import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Calendar, CreditCard, Activity, Phone, User, FileText, Briefcase, Award, ShieldCheck } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { isDarkMode } = useAdminTheme();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock patients data
  const [patients] = useState([
    {
      id: 'P001',
      name: 'John Smith',
      date: '2023-10-24',
      result: 'Normal',
      confidence: 98,
      image: 'https://prod-images-static.radiopaedia.org/images/51536838/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Patient shows no signs of abnormalities. Regular checkup recommended in 6 months.'
    },
    {
      id: 'P002',
      name: 'Emily Davis',
      date: '2023-10-23',
      result: 'Abnormal',
      confidence: 87,
      image: 'https://prod-images-static.radiopaedia.org/images/1568265/8b8f8e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Detected potential nodule in the left lobe. Biopsy recommended.'
    },
    {
      id: 'P003',
      name: 'Michael Brown',
      date: '2023-10-22',
      result: 'Normal',
      confidence: 95,
      image: 'https://prod-images-static.radiopaedia.org/images/2345678/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Clear scan. No issues found.'
    },
    {
      id: 'P004',
      name: 'Jessica Wilson',
      date: '2023-10-21',
      result: 'Uncertain',
      confidence: 65,
      image: 'https://prod-images-static.radiopaedia.org/images/3456789/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Image quality is low. Requested re-scan.'
    },
  ]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDoctorById(id);
        if (response && response.succeeded && response.data) {
            const data = response.data;
            setDoctor({
                id: data.doctorID,
                name: data.fullName,
                email: data.email,
                phone: data.phoneNumber,
                specialization: data.specialization,
                address: data.address, 
                hospital: data.hospital,
                gender: data.gender,
                nationalId: data.nationalID,
                imagePath: data.imagePath,
                subscriptionPlans: data.subscriptionPlanNames || [],
                registrationDate: data.registrationAt,
            });
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
          <User size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Doctor Not Found</h2>
        <p className="text-gray-500 max-w-md mb-8">The doctor profile you are looking for might have been removed or is temporarily unavailable.</p>
        <button 
          onClick={() => navigate('/admin/doctors')}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1"
        >
          Return to Doctors List
        </button>
      </div>
    );
  }

  const getGenderString = (genderCode) => {
    if (genderCode === 1) return 'Male';
    if (genderCode === 2) return 'Female';
    return 'Other';
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith('0001')) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-12 animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-8 sticky top-0 z-10 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 -mx-6 px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/doctors')}
            className={`p-2.5 rounded-xl transition-all duration-300 group
              ${isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white' 
                : 'bg-white border border-gray-200 hover:border-primary/50 text-gray-600 hover:text-primary hover:shadow-md'}`}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Doctor Profile
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              View details for Dr. {doctor.name.split(' ')[0]}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <span className={`px-4 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2
             ${isDarkMode 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Status
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Profile Card */}
          <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300
            ${isDarkMode 
              ? 'bg-admin-dark-card border-admin-dark-border shadow-2xl shadow-black/20' 
              : 'bg-white border-white shadow-xl shadow-gray-200/50'}`}>
            
             {/* Decorative Background Pattern */}
             <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
               <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
             </div>

             <div className="relative px-6 pt-16 pb-8 flex flex-col items-center text-center">
               {/* Avatar Container */}
               <div className="relative mb-6 group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                 <div className="relative w-32 h-32 rounded-full p-1 bg-white dark:bg-gray-800">
                    <img 
                      src={doctor.imagePath ? `https://thyrocarex.runasp.net/${doctor.imagePath}` : `https://ui-avatars.com/api/?name=${doctor.name}&background=random`} 
                      alt={doctor.name} 
                      className="w-full h-full rounded-full object-cover shadow-sm"
                    />
                 </div>
                 <div className="absolute bottom-1 right-2 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-800 rounded-full" title="Active"></div>
               </div>

               <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                 {doctor.name}
               </h2>
               <p className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                 {doctor.specialization}
               </p>

               {/* Quick Stats Row */}
               <div className="grid grid-cols-3 gap-2 w-full mb-6">
                  <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Patients</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{patients.length}</div>
                  </div>
                  <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Exp.</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5 Yrs</div>
                  </div>
                  <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rate</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4.9</div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex gap-3 w-full">
                 <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all text-sm font-medium">
                   Contact
                 </button>
                 <button className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors
                   ${isDarkMode 
                     ? 'border-gray-700 hover:bg-gray-700_50 text-gray-300' 
                     : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                   Edit Profile
                 </button>
               </div>
             </div>
          </div>

          {/* Contact Details Card */}
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-gray-100 shadow-lg shadow-gray-100'}`}>
            <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h3>
            <div className="space-y-5">
               <div className="flex items-center gap-4 group">
                 <div className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                   <Mail size={18} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                   <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{doctor.email}</p>
                 </div>
               </div>

               <div className="flex items-center gap-4 group">
                 <div className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}`}>
                   <Phone size={18} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Phone</p>
                   <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{doctor.phone || 'N/A'}</p>
                 </div>
               </div>

               <div className="flex items-center gap-4 group">
                 <div className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20' : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'}`}>
                   <MapPin size={18} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Location</p>
                   <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                     {typeof doctor.address === 'object' ? `${doctor.address.street || ''}, ${doctor.address.city || ''}` : (doctor.address || 'N/A')}
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Professional Info */}
            <div className={`p-6 rounded-3xl border transition-all hover:shadow-lg
              ${isDarkMode ? 'bg-gray-800/20 border-gray-700 hover:bg-gray-800/40' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 text-white">
                   <Briefcase size={20} />
                 </div>
                 <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Professional</h3>
               </div>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-gray-700/50">
                    <span className="text-sm text-gray-500">Hospital</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doctor.hospital || 'Private Practice'}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-gray-700/50">
                    <span className="text-sm text-gray-500">Joining Date</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(doctor.registrationDate)}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">License ID</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900 font-mono'}`}>{doctor.nationalId || 'N/A'}</span>
                 </div>
               </div>
            </div>

            {/* Account Info */}
            <div className={`p-6 rounded-3xl border transition-all hover:shadow-lg
              ${isDarkMode ? 'bg-gray-800/20 border-gray-700 hover:bg-gray-800/40' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-lg shadow-indigo-500/30 text-white">
                   <CreditCard size={20} />
                 </div>
                 <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Subscription</h3>
               </div>

               <div className="space-y-4">
                 <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Active Plan</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doctor.subscriptionPlans.length > 0 ? (
                        doctor.subscriptionPlans.map((plan, index) => (
                          <div key={index} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-semibold flex items-center gap-1.5">
                            <Award size={14} /> {plan}
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400 italic">No active subscription</span>
                      )}
                    </div>
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Plan Usage</span>
                      <span className="text-xs font-bold text-primary">75%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Patients Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className={`text-xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                  <Activity size={24} />
                </div>
                Recent Diagnoses
              </h3>
              <button className="text-sm text-primary hover:underline font-medium">View All History</button>
            </div>

            <div className={`rounded-3xl border overflow-hidden
              ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
              
              {patients.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={40} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500">No diagnoses recorded yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {patients.map((patient) => (
                    <div key={patient.id} className="p-6 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Patient Image */}
                        <div className="relative group flex-shrink-0">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                            <img src={patient.image} alt={patient.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white dark:border-gray-900 text-white
                            ${patient.result === 'Normal' ? 'bg-emerald-500' : 
                              patient.result === 'Abnormal' ? 'bg-red-500' : 'bg-orange-500'}`}>
                            {patient.result}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 py-1">
                          <div className="flex items-start justify-between mb-2">
                             <div>
                               <h4 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{patient.name}</h4>
                               <div className="flex items-center gap-3 text-xs text-gray-500">
                                 <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">ID: {patient.id}</span>
                                 <span>•</span>
                                 <span className="flex items-center gap-1"><Calendar size={12} /> {patient.date}</span>
                               </div>
                             </div>
                             
                             <div className="text-right">
                               <div className={`text-2xl font-black ${patient.confidence > 90 ? 'text-emerald-500' : patient.confidence > 70 ? 'text-blue-500' : 'text-orange-500'}`}>
                                 {patient.confidence}<span className="text-sm align-top opacity-60">%</span>
                               </div>
                               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confidence</div>
                             </div>
                          </div>
                          
                          <p className={`text-sm leading-relaxed p-3 rounded-xl border border-dashed ${isDarkMode ? 'bg-gray-800/30 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                            "{patient.notes}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;

