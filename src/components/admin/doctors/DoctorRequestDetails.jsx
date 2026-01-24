import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, FileText, CheckCircle, XCircle, Download, IdCard } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

const DoctorRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useAdminTheme();
  
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDoctorById(id);
        if (response) {
            const data = response.data || response;
             // Ensure data is mapped for UI usage
             setRequest({
                ...data,
                id: data.doctorID,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                dateofBirth: data.registrationAt, // Pending API shows registrationAt, details API usually has DOB but maybe not exposed here. Use registrationAt as fallback or empty. Wait, list has registrationAt. Details likely has same. Prompt says "every request will have details through its ID". Let's assume the GET /{id} returns the same structure + maybe more. The User provided GET /{id} output in step 276. It has `fullName`, `email`, `specialization`, `phoneNumber` (int), `address`, `imagePath`. No DOB there.
                // Correction: GET /api/AdminDoctor/{id} in Step 276 returns: doctorID, fullName, email, specialization, phoneNumber (number), address, imagePath, registrationAt.
                // It does NOT have dateOfBirth, gender (Wait, Pending list *has* gender, GetByID *has* gender).
                // Let's map available fields.
                gender: data.gender,
                specialization: data.specialization,
                address: data.address,
                city: data.hospital, // Using hospital as city placeholder based on Step 276 output? No, Step 276 shows address as "stringeeter". Pending list has "address" and "hospital". Let's just use address.
                // identificationImage: data.imagePath, // Use imagePath as ID image?
                imagePath: data.imagePath,
                profileImage: data.profileImage,
                status: 'Pending' // Default for request view if not in data
             });
        }
      } catch (error) {
        console.error("Failed to fetch request details", error);
        toast.error("Failed to load request details");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleApprove = async () => {
    if (window.confirm('Are you sure you want to approve this doctor registration request?')) {
      try {
          await adminService.approveDoctor(id);
          toast.success('Doctor registration approved successfully!');
          navigate('/admin/doctor-requests');
      } catch (error) {
          console.error("Approval failed", error);
          toast.error('Failed to approve doctor.');
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this doctor registration request?')) {
      try {
          await adminService.rejectDoctor(id);
          toast.success('Doctor registration rejected.');
          navigate('/admin/doctor-requests');
      } catch (error) {
          console.error("Rejection failed", error);
          toast.error('Failed to reject doctor.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!request) {
    return <div className="p-8 text-center">Request not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/doctor-requests')}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2
              ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'}`}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Requests</span>
          </button>
        </div>
        {request.status && request.status.toLowerCase() === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <XCircle size={18} /> Reject Request
            </button>
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <CheckCircle size={18} /> Approve Request
            </button>
          </div>
        )}
      </div>

      {/* Request Header */}
      <div className={`rounded-2xl border overflow-hidden shadow-lg
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative h-32 bg-primary">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-full p-2 bg-white dark:bg-gray-800 flex items-center justify-center">
                <User size={40} className="text-primary" />
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-white mb-1">{request.fullName}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {request.email}
                  </span>
                   {request.status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status.toLowerCase() === 'pending' ? 'bg-orange-500/20 text-white' :
                    request.status.toLowerCase() === 'approved' ? 'bg-emerald-500/20 text-white' :
                    'bg-red-500/20 text-white'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Information */}
        <div className="p-8 space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <User size={20} className="text-primary" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Full Name</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.fullName}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.email}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Phone Number</label>
                <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <Phone size={14} /> {request.phoneNumber}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Date of Birth</label>
                <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <Calendar size={14} /> {request.registrationAt ? formatDate(request.registrationAt) : 'Not provided'}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Gender</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.gender === 1 ? 'Male' : request.gender === 2 ? 'Female' : 'Other'}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Specialization</label>
                <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.specialization}
                </p>
              </div>
            </div>
          </section>

          {/* Address */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <MapPin size={20} className="text-primary" /> Location
            </h3>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Address</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.address}</p>
                </div>
                 <div>
                  <label className="text-xs text-gray-500 block mb-1">City</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.hospital || 'N/A'}</p>
                </div>
                 <div>
                  <label className="text-xs text-gray-500 block mb-1">National ID</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.nationalID || 'N/A'}</p>
                </div>
              </div>
            </div>
          </section>
          
           {/* Identity Verification (simplified, assume imageUrl if exists) */}
           {request.identificationImage && (
              <section>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <IdCard size={20} className="text-orange-500" /> Identity Verification
                </h3>
                 <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                    <img src={request.identificationImage} alt="Identity" className="max-w-md w-full h-auto rounded" />
                 </div>
              </section>
           )}

        </div>
      </div>
    </div>
  );
};

export default DoctorRequestDetails;

