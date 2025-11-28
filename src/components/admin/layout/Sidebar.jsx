import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  Activity, 
  CreditCard, 
  Coins, 
  Image, 
  MessageSquare, 
  Shield, 
  Settings, 
  FileText, 
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { isDarkMode } = useAdminTheme();
  const { logout } = useAdminAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
    { path: '/admin/patients', icon: Users, label: 'Patients & Cases' },
    { path: '/admin/ai-logs', icon: Activity, label: 'AI Diagnosis Logs' },
    { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { path: '/admin/credits', icon: Coins, label: 'Credits' },
    { path: '/admin/media', icon: Image, label: 'Media Manager' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/users', icon: Shield, label: 'Admin Users' },
    { path: '/admin/security', icon: FileText, label: 'Security Logs' },
    { path: '/admin/announcements', icon: Bell, label: 'Announcements' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const sidebarVariants = {
    open: { width: '280px', transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: '80px', transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      className={`h-screen sticky top-0 left-0 z-50 flex flex-col border-r shadow-2xl backdrop-blur-xl
        ${isDarkMode 
          ? 'bg-admin-dark-card/90 border-admin-dark-border text-admin-dark-text' 
          : 'bg-white/90 border-admin-light-border text-admin-light-text'
        }`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-center relative border-b border-opacity-10 border-gray-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              >
                ThyroCareX
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors
            ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50'}`}
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path}>
              <motion.div
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-500' 
                    : 'hover:bg-gray-500/10 text-gray-500 hover:text-blue-500'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 rounded-r-full bg-blue-500"
                  />
                )}
                
                <item.icon 
                  size={22} 
                  className={`min-w-[22px] transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`} 
                />
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`whitespace-nowrap font-medium ${isActive ? 'text-blue-500' : ''}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className={`p-4 border-t border-opacity-10 border-gray-500 ${isDarkMode ? 'bg-black/20' : 'bg-gray-50/50'}`}>
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=random" 
              alt="Admin" 
              className="w-full h-full rounded-full border-2 border-transparent"
            />
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden"
              >
                <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin User</p>
                <p className="text-xs text-gray-400 truncate">Super Admin</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isOpen && (
            <motion.button
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
