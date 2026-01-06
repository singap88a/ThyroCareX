import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, FileText, Trash2, Activity } from 'lucide-react';
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
          className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]
            ${isDarkMode ? 'bg-admin-dark-card text-white' : 'bg-white text-gray-800'}`}
        >
          {/* Details Section */}
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="mb-1 text-2xl font-bold">{caseData.patientName}</h2>
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
            <div className="flex-1 p-6 space-y-6">

              {/* AI Result */}
              <div className={`p-4 rounded-xl border ${caseData.result === 'Normal'
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-red-500/10 border-red-500/20'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2
                  ${caseData.result === 'Normal' ? 'text-emerald-500' : 'text-red-500'}`}>
                  <Activity size={16} /> AI Analysis Result
                </h3>
                <div className="flex items-end justify-between">
                  <span className={`text-3xl font-bold ${caseData.result === 'Normal' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {caseData.result}
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Confidence: <span className="font-bold text-primary">{caseData.confidence}%</span>
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <label className="block mb-1 text-xs text-gray-500">Attending Doctor</label>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-primary" />
                    <span className="text-sm font-medium">Dr. {caseData.doctorName}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <label className="block mb-1 text-xs text-gray-500">Date & Time</label>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-sm font-medium">{caseData.date}</span>
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
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => onDelete(caseData.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={16} /> Delete Case
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 font-medium text-white transition-colors bg-primary rounded-lg hover:bg-primaryHover"
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
