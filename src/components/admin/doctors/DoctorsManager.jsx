import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Download, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorCard from './DoctorCard';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

const DoctorsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, doctorId: null, doctorName: '' });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAllDoctors();
        if (Array.isArray(response)) {
          setDoctors(response);
        } else if (response.data && Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
            console.warn("Unexpected doctors data", response);
            setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredDoctors = doctors.filter(doctor => {
    const name = doctor.fullName || "";
    const email = doctor.email || "";
    const status = doctor.status || "active"; // Default

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (doctor) => {
    navigate(`/admin/doctors/${doctor.id}`);
  };

  const handleToggleStatus = (doctor) => {
    // Implement toggle status API if available, likely not in provided service snippet
    // For now just console log
    console.log("Toggle status for", doctor.id);
    toast("Status toggle coming soon!", { icon: '🚧' });
  };
 
  const confirmDelete = (doctor) => {
      setDeleteModal({ isOpen: true, doctorId: doctor.doctorID, doctorName: doctor.fullName });
  };

  const handleDelete = async () => {
      if (!deleteModal.doctorId) return;
      setDeleteLoading(true);
      try {
          await adminService.deleteDoctor(deleteModal.doctorId);
          setDoctors(prev => prev.filter(d => d.doctorID !== deleteModal.doctorId));
          toast.success("Doctor deleted successfully");
          setDeleteModal({ isOpen: false, doctorId: null, doctorName: '' });
      } catch (error) {
          console.error("Delete failed", error);
          toast.error("Failed to delete doctor");
      } finally {
          setDeleteLoading(false);
      }
  };
 
  // Map backend object to DoctorCard props
  const mapDoctorToCard = (doc) => ({
      ...doc,
      id: doc.doctorID,
      name: doc.fullName || "Doctor",
      status: "active", // Default to active since backend doesn't seem to return status
      phone: doc.phoneNumber,
      // Keep original backend fields that DoctorCard now uses
      email: doc.email,
      address: doc.address,
      hospital: doc.hospital,
      specialization: doc.specialization,
      gender: doc.gender,
      profileImage: doc.profileImage,
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Doctors Management
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage registered doctors, subscriptions, and account status.
          </p>
        </div>
    
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="mt-4 text-center text-sm font-medium text-gray-500">Loading Doctors...</div>
            </div>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
            {filteredDoctors.map(doctor => (
                <DoctorCard 
                key={doctor.id} 
                doctor={mapDoctorToCard(doctor)} 
                onEdit={handleEdit} 
                onToggleStatus={handleToggleStatus} 
                onDelete={confirmDelete}
                />
            ))}
            </AnimatePresence>
        </motion.div>
      )}

      {!loading && filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No doctors found matching your criteria.</p>
        </div>
      )}
      {!loading && filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No doctors found matching your criteria.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-admin-dark-card border border-admin-dark-border' : 'bg-white'}`}
             >
                 <div className="flex flex-col items-center text-center">
                     <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100 text-red-600">
                         <AlertTriangle size={32} />
                     </div>
                     <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                         Delete Doctor?
                     </h3>
                     <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                         Are you sure you want to permanently delete <span className="font-semibold text-red-500">{deleteModal.doctorName}</span>? This action cannot be undone.
                     </p>
                     
                     <div className="flex gap-3 w-full">
                         <button 
                             onClick={() => setDeleteModal({ isOpen: false, doctorId: null, doctorName: '' })}
                             disabled={deleteLoading}
                             className={`flex-1 py-3 rounded-xl font-medium border transition-colors ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                         >
                             Cancel
                         </button>
                         <button 
                             onClick={handleDelete}
                             disabled={deleteLoading}
                             className="flex-1 py-3 rounded-xl font-medium text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 shadow-red-500/20"
                         >
                             {deleteLoading ? (
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             ) : (
                                 'Yes, Delete'
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

export default DoctorsManager;
