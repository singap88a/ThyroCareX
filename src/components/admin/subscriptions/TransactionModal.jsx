import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, CreditCard, Ban, CheckCircle } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const TransactionModal = ({ isOpen, onClose, transaction, onCancel }) => {
  const { isDarkMode } = useAdminTheme();

  if (!isOpen || !transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'
          } border`}
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-[#4695a5]/10 to-transparent">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Subscription Details
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Status Badge */}
            <div className={`p-4 rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-gray-800/50' : 'bg-slate-50'}`}>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                  {transaction.status === 'paid' ? (
                    <span className="flex items-center gap-1 text-emerald-500 font-bold uppercase tracking-wider text-sm">
                      <CheckCircle size={16} /> Active
                    </span>
                  ) : transaction.status === 'failed' ? (
                    <span className="text-red-500 font-bold uppercase tracking-wider text-sm">Failed / Ended</span>
                  ) : (
                    <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Pending</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ${transaction.amount}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'bg-white border-gray-200'}`}>
              <User size={16} className="text-[#4695a5] mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doctor</p>
                <p className={`font-bold mt-1 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{transaction.doctor}</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{transaction.doctorEmail}</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'bg-white border-gray-200'}`}>
              <CreditCard size={16} className="text-[#4695a5] mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan</p>
                <p className={`font-bold mt-1 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{transaction.plan}</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Invoice: {transaction.id}</p>
              </div>

              <div className={`col-span-2 p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'bg-white border-gray-200'} flex items-center justify-between`}>
                <div>
                  <Calendar size={16} className="text-[#4695a5] mb-2" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</p>
                  <p className={`font-bold mt-1 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated End Date</p>
                  <p className={`font-bold mt-1 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{transaction.endDate}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Close
              </button>
              {transaction.status === 'paid' && (
                <button
                  onClick={() => onCancel(transaction.originalId)}
                  className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Ban size={16} /> Cancel Subscription
                </button>
              )}
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionModal;
