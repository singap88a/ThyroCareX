import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Mail, Menu, Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import './AdminDashboard.css';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`admin-container ${theme}`}>
      <div className="admin-layout">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          {/* Top Bar */}
          <div className="admin-topbar">
            <div className="topbar-left">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="topbar-toggle"
              >
                <Menu size={20} />
              </button>

              <div className="topbar-search">
                <Search className="topbar-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search anything..."
                />
              </div>
            </div>

            <div className="topbar-right">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="topbar-icon-btn"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="topbar-icon-btn">
                <Bell size={20} />
                <span className="badge">3</span>
              </button>

              <button className="topbar-icon-btn">
                <Mail size={20} />
                <span className="badge">5</span>
              </button>

              <div className="topbar-user">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=4695a5&color=fff"
                  alt="Admin"
                  className="topbar-avatar"
                />
                <div className="topbar-user-info">
                  <div className="topbar-user-name">Admin</div>
                  <div className="topbar-user-role">Super Admin</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="admin-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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
