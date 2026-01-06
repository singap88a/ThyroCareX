import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, FileText, CheckCircle, XCircle, Download, IdCard } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useAdminTheme();

  // Mock data - in real app, fetch by id
  const [request] = useState({
    id: parseInt(id) || 1,
    fullName: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+20 100 123 4567',
    dateOfBirth: '1988-03-15',
    gender: 'male',
    country: 'Egypt',
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00',
    identityType: 'doctorCard',
    identityFile: {
      name: 'doctor_card_ahmed_hassan.pdf',
      url: '#',
      type: 'application/pdf'
    },
    address: {
      street: '123 Medical Street',
      city: 'Cairo',
      state: 'Cairo',
      zipCode: '11511'
    },
    medicalHistory: {
      thyroidIssues: false,
      diabetes: false,
      heartDisease: false,
      cancer: false,
      allergies: false,
      medications: false
    },
    termsAccepted: true,
    newsletterSubscribed: false
  });

  const handleApprove = () => {
    if (window.confirm('Are you sure you want to approve this doctor registration request?')) {
      // In real app, make API call here
      alert('Doctor registration approved successfully!');
      navigate('/admin/doctor-requests');
    }
  };

  const handleReject = () => {
    if (window.confirm('Are you sure you want to reject this doctor registration request?')) {
      // In real app, make API call here
      alert('Doctor registration rejected.');
      navigate('/admin/doctor-requests');
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
        {request.status === 'pending' && (
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
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' ? 'bg-orange-500/20 text-white' :
                    request.status === 'approved' ? 'bg-emerald-500/20 text-white' :
                    'bg-red-500/20 text-white'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
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
                  <Phone size={14} /> {request.phone}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Date of Birth</label>
                <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <Calendar size={14} /> {request.dateOfBirth}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Gender</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.gender.charAt(0).toUpperCase() + request.gender.slice(1)}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Country</label>
                <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <MapPin size={14} /> {request.country}
                </p>
              </div>
            </div>
          </section>

          {/* Address */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <MapPin size={20} className="text-primary" /> Address
            </h3>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Street Address</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.address.street}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">City</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.address.city}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">State/Province</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.address.state}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Zip/Postal Code</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.address.zipCode}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Medical History */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <FileText size={20} className="text-primary" /> Medical History
            </h3>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(request.medicalHistory).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value ? 'bg-primary' : 'bg-gray-300'}`}></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Identity Verification */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <IdCard size={20} className="text-orange-500" /> Identity Verification
            </h3>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Identity Type</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {request.identityType === 'nationalId' ? 'National ID' :
                     request.identityType === 'passport' ? 'Passport' :
                     'Doctor ID Card'}
                  </p>
                </div>
                {request.identityFile && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Identity Document</label>
                    <a
                      href={request.identityFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                        ${isDarkMode ? 'bg-primary hover:bg-primaryHover text-white' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
                    >
                      <Download size={16} /> {request.identityFile.name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Submission Details */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <Calendar size={20} className="text-indigo-500" /> Submission Details
            </h3>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Submitted At</label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {formatDate(request.submittedAt)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Terms Accepted</label>
                  <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {request.termsAccepted ? (
                      <>
                        <CheckCircle size={16} className="text-primary" /> Yes
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-red-500" /> No
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorRequestDetails;

