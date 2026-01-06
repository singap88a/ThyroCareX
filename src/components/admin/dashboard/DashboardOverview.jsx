import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Activity, 
  CreditCard, 
  HardDrive, 
  Brain,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import ChartSection from './ChartSection';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DashboardOverview = () => {
  const { isDarkMode } = useAdminTheme();

  const stats = [
    { title: 'Total Doctors', value: '1,248', icon: Users, trend: 'up', trendValue: '12%', color: 'blue' },
    { title: 'Total Patients', value: '8,542', icon: Users, trend: 'up', trendValue: '8%', color: 'purple' },
    { title: 'Total Diagnoses', value: '24.5k', icon: Stethoscope, trend: 'up', trendValue: '24%', color: 'green' },
    { title: 'Active Subs', value: '892', icon: CreditCard, trend: 'down', trendValue: '2%', color: 'orange' },
    { title: 'Storage Used', value: '458 GB', icon: HardDrive, trend: 'up', trendValue: '15%', color: 'red' },
    { title: 'AI Accuracy', value: '94.2%', icon: Brain, trend: 'up', trendValue: '0.5%', color: 'blue' },
  ];

  const recentActivity = [
    { user: 'Dr. Sarah Smith', action: 'Diagnosed a patient', time: '2 mins ago', type: 'diagnosis' },
    { user: 'Dr. John Doe', action: 'Upgraded to Pro Plan', time: '15 mins ago', type: 'subscription' },
    { user: 'System', action: 'AI Model v2.1 Deployed', time: '1 hour ago', type: 'system' },
    { user: 'Dr. Emily Chen', action: 'Uploaded 5 X-Rays', time: '2 hours ago', type: 'upload' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard Overview
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/30">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Section */}
      <ChartSection />

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`lg:col-span-2 p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h3>
            <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                    ${activity.type === 'diagnosis' ? 'bg-green-500' : 
                      activity.type === 'subscription' ? 'bg-purple-500' : 
                      activity.type === 'system' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{activity.user}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.action}</p>
                  </div>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-purple-700 border-transparent' : 'bg-white border-gray-100'}`}
        >
          <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h3>
          <div className="space-y-3">
            <button className={`w-full p-3 rounded-xl flex items-center justify-between transition-all
              ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
              <span className="font-medium">Add New Doctor</span>
              <ArrowRight size={18} />
            </button>
            <button className={`w-full p-3 rounded-xl flex items-center justify-between transition-all
              ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
              <span className="font-medium">Create Announcement</span>
              <ArrowRight size={18} />
            </button>
            <button className={`w-full p-3 rounded-xl flex items-center justify-between transition-all
              ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
              <span className="font-medium">Update AI Model</span>
              <ArrowRight size={18} />
            </button>
            <button className={`w-full p-3 rounded-xl flex items-center justify-between transition-all
              ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
              <span className="font-medium">View System Logs</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
