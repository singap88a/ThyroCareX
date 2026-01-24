import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Calendar, CreditCard, Activity, Phone, User, FileText, Briefcase, Award, ShieldCheck, Hash, Stethoscope } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { isDarkMode } = useAdminTheme();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock patients data (Static as requested)
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
                // Ensure image paths are correct
                identificationImage: data.identificationImage, // ID Image from API
                imagePath: data.imagePath, // Fallback ID Image
                profileImage: data.profileImage, // Profile Photo
                subscriptionPlans: data.subscriptionPlanNames || [],
                registrationDate: data.registrationAt,
                medicalLicenseNumber: data.medicalLicenseNumber,
                professionalBio: data.professionalBio,
                dateofBirth: data.dateofBirth
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
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <User size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Doctor Not Found</h2>
        <button 
          onClick={() => navigate('/admin/doctors')}
          className="px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-xl shadow-lg transition-all"
        >
          Return to Doctors List
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith('0001')) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-12 animate-fade-in spacing-y-6">
      {/* Header / Nav */}
      <div className="flex items-center justify-between mb-8">
        <button
            onClick={() => navigate('/admin/doctors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'}`}
          >
            <ArrowLeft size={18} />
            Back to List
        </button>
        <div className={`px-4 py-2 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700 border border-emerald-200`}>
             Active Doctor
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Card & Key Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Profile Card */}
          <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300
            ${isDarkMode 
              ? 'bg-admin-dark-card border-admin-dark-border' 
              : 'bg-white border-gray-100 shadow-xl shadow-primary/5'}`}>
             
             {/* Gradient Header */}
             <div className="h-32 bg-gradient-to-br from-primary to-[#00A2C2]"></div>

             <div className="relative px-6 pb-8 flex flex-col items-center text-center -mt-16">
               <div className="relative w-32 h-32 rounded-3xl p-1 bg-white dark:bg-gray-800 shadow-lg mb-4">
                  <img 
                    src={doctor.profileImage && doctor.profileImage !== 'default-doctor.png' 
                        ? (doctor.profileImage.startsWith('http') ? doctor.profileImage : `https://thyrocarex.runasp.net/${doctor.profileImage}`) 
                        : `https://ui-avatars.com/api/?name=${doctor.name}&background=random`} 
                    alt={doctor.name} 
                    className="w-full h-full rounded-2xl object-cover"
                  />
               </div>

               <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                 {doctor.name}
               </h2>
               <p className="text-primary font-medium mb-4 flex items-center gap-1 justify-center">
                 <Stethoscope size={16} />
                 {doctor.specialization || 'General Practitioner'}
               </p>

               {/* Contact Info Grid */}
               <div className="w-full space-y-3 text-left bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl">
                   <div className="flex items-center gap-3">
                       <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-primary"><Mail size={16} /></div>
                       <div className="flex-1 min-w-0">
                           <p className="text-xs text-gray-500">Email</p>
                           <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{doctor.email}</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-3">
                       <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-primary"><Phone size={16} /></div>
                       <div>
                           <p className="text-xs text-gray-500">Phone</p>
                           <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{doctor.phone || 'N/A'}</p>
                       </div>
                   </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-primary"><MapPin size={16} /></div>
                       <div>
                           <p className="text-xs text-gray-500">Location</p>
                           <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {typeof doctor.address === 'object' ? `${doctor.address.street || ''}, ${doctor.address.city || ''}` : (doctor.address || 'N/A')}
                           </p>
                       </div>
                   </div>
               </div>
             </div>
          </div>

          {/* Professional Details Card */}
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-lg shadow-primary/5'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Briefcase size={20} className="text-primary" />
              Professional Info
            </h3>
            <div className="space-y-4">
                 <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500">Hospital</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doctor.hospital || 'Private Practice'}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500">License No.</span>
                    <span className="font-mono font-medium text-primary">{doctor.medicalLicenseNumber || 'N/A'}</span>
                 </div>
                 <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">Joined</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(doctor.registrationDate)}</span>
                 </div>
            </div>
          </div>
          
           {/* Document Card - Identity Image */}
           <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-lg shadow-primary/5'}`}>
               <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
               <FileText size={20} className="text-primary" />
               Identity Document
               </h3>
               {doctor.identificationImage || doctor.imagePath ? (
                   <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                       <img 
                           src={`https://thyrocarex.runasp.net/${doctor.identificationImage || doctor.imagePath}`} 
                           alt="ID Document" 
                           className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                           onClick={() => window.open(`https://thyrocarex.runasp.net/${doctor.identificationImage || doctor.imagePath}`, '_blank')}
                       />
                   </div>
               ) : (
                   <div className="p-8 text-center rounded-xl border border-dashed border-gray-300">
                       <FileText size={48} className="mx-auto mb-2 text-gray-300" />
                       <p className="text-sm text-gray-500">No ID document uploaded</p>
                   </div>
               )}
           </div>

        </div>

        {/* Right Column: Bio & Stats */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Bio Section */}
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-lg shadow-primary/5'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Doctor</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {doctor.professionalBio || "No professional bio available."}
                </p>
            </div>

             {/* Recent Activity (Static Patient Data) */}
             <div>
                <h3 className={`text-xl font-bold mb-4 px-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Diagnoses</h3>
                <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-lg shadow-primary/5'}`}>
                  {patients.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {patients.map((patient) => (
                           <div key={patient.id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                               <div className="flex gap-4">
                                   <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                       <img src={patient.image} className="w-full h-full object-cover" alt="Scan" />
                                   </div>
                                   <div className="flex-1">
                                       <div className="flex justify-between mb-1">
                                           <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{patient.name}</h4>
                                           <span className={`text-xs font-bold px-2 py-1 rounded-lg ${patient.result === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                               {patient.result}
                                           </span>
                                       </div>
                                       <p className="text-sm text-gray-500 mb-2">{patient.notes}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><Calendar size={12}/> {patient.date}</span>
                                            <span className="flex items-center gap-1"><Activity size={12}/> {patient.confidence}% Confidence</span>
                                        </div>
                                   </div>
                               </div>
                           </div> 
                        ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">No recent diagnoses found.</div>
                  )}
                </div>
             </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
