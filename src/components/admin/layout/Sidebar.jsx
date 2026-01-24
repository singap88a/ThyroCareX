import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CreditCard,
  Coins,
  Image,
  MessageSquare,
  Shield,
  Menu,
  X,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import adminService from '../../../services/adminService';
import { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { isDarkMode } = useAdminTheme();
  const { logout } = useAdminAuth();
  const location = useLocation();
  const [counts, setCounts] = useState({ doctors: 0, pendingRequests: 0, patients: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [pending, allDoctors] = await Promise.all([
            adminService.getPendingDoctors(),
            adminService.getAllDoctors()
        ]);
        
        let pendingCount = 0;
        if (pending && pending.succeeded && Array.isArray(pending.data)) pendingCount = pending.data.length;
        else if (Array.isArray(pending)) pendingCount = pending.length;
        else if (pending && Array.isArray(pending.data)) pendingCount = pending.data.length;

        let doctorCount = 0;
         if (allDoctors && allDoctors.succeeded && Array.isArray(allDoctors.data)) doctorCount = allDoctors.data.length;
        else if (Array.isArray(allDoctors)) doctorCount = allDoctors.length;
        else if (allDoctors && Array.isArray(allDoctors.data)) doctorCount = allDoctors.data.length;
        
        setCounts({
            pendingRequests: pendingCount,
            doctors: doctorCount,
            patients: 12 // Mock for now or fetch if API exists
        });
      } catch (error) {
        console.error("Failed to fetch sidebar counts", error);
      }
    };
    fetchCounts();
  }, []);

  // Menu items grouped by category with section titles
  const menuGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/admin', icon: LayoutDashboard, label: 'Overview', count: 0 },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { path: '/admin/doctors', icon: Stethoscope, label: 'Doctors', count: counts.doctors },
        { path: '/admin/doctor-requests', icon: UserCheck, label: 'Doctor Requests', count: counts.pendingRequests },
        { path: '/admin/patients', icon: Users, label: 'Patients & Cases', count: counts.patients },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions', count: 2 },
        { path: '/admin/credits', icon: Coins, label: 'Credits', count: 0 },
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { path: '/admin/media', icon: Image, label: 'Media Manager', count: 8 },
        { path: '/admin/messages', icon: MessageSquare, label: 'Messages', count: 5 },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/admin/users', icon: Shield, label: 'Admin Users', count: 0 },
      ]
    },
  ];

  const sidebarVariants = {
    open: { width: '280px', transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: '80px', transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Custom scrollbar styles based on theme
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: ${isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)'};
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: ${isDarkMode ? 'rgba(100, 116, 139, 0.7)' : 'rgba(148, 163, 184, 0.7)'};
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${isDarkMode ? 'rgba(100, 116, 139, 0.9)' : 'rgba(148, 163, 184, 0.9)'};
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
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
        <div className="relative flex items-center justify-center h-20 border-b border-gray-500 border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform shadow-lg rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 hover:rotate-12">
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-xl font-bold tracking-wide text-primary"
                >
                  ThyroCareX
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50
              ${isDarkMode ? 'bg-primary text-white hover:bg-primaryHover' : 'bg-white text-primary border border-primary/20 hover:bg-primary/5'}`}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Section Title */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 mb-2 first:mt-0"
                  >
                    <span className={`text-xs font-bold tracking-wider px-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {group.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link to={item.path} key={item.path}>
                    <motion.div
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden shadow-sm border
                        ${isActive
                          ? 'bg-primary/20 text-primary shadow-primary/10 border-primary'
                          : 'hover:bg-gray-500/10 text-gray-500 hover:text-primary hover:shadow-md border-transparent'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute top-0 bottom-0 left-0 w-1 rounded-r-full bg-primary"
                          style={{
                            boxShadow: '0 0 12px rgba(var(--primary-color-rgb), 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        />
                      )}

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center justify-between flex-1 overflow-hidden"
                          >
                            <div className="flex items-center flex-1 gap-3 overflow-hidden">
                              <item.icon
                                size={20}
                                className={`min-w-[20px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}
                              />
                              <span className={`whitespace-nowrap font-black text-sm tracking-wide ${isActive ? 'text-primary' : ''}`}>
                                {item.label}
                              </span>
                            </div>

                            {/* Notification count for expanded view */}
                            {item.count > 0 && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className={`px-2.5 py-1 text-xs rounded-full font-bold shadow-sm
                                  ${isActive
                                    ? 'bg-primary text-white shadow-primary/30'
                                    : isDarkMode
                                      ? 'bg-slate-700 text-slate-200 shadow-slate-700/30'
                                      : 'bg-slate-200 text-slate-700 shadow-slate-200/30'
                                  }`}
                              >
                                {item.count > 99 ? '99+' : item.count}
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isOpen && (
                        <item.icon
                          size={20}
                          className={`min-w-[20px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}
                        />
                      )}

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-xl bg-primary/5 group-hover:opacity-100" />
                    </motion.div>
                  </Link>
                );
              })}

              {/* Separator between groups (except last group) */}
              {groupIndex < menuGroups.length - 1 && (
                <div className={`my-4 mx-2 h-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* User Section */}
        <div className={`p-3 border-t border-opacity-10 border-gray-500 ${isDarkMode ? 'bg-black/20' : 'bg-gray-50/50'}`}>
          <div className={`flex items-center gap-2 ${!isOpen && 'justify-center'}`}>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                  alt="Admin"
                  className="w-full h-full border-2 border-transparent rounded-full"
                />
              </div>

              {/* Online Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 overflow-hidden"
                >
                  <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin User</p>
                  <p className="text-xs text-gray-400 truncate">Super Admin</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isOpen && (
              <motion.button
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
                className="text-gray-400 transition-colors hover:text-red-500"
              >
                <LogOut size={18} />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;