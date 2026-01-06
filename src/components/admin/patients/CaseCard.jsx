import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, Trash2, Eye } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const CaseCard = ({ caseData, onView, onDelete }) => {
  const { isDarkMode } = useAdminTheme();

  const resultColors = {
    normal: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    abnormal: 'bg-red-500/10 text-red-500 border-red-500/20',
    uncertain: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-2xl border shadow-lg group transition-all duration-300
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border hover:border-primary/50' : 'bg-white border-gray-100 hover:border-primary/50'}`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img 
          src={caseData.image || 'https://via.placeholder.com/400x300?text=X-Ray'} 
          alt="X-Ray" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <p className="text-white font-bold truncate">{caseData.patientName}</p>
            <p className="text-gray-300 text-xs flex items-center gap-1">
              <User size={10} /> Dr. {caseData.doctorName}
            </p>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
            ${caseData.result === 'Normal' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
            {caseData.result}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Calendar size={12} /> {caseData.date}
          </span>
          <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            ID: #{caseData.id}
          </span>
        </div>

        <p className={`text-sm line-clamp-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {caseData.notes || 'No additional notes provided by the doctor.'}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={() => onView(caseData)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
              ${isDarkMode ? 'bg-primary hover:bg-primaryHover text-white' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
          >
            <Eye size={16} /> View Details
          </button>
          <button 
            onClick={() => onDelete(caseData.id)}
            className={`p-2 rounded-lg transition-colors
              ${isDarkMode ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;
