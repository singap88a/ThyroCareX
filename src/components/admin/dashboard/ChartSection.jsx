import React from 'react';
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
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const dataDiagnoses = [
  { name: 'Mon', cases: 40, ai: 24 },
  { name: 'Tue', cases: 30, ai: 13 },
  { name: 'Wed', cases: 20, ai: 58 },
  { name: 'Thu', cases: 27, ai: 39 },
  { name: 'Fri', cases: 18, ai: 48 },
  { name: 'Sat', cases: 23, ai: 38 },
  { name: 'Sun', cases: 34, ai: 43 },
];

const dataSubscriptions = [
  { name: 'Free', value: 400 },
  { name: 'Pro', value: 300 },
  { name: 'Enterprise', value: 300 },
  { name: 'Student', value: 200 },
];

const dataAI = [
  { name: 'Thyroid', accuracy: 92, usage: 85 },
  { name: 'Chest X-Ray', accuracy: 88, usage: 65 },
  { name: 'MRI', accuracy: 95, usage: 45 },
  { name: 'CT Scan', accuracy: 90, usage: 55 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

const ChartSection = () => {
  const { isDarkMode } = useAdminTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Diagnoses Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
      >
        <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Weekly Diagnoses</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataDiagnoses}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCases)" />
              <Area type="monotone" dataKey="ai" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAi)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Subscriptions Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
      >
        <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Subscription Distribution</h3>
        <div className="h-[300px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataSubscriptions}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
              >
                {dataSubscriptions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Performance Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`p-6 rounded-2xl shadow-lg border lg:col-span-2 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
      >
        <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>AI Model Performance</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataAI} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="usage" name="Usage %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ChartSection;
