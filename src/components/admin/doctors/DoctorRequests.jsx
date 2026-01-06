import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorRequests = () => {
  const { isDarkMode } = useAdminTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - pending doctor registration requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      fullName: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      phone: '+20 100 123 4567',
      country: 'Egypt',
      dateOfBirth: '1988-03-15',
      gender: 'male',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00',
      identityType: 'doctorCard',
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
        allergies: false
      }
    },
    {
      id: 2,
      fullName: 'Dr. Fatima Al-Zahra',
      email: 'fatima.alzahra@example.com',
      phone: '+966 50 123 4567',
      country: 'Saudi Arabia',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      status: 'pending',
      submittedAt: '2024-01-14T14:20:00',
      identityType: 'nationalId',
      address: {
        street: '456 Health Avenue',
        city: 'Riyadh',
        state: 'Riyadh',
        zipCode: '12345'
      },
      medicalHistory: {
        thyroidIssues: true,
        diabetes: false,
        heartDisease: false,
        allergies: true
      }
    },
    {
      id: 3,
      fullName: 'Dr. Mohammed Ali',
      email: 'mohammed.ali@example.com',
      phone: '+971 50 987 6543',
      country: 'UAE',
      dateOfBirth: '1985-11-08',
      gender: 'male',
      status: 'pending',
      submittedAt: '2024-01-13T09:15:00',
      identityType: 'passport',
      address: {
        street: '789 Clinic Road',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '00000'
      },
      medicalHistory: {
        thyroidIssues: false,
        diabetes: false,
        heartDisease: false,
        allergies: false
      }
    },
  ]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewRequest = (requestId) => {
    navigate(`/admin/doctor-requests/${requestId}`);
  };

  const handleApprove = (requestId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to approve this doctor registration request?')) {
      setRequests(requests.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
    }
  };

  const handleReject = (requestId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to reject this doctor registration request?')) {
      setRequests(requests.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Doctor Registration Requests
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Review and approve new doctor registration requests.
        </p>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={20} className="text-gray-400" />
          <select 
            value={filterStatus}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-lg border outline-none cursor-pointer
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map(request => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`relative p-5 rounded-2xl border shadow-lg transition-all duration-300 cursor-pointer
              ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border hover:border-blue-500/50' : 'bg-white border-gray-100 hover:border-blue-200'}`}
            onClick={() => handleViewRequest(request.id)}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {request.status === 'pending' && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Clock size={12} /> Pending
                </span>
              )}
              {request.status === 'approved' && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle size={12} /> Approved
                </span>
              )}
              {request.status === 'rejected' && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                  <XCircle size={12} /> Rejected
                </span>
              )}
            </div>

            {/* Doctor Info */}
            <div className="mb-4">
              <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {request.fullName}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {request.email}
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {request.phone}
              </p>
            </div>

            {/* Details */}
            <div className={`space-y-2 mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Country:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.country}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Gender:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.gender.charAt(0).toUpperCase() + request.gender.slice(1)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Submitted:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {formatDate(request.submittedAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            {request.status === 'pending' && (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => handleApprove(request.id, e)}
                  className="flex-1 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={(e) => handleReject(request.id, e)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}

            {/* View Details Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewRequest(request.id);
              }}
              className={`w-full mt-2 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
                ${isDarkMode ? 'bg-primary hover:bg-primaryHover text-white' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
            >
              <Eye size={16} /> View Details
            </button>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            No requests found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorRequests;

