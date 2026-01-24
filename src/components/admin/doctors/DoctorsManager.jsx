import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Download } from 'lucide-react';
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
 
  // Map backend object to DoctorCard props (if needed) or update DoctorCard to accept backend props
  // Assuming DoctorCard expects { name, email, ... } 
  // Backend returns { fullName, email, ... }
  // We can map it on the fly
  const mapDoctorToCard = (doc) => ({
      ...doc,
      id: doc.doctorID, // Crucial for navigation
      name: doc.fullName || "Doctor",
      status: doc.status || "Active", // Capitalize if needed, UI might expect lowercase
      country: doc.city || "N/A", // Using city as country placeholder if no country in backend
      subscription: "Standard", // Placeholder
      credits: 0, // Placeholder
      diagnosesCount: 0 // Placeholder
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
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Plus size={18} /> Add Doctor
          </button>
          <button 
            onClick={() => toast.success("Exporting doctor list...")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border
            ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Download size={18} /> Export
          </button>
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
    </div>
  );
};

export default DoctorsManager;
