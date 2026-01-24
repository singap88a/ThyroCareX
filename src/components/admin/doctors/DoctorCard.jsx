import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Activity, MoreVertical, Shield, Ban, CheckCircle, Trash2, Stethoscope } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorCard = ({ doctor, onEdit, onToggleStatus, onDelete }) => {
  const { isDarkMode } = useAdminTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const statusColors = {
    active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    suspended: 'bg-red-500/10 text-red-500 border-red-500/20',
    pending: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
        className={`relative p-5 rounded-2xl border shadow-lg transition-all duration-300 group
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border hover:border-primary/50' : 'bg-white border-gray-100 hover:border-primary/50'}`}
    >
      {/* Header & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[doctor.status] || statusColors.active}`}>
          {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
        </div>
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <MoreVertical size={16} />
          </button>
          {/* Dropdown Menu */}
          {menuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-32 z-20">
                <div className={`rounded-xl shadow-xl border overflow-hidden p-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(doctor);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-colors
                    ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {doctor.status === 'active' ? <Ban size={12} /> : <CheckCircle size={12} />}
                    {doctor.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(doctor);
                        setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`}
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Info */}
      {/* Profile Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full p-1 bg-primary">
            <img 
              src={
                doctor.profileImage && doctor.profileImage !== 'default-doctor.png' 
                  ? (doctor.profileImage.startsWith('http') ? doctor.profileImage : `https://thyrocarex.runasp.net/${doctor.profileImage}`)
                  : `https://ui-avatars.com/api/?name=${doctor.name}&background=random`
              } 
              alt={doctor.name} 
              className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 text-white text-xs font-bold">
            ✓
          </div>
        </div>
        
        <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.name}</h3>
        <p className={`text-sm flex items-center gap-1 mb-1 text-primary font-medium`}>
          <Stethoscope size={12} /> {doctor.specialization || 'Doctor'}
        </p>
        <p className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Mail size={12} /> {doctor.email}
        </p>
        <p className={`text-xs flex items-center gap-1 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <MapPin size={12} /> {doctor.address || doctor.hospital || 'N/A'}
        </p>
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
          <p className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.phone || 'N/A'}</p>
        </div>
        <div className="text-center border-l border-gray-200 dark:border-gray-700">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</p>
          <p className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.gender === 1 ? 'Male' : doctor.gender === 2 ? 'Female' : 'N/A'}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onEdit(doctor)}
          className={`py-2 rounded-lg text-sm font-medium transition-colors
            ${isDarkMode ? 'bg-primary hover:bg-primaryHover text-white' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
        >
          View Details
        </button>
        <button 
          onClick={() => onToggleStatus(doctor)}
          className={`py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
            ${doctor.status === 'active' 
              ? (isDarkMode ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500' : 'bg-red-50 hover:bg-red-100 text-red-600')
              : (isDarkMode ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600')}`}
        >
          {doctor.status === 'active' ? <Ban size={14} /> : <CheckCircle size={14} />}
          {doctor.status === 'active' ? 'Suspend' : 'Activate'}
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
