import React, { useState } from 'react';
import { Search, Filter, Plus, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorCard from './DoctorCard';
import DoctorDetails from './DoctorDetails';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock Data
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah@example.com', country: 'USA', status: 'active', subscription: 'Pro', credits: 45, diagnosesCount: 128, phone: '+1 234 567 890' },
    { id: 2, name: 'Dr. Ahmed Ali', email: 'ahmed@example.com', country: 'Egypt', status: 'active', subscription: 'Free', credits: 2, diagnosesCount: 15, phone: '+20 100 123 4567' },
    { id: 3, name: 'Dr. John Doe', email: 'john@example.com', country: 'UK', status: 'suspended', subscription: 'Enterprise', credits: 100, diagnosesCount: 450, phone: '+44 20 1234 5678' },
    { id: 4, name: 'Dr. Emily Chen', email: 'emily@example.com', country: 'Canada', status: 'active', subscription: 'Pro', credits: 30, diagnosesCount: 89, phone: '+1 416 123 4567' },
    { id: 5, name: 'Dr. Michael Brown', email: 'michael@example.com', country: 'Australia', status: 'pending', subscription: 'Free', credits: 5, diagnosesCount: 0, phone: '+61 2 1234 5678' },
  ]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailsOpen(true);
  };

  const handleToggleStatus = (doctor) => {
    const newStatus = doctor.status === 'active' ? 'suspended' : 'active';
    setDoctors(doctors.map(d => d.id === doctor.id ? { ...d, status: newStatus } : d));
  };

  const handleSaveDetails = (updatedDoctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
    setIsDetailsOpen(false);
  };

  const handleResetCredits = (doctorId) => {
    setDoctors(doctors.map(d => d.id === doctorId ? { ...d, credits: 5 } : d)); // Reset to default 5
    // You might want to show a toast notification here
  };

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
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <Plus size={18} /> Add Doctor
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border
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
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredDoctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onEdit={handleEdit} 
              onToggleStatus={handleToggleStatus} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No doctors found matching your criteria.</p>
        </div>
      )}

      {/* Details Modal */}
      <DoctorDetails 
        doctor={selectedDoctor} 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        onSave={handleSaveDetails}
        onResetCredits={handleResetCredits}
      />
    </div>
  );
};

export default DoctorsManager;
