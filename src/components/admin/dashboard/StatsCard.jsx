import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color, delay = 0 }) => {
  const { isDarkMode } = useAdminTheme();

  const colors = {
    blue: 'from-primary to-primary',
    purple: 'from-primary to-primary',
    green: 'from-primary to-primary',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const bgColors = {
    blue: 'bg-primary/10 text-primary',
    purple: 'bg-primary/10 text-primary',
    green: 'bg-primary/10 text-primary',
    orange: 'bg-orange-500/10 text-orange-500',
    red: 'bg-red-500/10 text-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg border backdrop-blur-sm group
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
    >
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${bgColors[color] || bgColors.blue}`}>
          <Icon size={24} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={`flex items-center text-sm font-medium
          ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trendValue}
        </span>
        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          vs last month
        </span>
      </div>

      {/* Background Gradient Effect */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br ${colors[color] || colors.blue} group-hover:opacity-20 transition-opacity duration-500`} />
    </motion.div>
  );
};

export default StatsCard;
