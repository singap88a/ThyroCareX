import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode } = useAdminTheme();
  const { isAuthenticated, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
       navigate('/login'); 
    }
  }, [isAuthenticated, loading, navigate]);

  // Close sidebar on mobile on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className={`h-screen w-full flex items-center justify-center ${isDarkMode ? 'bg-admin-dark-bg' : 'bg-admin-light-bg'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-admin-dark-bg text-admin-dark-text' : 'bg-admin-light-bg text-admin-light-text'}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <div className="max-w-7xl mx-auto w-full pb-10">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
