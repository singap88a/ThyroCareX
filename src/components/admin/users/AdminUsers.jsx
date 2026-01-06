import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  UserPlus, 
  Lock, 
  Activity, 
  Trash2, 
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const AdminUsers = () => {
  const { isDarkMode } = useAdminTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@thyrocarex.com', role: 'Super Admin', status: 'active', lastLogin: 'Just now' },
    { id: 2, name: 'Support Team', email: 'support@thyrocarex.com', role: 'Support', status: 'active', lastLogin: '2 hours ago' },
    { id: 3, name: 'Finance Manager', email: 'finance@thyrocarex.com', role: 'Finance', status: 'inactive', lastLogin: '3 days ago' },
  ]);

  const [auditLog, setAuditLog] = useState([
    { id: 1, admin: 'Admin User', action: 'Created new doctor account', target: 'Dr. New User', time: '10 mins ago' },
    { id: 2, admin: 'Support Team', action: 'Reset password', target: 'Dr. Sarah Smith', time: '1 hour ago' },
    { id: 3, admin: 'Admin User', action: 'Updated system settings', target: 'Global Settings', time: 'Yesterday' },
    { id: 4, admin: 'Finance Manager', action: 'Generated monthly report', target: 'Revenue Report', time: '3 days ago' },
  ]);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    // Add logic
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Users & Roles
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage administrative access and view activity logs.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30"
        >
          <UserPlus size={18} /> Add New Admin
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Admin List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Active Administrators</h3>
          <div className="grid grid-cols-1 gap-4">
            {admins.map((admin) => (
              <motion.div
                layout
                key={admin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-6
                  ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                    ${admin.role === 'Super Admin' ? 'bg-gradient-to-tr from-purple-500 to-pink-500' : 
                      admin.role === 'Support' ? 'bg-gradient-to-tr from-blue-500 to-cyan-500' : 
                      'bg-gradient-to-tr from-emerald-500 to-teal-500'}`}>
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{admin.name}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{admin.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider
                        ${admin.role === 'Super Admin' ? 'bg-primary/10 text-primary' : 
                          admin.role === 'Support' ? 'bg-primary/10 text-primary' : 
                          'bg-primary/10 text-primary'}`}>
                        {admin.role}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${admin.status === 'active' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {admin.status === 'active' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        {admin.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto justify-end">
                  <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <Lock size={18} />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <Edit size={18} />
                  </button>
                  {admin.role !== 'Super Admin' && (
                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-red-900/30 text-red-500' : 'hover:bg-red-50 text-red-500'}`}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className={`p-6 rounded-xl border h-fit ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Activity size={20} className="text-primary" /> Recent Activity
          </h3>
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className={`absolute left-2 top-2 bottom-2 w-0.5 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
            
            {auditLog.map((log) => (
              <div key={log.id} className="relative pl-8">
                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 z-10
                  ${isDarkMode ? 'bg-gray-900 border-primary' : 'bg-white border-primary'}`} />
                
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <span className="font-bold text-primary">{log.admin}</span> {log.action}
                </p>
                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Target: {log.target}
                </p>
                <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {log.time}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-primary font-medium hover:underline">
            View Full Log
          </button>
        </div>
      </div>

      {/* Add Admin Modal (Simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-bold mb-4">Add New Administrator</h2>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <option>Support</option>
                  <option>Finance</option>
                  <option>Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-primary hover:bg-primaryHover text-white transition-colors">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
