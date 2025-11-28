import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, FileText, Trash2, Download, Share2, Activity } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const CaseDetails = ({ caseData, isOpen, onClose, onDelete }) => {
  const { isDarkMode } = useAdminTheme();

  if (!isOpen || !caseData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]
            ${isDarkMode ? 'bg-admin-dark-card text-white' : 'bg-white text-gray-800'}`}
        >
          {/* Image Section (Left/Top) */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative group">
            <img 
              src={caseData.image || 'https://via.placeholder.com/600x800?text=X-Ray'} 
              alt="X-Ray Full" 
              className="max-h-[50vh] md:max-h-full max-w-full object-contain"
            />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70">
                <Download size={20} />
              </button>
              <button className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Details Section (Right/Bottom) */}
          <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{caseData.patientName}</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Case ID: #{caseData.id}
                </p>
              </div>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* AI Result */}
              <div className={`p-4 rounded-xl border ${caseData.result === 'Normal' 
                ? 'bg-emerald-500/10 border-emerald-500/20' 
                : 'bg-red-500/10 border-red-500/20'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2
                  ${caseData.result === 'Normal' ? 'text-emerald-500' : 'text-red-500'}`}>
                  <Activity size={16} /> AI Analysis Result
                </h3>
                <div className="flex justify-between items-end">
                  <span className={`text-3xl font-bold ${caseData.result === 'Normal' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {caseData.result}
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Confidence: <span className="text-blue-500 font-bold">{caseData.confidence}%</span>
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Attending Doctor</label>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500" />
                    <span className="font-medium text-sm">Dr. {caseData.doctorName}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <label className="text-xs text-gray-500 block mb-1">Date & Time</label>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-500" />
                    <span className="font-medium text-sm">{caseData.date}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FileText size={16} /> Doctor's Notes
                </h3>
                <p className={`text-sm leading-relaxed p-4 rounded-xl border
                  ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                  {caseData.notes || 'No notes recorded for this case.'}
                </p>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <button 
                onClick={() => onDelete(caseData.id)}
                className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Case
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaseDetails;
