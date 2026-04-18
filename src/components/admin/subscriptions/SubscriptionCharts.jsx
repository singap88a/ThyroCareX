import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const SubscriptionCharts = ({ transactions, plans }) => {
  const { isDarkMode } = useAdminTheme();

  // 1. Process Revenue Trend Data (Last 7 Days)
  const revenueData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('en-GB');
    }).reverse();

    const stats = last7Days.map(dateStr => {
      const total = transactions
        .filter(tx => tx.date === dateStr && tx.status === 'paid')
        .reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
      
      return {
        name: dateStr.split('/')[0] + '/' + dateStr.split('/')[1], // Short date
        revenue: total
      };
    });

    return stats;
  }, [transactions]);

  // 2. Process Plan Distribution Data
  const distributionData = useMemo(() => {
    return plans.map(p => ({
      name: p.name,
      value: p.subscribersCount || 0
    })).filter(p => p.value > 0);
  }, [plans]);

  const COLORS = ['#4695a5', '#00B4D8', '#6366f1', '#f59e0b'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl shadow-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
          <p className="font-bold mb-1 text-xs uppercase tracking-wider opacity-60">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-black text-[#4695a5]">
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Revenue Trend Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`lg:col-span-8 p-6 rounded-[2rem] border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-sm'}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Revenue Velocity</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Last 7 Days</span>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4695a5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4695a5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#f1f5f9'} vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'} 
                tick={{ fontSize: 10, fontWeight: 700 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'} 
                tick={{ fontSize: 10, fontWeight: 700 }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="#4695a5" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorRev)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Plan Distribution Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`lg:col-span-4 p-6 rounded-[2rem] border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-sm'}`}
      >
        <h3 className={`text-lg font-black mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Plan Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                animationBegin={200}
                animationDuration={1200}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionCharts;
