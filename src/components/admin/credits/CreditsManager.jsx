import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, RefreshCw, Plus, Minus, Coins } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const CreditsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah@example.com', credits: 45, total: 50, plan: 'Pro' },
    { id: 2, name: 'Dr. Ahmed Ali', email: 'ahmed@example.com', credits: 1, total: 5, plan: 'Free' },
    { id: 3, name: 'Dr. John Doe', email: 'john@example.com', credits: 98, total: 100, plan: 'Enterprise' },
    { id: 4, name: 'Dr. Emily Chen', email: 'emily@example.com', credits: 2, total: 50, plan: 'Pro' },
    { id: 5, name: 'Dr. Michael Brown', email: 'michael@example.com', credits: 0, total: 5, plan: 'Free' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdjustCredits = (id, amount) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newCredits = Math.max(0, user.credits + amount);
        return { ...user, credits: newCredits };
      }
      return user;
    }));
  };

  const handleResetCredits = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const defaultCredits = user.plan === 'Free' ? 5 : user.plan === 'Pro' ? 50 : 100;
        return { ...user, credits: defaultCredits };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Credits Management
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor and manage doctor credit usage and limits.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Coins size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Credits Issued</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>12,450</p>
          </div>
        </div>
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Low Balance Users</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>24</p>
          </div>
        </div>
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
            <RefreshCw size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Resets This Month</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>156</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search doctors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map((user) => {
          const percentage = (user.credits / user.total) * 100;
          const isLow = percentage < 20;

          return (
            <motion.div
              layout
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4
                ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                  ${user.plan === 'Free' ? 'bg-blue-500' : user.plan === 'Pro' ? 'bg-purple-500' : 'bg-emerald-500'}`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{user.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                </div>
              </div>

              <div className="flex-1 w-full md:w-1/3 px-4">
                <div className="flex justify-between mb-1">
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Usage: {user.credits} / {user.total}
                  </span>
                  {isLow && (
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                      <AlertTriangle size={12} /> Low Balance
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button 
                  onClick={() => handleAdjustCredits(user.id, -1)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => handleAdjustCredits(user.id, 1)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <Plus size={16} />
                </button>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
                <button 
                  onClick={() => handleResetCredits(user.id)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CreditsManager;
