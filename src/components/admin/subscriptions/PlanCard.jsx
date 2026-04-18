import React from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Users, Trash2 } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const PlanCard = ({ plan, onEdit, onDelete }) => {
  const { isDarkMode } = useAdminTheme();

  const color = '#4695a5';
  const bgMain = 'bg-[#4695a5]';
  const bgLight = 'bg-[#4695a5]/10';
  const textMain = 'text-[#4695a5]';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-2xl border shadow-lg overflow-hidden flex flex-col h-full
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
    >
      {/* Top Banner */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${bgMain}`} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
          {plan.description && (
            <p className={`text-xs mt-1 mb-2 font-medium line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              {plan.description}
            </p>
          )}
          <p className={`text-sm ${isDarkMode ? 'text-[#4695a5]' : 'text-[#4695a5]'} font-bold`}>
            {plan.subscribersCount || 0} Active Subscribers
          </p>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onEdit(plan)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(plan.id)}
            className={`p-2 rounded-lg transition-colors text-red-400 ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${plan.price}</span>
        <span className={`text-sm font-medium ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/ {plan.durationInDays} Days</span>
      </div>

      <div className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 p-0.5 rounded-full ${isDarkMode ? 'bg-slate-800 text-[#4695a5]' : 'bg-[#4695a5]/10 text-[#4695a5]'}`}>
              <Check size={12} />
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
          </div>
        ))}
      </div>

      <div className={`p-4 rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-gray-800/50' : 'bg-slate-50'}`}>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#4695a5]" />
          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Total Revenue</span>
        </div>
        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>${plan.totalRevenue?.toLocaleString() || 0}</span>
      </div>
    </motion.div>
  );
};

export default PlanCard;
