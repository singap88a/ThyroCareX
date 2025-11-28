import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Megaphone, 
  Calendar, 
  Send, 
  Trash2, 
  Eye,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const AnnouncementsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [activeTab, setActiveTab] = useState('create');

  // Mock Data
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', type: 'warning', message: 'Scheduled maintenance on Oct 25th from 2 AM to 4 AM UTC.', audience: 'All Users', status: 'Active', date: '2023-10-24' },
    { id: 2, title: 'New AI Model Released', type: 'success', message: 'We have updated our thyroid detection model with 99% accuracy.', audience: 'Doctors', status: 'Sent', date: '2023-10-20' },
    { id: 3, title: 'Holiday Support Hours', type: 'info', message: 'Support team will be available on limited hours during holidays.', audience: 'All Users', status: 'Scheduled', date: '2023-12-20' },
  ]);

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Announcements & Notifications
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Broadcast messages, system updates, and alerts to users.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Create Form */}
        <div className={`w-full lg:w-1/3 p-6 rounded-xl border h-fit
          ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Megaphone size={20} className="text-blue-500" /> Create New
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className={`text-sm font-medium mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
              <input type="text" placeholder="e.g., System Update" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
            </div>

            <div>
              <label className={`text-sm font-medium mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className={`p-2 rounded-lg text-sm border flex flex-col items-center gap-1 transition-colors
                  ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <Info size={16} className="text-blue-500" /> Info
                </button>
                <button type="button" className={`p-2 rounded-lg text-sm border flex flex-col items-center gap-1 transition-colors
                  ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <CheckCircle size={16} className="text-emerald-500" /> Success
                </button>
                <button type="button" className={`p-2 rounded-lg text-sm border flex flex-col items-center gap-1 transition-colors
                  ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <AlertCircle size={16} className="text-orange-500" /> Warning
                </button>
              </div>
            </div>

            <div>
              <label className={`text-sm font-medium mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea rows="4" placeholder="Type your message here..." className={`w-full p-2.5 rounded-lg border outline-none resize-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
            </div>

            <div>
              <label className={`text-sm font-medium mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Audience</label>
              <select className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}>
                <option>All Users</option>
                <option>Doctors Only</option>
                <option>Patients Only</option>
                <option>Free Plan Users</option>
              </select>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                <Send size={18} /> Publish Announcement
              </button>
            </div>
          </form>
        </div>

        {/* History List */}
        <div className="flex-1 space-y-6">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Announcements</h2>
          
          <div className="space-y-4">
            {announcements.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl border relative overflow-hidden
                  ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 
                  ${item.type === 'info' ? 'bg-blue-500' : item.type === 'success' ? 'bg-emerald-500' : 'bg-orange-500'}`} 
                />
                
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider
                      ${item.type === 'info' ? 'bg-blue-500/10 text-blue-500' : 
                        item.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                        'bg-orange-500/10 text-orange-500'}`}>
                      {item.type}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-red-900/30 text-red-500' : 'hover:bg-red-50 text-red-500'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.message}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Bell size={12} /> Audience: {item.audience}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={12} /> Status: {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsManager;
