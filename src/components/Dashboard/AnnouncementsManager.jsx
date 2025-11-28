import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Plus, Calendar, Send, Trash2 } from 'lucide-react';

const AnnouncementsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample announcements
  const announcements = [
    { 
      id: 1, 
      title: 'System Maintenance Scheduled', 
      content: 'We will be performing system maintenance on Sunday at 2 AM UTC.', 
      audience: 'All Users', 
      status: 'scheduled', 
      date: '2024-12-01' 
    },
    { 
      id: 2, 
      title: 'New AI Model Released', 
      content: 'We have updated our thyroid detection model with 99% accuracy.', 
      audience: 'Doctors', 
      status: 'sent', 
      date: '2024-11-25' 
    },
    { 
      id: 3, 
      title: 'Holiday Support Hours', 
      content: 'Our support team will have limited availability during the holidays.', 
      audience: 'All Users', 
      status: 'draft', 
      date: '2024-12-20' 
    },
  ];

  const filteredAnnouncements = announcements.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
          Announcements
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-[15px]">
          Broadcast messages to your users
        </p>
      </motion.div>

      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">All Announcements ({filteredAnnouncements.length})</h3>
          
          <div className="data-table-actions">
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4695a5] transition-all"
              />
            </div>
            <button className="btn btn-primary btn-sm">
              <Plus size={16} />
              New Announcement
            </button>
          </div>
        </div>

        <div className="grid gap-4 p-6">
          {filteredAnnouncements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start justify-between p-6 border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    item.status === 'sent' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                    item.status === 'scheduled' ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.content}
                </p>
                <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Bell size={14} />
                    {item.audience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <Send size={16} />
                </button>
                <button className="p-2 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementsManager;
