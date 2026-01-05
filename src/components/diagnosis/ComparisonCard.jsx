import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import CountUp from 'react-countup';

const ComparisonCard = ({ 
  title, 
  oldValue, 
  newValue, 
  unit = '', 
  normalRange = '',
  icon: Icon,
  precision = 2 
}) => {
  // Calculate change
  const change = newValue - oldValue;
  const percentChange = oldValue !== 0 ? ((change / oldValue) * 100).toFixed(1) : 0;
  
  // Determine trend based on context (for thyroid, lower TSH moving to normal is good)
  const getTrend = () => {
    if (Math.abs(change) < 0.01) return 'stable';
    
    // Parse normal range
    const [min, max] = normalRange.split('-').map(Number);
    const wasNormal = oldValue >= min && oldValue <= max;
    const isNormal = newValue >= min && newValue <= max;
    
    if (!wasNormal && isNormal) return 'improving';
    if (wasNormal && !isNormal) return 'worsening';
    if (Math.abs(newValue - ((min + max) / 2)) < Math.abs(oldValue - ((min + max) / 2))) return 'improving';
    if (Math.abs(newValue - ((min + max) / 2)) > Math.abs(oldValue - ((min + max) / 2))) return 'worsening';
    return 'stable';
  };

  const trend = getTrend();

  const trendConfig = {
    improving: {
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: TrendingUp,
      label: 'Improving'
    },
    stable: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: Minus,
      label: 'Stable'
    },
    worsening: {
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
      icon: TrendingDown,
      label: 'Worsening'
    }
  };

  const config = trendConfig[trend];
  const TrendIcon = config.icon;

  // Check if current value is in normal range
  const [min, max] = normalRange.split('-').map(Number);
  const isInNormalRange = newValue >= min && newValue <= max;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className={`relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl border ${config.borderColor} p-6 transition-all duration-300`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-primary to-blue-600"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-xl bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${config.bgColor}`}>
          <TrendIcon className={`w-4 h-4 ${config.color}`} />
          <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>

      {/* Values Comparison */}
      <div className="relative grid grid-cols-2 gap-4 mb-4">
        {/* Old Value */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
          <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Previous</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
              {oldValue.toFixed(precision)}
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>

        {/* Arrow Indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`p-2 rounded-full ${config.bgColor} shadow-lg`}
          >
            <TrendIcon className={`w-4 h-4 ${config.color}`} />
          </motion.div>
        </div>

        {/* New Value */}
        <div className={`p-4 rounded-xl ${isInNormalRange ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${isInNormalRange ? 'text-green-600' : 'text-red-600'}`}>
              <CountUp end={newValue} decimals={precision} duration={1.5} />
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
      </div>

      {/* Change Indicator */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">Change:</span>
          <span className={`font-semibold ${change > 0 ? 'text-red-500' : change < 0 ? 'text-green-500' : 'text-yellow-500'}`}>
            {change > 0 ? '+' : ''}{change.toFixed(precision)} {unit}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            Math.abs(percentChange) > 20 ? 'bg-red-100 text-red-600' : 
            Math.abs(percentChange) > 10 ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            {percentChange > 0 ? '+' : ''}{percentChange}%
          </span>
        </div>
      </div>

      {/* Normal Range */}
      {normalRange && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            {!isInNormalRange && <AlertTriangle className="w-4 h-4 text-orange-500" />}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Normal Range: <span className="font-medium text-gray-700 dark:text-gray-300">{normalRange} {unit}</span>
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isInNormalRange ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
          }`}>
            {isInNormalRange ? 'Within Range' : 'Out of Range'}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ComparisonCard;
