import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MapPin, Calendar, CreditCard, Activity, Save, RotateCcw } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorDetails = ({ doctor, isOpen, onClose, onSave, onResetCredits }) => {
  const { isDarkMode } = useAdminTheme();

  if (!isOpen || !doctor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto
            ${isDarkMode ? 'bg-admin-dark-card text-white' : 'bg-white text-gray-800'}`}
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="absolute -bottom-12 left-8 flex items-end">
              <div className="w-24 h-24 rounded-full p-1 bg-white dark:bg-gray-800">
                <img 
                  src={doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.name}&background=random`} 
                  alt={doctor.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="mb-3 ml-4">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">{doctor.name}</h2>
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  <MapPin size={14} /> {doctor.country}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-16 px-8 pb-8 space-y-8">
            
            {/* Personal Info */}
            <section>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <Mail size={18} className="text-blue-500" /> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                  <p className="font-medium">{doctor.email}</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Phone Number</label>
                  <p className="font-medium">{doctor.phone || 'Not provided'}</p>
                </div>
              </div>
            </section>

            {/* Subscription & Credits */}
            <section>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <CreditCard size={18} className="text-purple-500" /> Subscription & Usage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Current Plan</label>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-purple-500">{doctor.subscription}</p>
                    <button className="text-xs text-blue-500 hover:underline">Change</button>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Credits Remaining</label>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-emerald-500">{doctor.credits}</p>
                    <button 
                      onClick={() => onResetCredits(doctor.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Reset Credits"
                    >
                      <RotateCcw size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Total Diagnoses</label>
                  <p className="font-bold">{doctor.diagnosesCount}</p>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={onClose}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                  ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Cancel
              </button>
              <button 
                onClick={() => onSave(doctor)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorDetails;
