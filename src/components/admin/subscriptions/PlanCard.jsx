import React from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Users } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const PlanCard = ({ plan, onEdit }) => {
  const { isDarkMode } = useAdminTheme();

  const colors = {
    Free: 'blue',
    Pro: 'purple',
    Enterprise: 'emerald',
  };

  const color = colors[plan.name] || 'blue';

  const bgColors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-2xl border shadow-lg overflow-hidden flex flex-col h-full
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
    >
      {/* Top Banner */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${bgColors[color]}`} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {plan.subscribers} Active Subscribers
          </p>
        </div>
        <button 
          onClick={() => onEdit(plan)}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
        >
          <Edit size={18} />
        </button>
      </div>

      <div className="mb-6">
        <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${plan.price}</span>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
      </div>

      <div className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 p-0.5 rounded-full ${isDarkMode ? 'bg-gray-800 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <Check size={12} />
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
          </div>
        ))}
      </div>

      <div className={`p-4 rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-500" />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Revenue</span>
        </div>
        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${plan.revenue}</span>
      </div>
    </motion.div>
  );
};

export default PlanCard;
