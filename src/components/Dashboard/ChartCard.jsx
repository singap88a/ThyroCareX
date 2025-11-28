import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, children, actions }) => {
  return (
    <motion.div
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-7 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div className="relative h-[350px]">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
