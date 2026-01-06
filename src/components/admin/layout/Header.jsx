import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';

const Header = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useAdminTheme();
  const { logout } = useAdminAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className={`h-20 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-sm transition-colors duration-300
      ${isDarkMode ? 'bg-admin-dark-bg/80 border-b border-admin-dark-border' : 'bg-white/80 border-b border-gray-100'}`}>
      
      {/* Left Section: Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
        >
          <Menu className={isDarkMode ? 'text-white' : 'text-gray-600'} />
        </button>

        <div className="relative w-full max-w-md hidden md:block group">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
            ${isDarkMode ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-400 group-focus-within:text-primary'}`} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all duration-300
              ${isDarkMode 
                ? 'bg-admin-dark-card border-admin-dark-border text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white'}`}
          />
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all duration-300 relative overflow-hidden
            ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDarkMode ? 'dark' : 'light'}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl transition-all duration-300 relative
              ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border overflow-hidden z-50
                  ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer flex gap-3`}>
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Bell size={18} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>New Doctor Registration</p>
                        <p className="text-xs text-gray-500 mt-1">Dr. Sarah Smith just signed up.</p>
                        <p className="text-[10px] text-gray-400 mt-2">2 mins ago</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100 dark:border-gray-700">
                  <button className="text-sm text-primary font-medium hover:underline">View All Notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary p-0.5"
          >
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=random" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border overflow-hidden z-50
                  ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin User</p>
                  <p className="text-xs text-gray-500">admin@thyrocarex.com</p>
                </div>
                <div className="p-2">
                  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <User size={16} /> Profile
                  </button>
                  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Settings size={16} /> Settings
                  </button>
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default Header;
