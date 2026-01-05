import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const ProgressIndicator = ({ 
  progress = 0, // -100 to 100 (negative = worsening, positive = improving)
  size = 'lg', // sm, md, lg, xl
  showLabel = true,
  showIcon = true,
  animated = true
}) => {
  // Normalize progress to 0-100 for display
  const displayProgress = Math.min(100, Math.max(0, (progress + 100) / 2));
  
  // Determine status
  const getStatus = () => {
    if (progress >= 30) return 'excellent';
    if (progress >= 10) return 'improving';
    if (progress >= -10) return 'stable';
    if (progress >= -30) return 'concerning';
    return 'critical';
  };

  const status = getStatus();

  const statusConfig = {
    excellent: {
      color: '#10b981',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600',
      icon: CheckCircle,
      label: 'Excellent Progress',
      emoji: '🎉'
    },
    improving: {
      color: '#22c55e',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-500',
      icon: TrendingUp,
      label: 'Improving',
      emoji: '📈'
    },
    stable: {
      color: '#eab308',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-600',
      icon: Minus,
      label: 'Stable',
      emoji: '➡️'
    },
    concerning: {
      color: '#f97316',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-600',
      icon: AlertCircle,
      label: 'Needs Attention',
      emoji: '⚠️'
    },
    critical: {
      color: '#ef4444',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600',
      icon: XCircle,
      label: 'Critical',
      emoji: '🚨'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const sizeConfig = {
    sm: { width: 80, stroke: 6, fontSize: 'text-lg', iconSize: 'w-4 h-4' },
    md: { width: 120, stroke: 8, fontSize: 'text-2xl', iconSize: 'w-5 h-5' },
    lg: { width: 160, stroke: 10, fontSize: 'text-3xl', iconSize: 'w-6 h-6' },
    xl: { width: 200, stroke: 12, fontSize: 'text-4xl', iconSize: 'w-8 h-8' }
  };

  const { width, stroke, fontSize, iconSize } = sizeConfig[size];
  const radius = (width - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular Progress */}
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: animated ? offset : circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Inner content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showIcon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <StatusIcon className={`${iconSize} ${config.textColor} mb-1`} />
            </motion.div>
          )}
          <motion.span 
            className={`font-bold ${fontSize} ${config.textColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress > 0 ? '+' : ''}{progress}%
          </motion.span>
        </div>

        {/* Decorative ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${config.color}20 0deg, transparent ${displayProgress * 3.6}deg)`
          }}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: -90 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.bgColor}`}
        >
          <span className="text-xl">{config.emoji}</span>
          <span className={`font-semibold ${config.textColor}`}>{config.label}</span>
        </motion.div>
      )}
    </div>
  );
};

// Progress Bar Variant
export const ProgressBar = ({ 
  progress = 0, 
  height = 'h-3',
  showValue = true,
  label = ''
}) => {
  const displayProgress = Math.min(100, Math.max(0, (progress + 100) / 2));
  
  const getColor = () => {
    if (progress >= 10) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (progress >= -10) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showValue && (
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {progress > 0 ? '+' : ''}{progress}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${height} bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${getColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Mini Progress Indicator
export const MiniProgressIndicator = ({ progress = 0 }) => {
  const getConfig = () => {
    if (progress >= 10) return { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100' };
    if (progress >= -10) return { icon: Minus, color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-100' };
  };

  const { icon: Icon, color, bg } = getConfig();

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${bg}`}>
      <Icon className={`w-3 h-3 ${color}`} />
      <span className={`text-xs font-semibold ${color}`}>
        {progress > 0 ? '+' : ''}{progress}%
      </span>
    </div>
  );
};

export default ProgressIndicator;
