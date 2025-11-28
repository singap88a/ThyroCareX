import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Globe, 
  Search, 
  Filter, 
  Download,
  UserCheck,
  UserX
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const SecurityLogs = () => {
  const { isDarkMode } = useAdminTheme();
  const [filterType, setFilterType] = useState('all');

  // Mock Data
  const logs = [
    { id: 'SEC-001', event: 'Failed Login Attempt', user: 'admin@thyrocarex.com', ip: '192.168.1.1', location: 'Cairo, Egypt', time: '10 mins ago', status: 'warning' },
    { id: 'SEC-002', event: 'Successful Login', user: 'sarah@example.com', ip: '10.0.0.5', location: 'New York, USA', time: '1 hour ago', status: 'success' },
    { id: 'SEC-003', event: 'Password Changed', user: 'john@example.com', ip: '172.16.0.1', location: 'London, UK', time: '2 hours ago', status: 'info' },
    { id: 'SEC-004', event: 'Suspicious File Upload', user: 'unknown', ip: '45.33.22.11', location: 'Moscow, Russia', time: 'Yesterday', status: 'danger' },
    { id: 'SEC-005', event: 'API Key Generated', user: 'admin@thyrocarex.com', ip: '192.168.1.1', location: 'Cairo, Egypt', time: 'Yesterday', status: 'success' },
  ];

  const filteredLogs = logs.filter(log => filterType === 'all' || log.status === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Security Logs
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor system access, authentication events, and potential threats.
          </p>
        </div>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border
          ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Failed Logins (24h)</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>15</p>
          </div>
        </div>
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Shield size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Sessions</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>128</p>
          </div>
        </div>
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
            <Lock size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Password Resets</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>8</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={20} className="text-gray-400" />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-4 py-2 rounded-lg border outline-none cursor-pointer
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <option value="all">All Events</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Critical</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs uppercase tracking-wider ${isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">IP Address</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
              {filteredLogs.map((log) => (
                <tr key={log.id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-800/50 text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                  <td className="p-4 font-medium">{log.event}</td>
                  <td className="p-4 text-sm">{log.user}</td>
                  <td className="p-4 text-sm font-mono">{log.ip}</td>
                  <td className="p-4 text-sm flex items-center gap-2">
                    <Globe size={14} className="text-gray-400" /> {log.location}
                  </td>
                  <td className="p-4 text-sm">{log.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                      ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                        log.status === 'warning' ? 'bg-orange-500/10 text-orange-500' : 
                        log.status === 'danger' ? 'bg-red-500/10 text-red-500' :
                        'bg-blue-500/10 text-blue-500'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogs;
