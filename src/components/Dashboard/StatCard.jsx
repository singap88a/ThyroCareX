import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendValue, 
  footer, 
  variant = 'primary',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate number counting
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const variantColors = {
    primary: 'from-[#4695a5] to-[#6366f1]',
    success: 'from-emerald-500 to-emerald-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-red-500 to-red-600'
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-7 relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-slate-900/50"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${variantColors[variant]} flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-semibold ${
            trend === 'up' 
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-none">
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        <div className="text-[15px] text-slate-600 dark:text-slate-400 font-medium">
          {label}
        </div>
      </div>

      {footer && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
