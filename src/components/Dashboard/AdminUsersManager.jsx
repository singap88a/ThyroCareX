import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Shield, Mail, Edit, Trash2 } from 'lucide-react';

const AdminUsersManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample admin users
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@thyrocare.com', role: 'Super Admin', status: 'active', lastActive: 'Now' },
    { id: 2, name: 'Support Team', email: 'support@thyrocare.com', role: 'Support', status: 'active', lastActive: '2 hours ago' },
    { id: 3, name: 'Content Manager', email: 'content@thyrocare.com', role: 'Editor', status: 'offline', lastActive: '1 day ago' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
          Admin Users
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-[15px]">
          Manage system administrators and their roles
        </p>
      </motion.div>

      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">Team Members ({filteredUsers.length})</h3>
          
          <div className="data-table-actions">
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4695a5] transition-all"
              />
            </div>
            <button className="btn btn-primary btn-sm">
              <UserPlus size={16} />
              Add User
            </button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4695a5] to-[#2d6a75] rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium">
                    <Shield size={14} />
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize ${
                    user.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="text-slate-500 dark:text-slate-400">{user.lastActive}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="p-2 transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminUsersManager;
