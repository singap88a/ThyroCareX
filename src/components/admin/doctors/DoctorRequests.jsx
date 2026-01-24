import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

const DoctorRequests = () => {
  const { isDarkMode } = useAdminTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, type: null, requestId: null, requestName: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = async () => {
     try {
       setLoading(true);
       const response = await adminService.getPendingDoctors();
       if (response && response.succeeded && Array.isArray(response.data)) {
         setRequests(response.data);
       } else if (Array.isArray(response)) {
         setRequests(response);
       } else if (response.data && Array.isArray(response.data)) {
          setRequests(response.data);
       } else {
         console.warn("Unexpected pending doctors format", response);
         setRequests([]);
       }
     } catch (error) {
       console.error("Failed to fetch pending requests", error);
       toast.error("Failed to fetch requests");
     } finally {
       setLoading(false);
     }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredRequests = requests.filter(request => {
    const name = request.fullName || "";
    const email = request.email || "";
    const phone = request.phoneNumber || "";
    const status = request.status || "pending"; 

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const initiateAction = (type, request, e) => {
    if (e) e.stopPropagation();
    setConfirmationModal({
      isOpen: true,
      type,
      requestId: request.doctorID || request.id,
      requestName: request.fullName
    });
  };

  const confirmAction = async () => {
    const { type, requestId } = confirmationModal;
    if (!type || !requestId) return;

    setActionLoading(true);
    try {
        if (type === 'approve') {
            await adminService.approveDoctor(requestId);
            toast.success("Doctor approved successfully");
        } else {
            await adminService.rejectDoctor(requestId);
            toast.success("Doctor rejected");
        }
        setRequests(prev => prev.filter(r => (r.doctorID || r.id) !== requestId));
        if (selectedRequest && (selectedRequest.doctorID === requestId || selectedRequest.id === requestId)) {
            setSelectedRequest(null);
        }
        setConfirmationModal({ isOpen: false, type: null, requestId: null, requestName: '' });
    } catch (error) {
        console.error(`${type} failed`, error);
        toast.error(`Failed to ${type} doctor`);
    } finally {
        setActionLoading(false);
    }
  };

  const closeConfirmation = () => {
      setConfirmationModal({ isOpen: false, type: null, requestId: null, requestName: '' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="mt-4 text-center text-sm font-medium text-gray-500">Loading Requests...</div>
        </div>
      </div>
    );
  }

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
            key={request.doctorID || request.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`relative p-5 rounded-2xl border shadow-lg transition-all duration-300 cursor-pointer group
              ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border hover:border-blue-500/50' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-xl'}`}
            onClick={() => handleViewRequest(request)}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
               <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Clock size={12} /> Pending
               </span>
            </div>

            {/* Doctor Info */}
            <div className="mb-4">
              <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900 group-hover:text-primary transition-colors'}`}>
                {request.fullName}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {request.email}
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {request.phoneNumber}
              </p>
            </div>

            {/* Details */}
            <div className={`space-y-2 mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Specialization:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{request.specialization || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Gender:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.gender === 1 ? 'Male' : request.gender === 2 ? 'Female' : 'Others'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>City:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {request.address || request.city || 'N/A'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => initiateAction('approve', request, e)}
                  className="flex-1 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={(e) => initiateAction('reject', request, e)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <XCircle size={16} /> Reject
                </button>
            </div>

            {/* View Details Text */}
            <div className="mt-4">
                <button
                    onClick={(e) => {
                         e.stopPropagation();
                         handleViewRequest(request);
                    }}
                    className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
                        ${isDarkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-primary border border-gray-100'
                        }`}
                >
                    <Eye size={16} />
                    View Full Details
                </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            No requests found.
          </p>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedRequest && !confirmationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${isDarkMode ? 'bg-admin-dark-card border border-admin-dark-border' : 'bg-white'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-start sticky top-0 bg-inherit z-10 border-gray-100 dark:border-gray-700">
                <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.fullName}</h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Registration Request</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <XCircle size={24} className="text-gray-400" />
                </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Personal Info</h3>
                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} space-y-3`}>
                            <div>
                                <label className="text-xs text-gray-500">Email</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.email}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Phone</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.phoneNumber}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Gender</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {selectedRequest.gender === 1 ? 'Male' : selectedRequest.gender === 2 ? 'Female' : 'Other'}
                                </p>
                            </div>
                             <div>
                                <label className="text-xs text-gray-500">Date of Birth</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                     {selectedRequest.dateofBirth ? new Date(selectedRequest.dateofBirth).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Registration Date</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                     {selectedRequest.registrationAt ? new Date(selectedRequest.registrationAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="space-y-4">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Professional Info</h3>
                         <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} space-y-3`}>
                            <div>
                                <label className="text-xs text-gray-500">Specialization</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.specialization || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Medical License Number</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.medicalLicenseNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Address</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {selectedRequest.address ? `${selectedRequest.address}` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Hospital/Clinic</label>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.hospital || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Identity Image */}
                {selectedRequest.imagePath && (
                    <div>
                         <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Identity Document</h3>
                         <div className="border rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 flex justify-center p-4">
                             <img 
                                src={`https://thyrocarex.runasp.net/${selectedRequest.imagePath}`} 
                                alt="Identity" 
                                className="max-w-full h-auto max-h-64 object-contain rounded"
                                onError={(e) => {e.target.style.display='none'}}
                             />
                         </div>
                    </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 sticky bottom-0 bg-inherit rounded-b-2xl">
                <button onClick={closeModal} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                    Close
                </button>
                <button 
                    onClick={(e) => initiateAction('reject', selectedRequest, e)}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                >
                    Reject
                </button>
                <button 
                    onClick={(e) => initiateAction('approve', selectedRequest, e)}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primaryHover transition-colors shadow-lg shadow-blue-500/20"
                >
                    Approve
                </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmationModal.isOpen && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-admin-dark-card border border-admin-dark-border' : 'bg-white'}`}
             >
                 <div className="flex flex-col items-center text-center">
                     <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${confirmationModal.type === 'approve' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                         {confirmationModal.type === 'approve' ? <CheckCircle size={32} /> : <XCircle size={32} />}
                     </div>
                     <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                         {confirmationModal.type === 'approve' ? 'Approve Request?' : 'Reject Request?'}
                     </h3>
                     <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                         Are you sure you want to {confirmationModal.type} the registration request for <span className="font-semibold">{confirmationModal.requestName}</span>?
                     </p>
                     
                     <div className="flex gap-3 w-full">
                         <button 
                             onClick={closeConfirmation}
                             disabled={actionLoading}
                             className={`flex-1 py-3 rounded-xl font-medium border transition-colors ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                         >
                             Cancel
                         </button>
                         <button 
                             onClick={confirmAction}
                             disabled={actionLoading}
                             className={`flex-1 py-3 rounded-xl font-medium text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2
                                 ${confirmationModal.type === 'approve' 
                                     ? 'bg-primary hover:bg-primaryHover shadow-blue-500/20' 
                                     : 'bg-red-600 hover:bg-red-700 shadow-red-500/20'}`}
                         >
                             {actionLoading ? (
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             ) : (
                                 <>Yes, {confirmationModal.type === 'approve' ? 'Approve' : 'Reject'}</>
                             )}
                         </button>
                     </div>
                 </div>
             </motion.div>
         </div>
      )}
    </div>
  );
};

export default DoctorRequests;
