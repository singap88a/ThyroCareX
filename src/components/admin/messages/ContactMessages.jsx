import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Filter, 
  Trash2, 
  Reply, 
  CheckCircle, 
  Clock,
  Star,
  MoreVertical
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const ContactMessages = () => {
  const { isDarkMode } = useAdminTheme();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock Data
  const [messages, setMessages] = useState([
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah@example.com', subject: 'Question about API access', message: 'Hi, I would like to know more about the Enterprise plan API access limits. Can we increase the rate limit?', date: '10:30 AM', status: 'unread', starred: true },
    { id: 2, name: 'John Doe', email: 'john@example.com', subject: 'Login issues', message: 'I cannot reset my password. The link seems to be broken. Please help.', date: 'Yesterday', status: 'read', starred: false },
    { id: 3, name: 'Emily Chen', email: 'emily@example.com', subject: 'Feature Request', message: 'It would be great if we could export reports in Excel format directly from the dashboard.', date: 'Oct 22', status: 'read', starred: false },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', subject: 'Billing Inquiry', message: 'I was charged twice for this month subscription. Please refund the duplicate charge.', date: 'Oct 20', status: 'unread', starred: true },
  ]);

  const filteredMessages = messages.filter(msg => 
    filterStatus === 'all' || 
    (filterStatus === 'unread' && msg.status === 'unread') ||
    (filterStatus === 'starred' && msg.starred)
  );

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Message List */}
      <div className={`w-full md:w-1/3 flex flex-col rounded-2xl border overflow-hidden
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        
        {/* List Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Inbox</h2>
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${filterStatus === 'all' 
                  ? 'bg-primary text-white' 
                  : (isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${filterStatus === 'unread' 
                  ? 'bg-primary text-white' 
                  : (isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}`}
            >
              Unread
            </button>
            <button 
              onClick={() => setFilterStatus('starred')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${filterStatus === 'starred' 
                  ? 'bg-primary text-white' 
                  : (isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}`}
            >
              Starred
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className={`w-full pl-9 pr-4 py-2 rounded-lg border outline-none text-sm transition-colors
                ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-primary'}`}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => handleSelectMessage(msg)}
              className={`p-4 border-b cursor-pointer transition-colors relative group
                ${isDarkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-gray-50'}
                ${selectedMessage?.id === msg.id ? (isDarkMode ? 'bg-gray-800' : 'bg-primary/10') : ''}
                ${msg.status === 'unread' ? (isDarkMode ? 'bg-gray-800/20' : 'bg-white') : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-bold truncate pr-4 ${msg.status === 'unread' ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                  {msg.name}
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">{msg.date}</span>
              </div>
              <p className={`text-sm font-medium truncate mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {msg.subject}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {msg.message}
              </p>
              
              {/* Actions */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => toggleStar(msg.id, e)}
                  className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${msg.starred ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  <Star size={14} fill={msg.starred ? "currentColor" : "none"} />
                </button>
              </div>
              
              {msg.status === 'unread' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className={`flex-1 rounded-2xl border overflow-hidden flex flex-col
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        {selectedMessage ? (
          <>
            {/* Detail Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMessage.subject}</h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    From: <span className="font-medium text-primary">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Star size={20} fill={selectedMessage.starred ? "currentColor" : "none"} className={selectedMessage.starred ? "text-yellow-500" : ""} />
                </button>
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-red-900/30 text-red-500' : 'hover:bg-red-50 text-red-500'}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Detail Body */}
            <div className="flex-1 p-8 overflow-y-auto">
              <p className={`text-base leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedMessage.message}
              </p>
            </div>

            {/* Reply Box */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex gap-4">
                <div className="flex-1">
                  <textarea 
                    placeholder="Type your reply..." 
                    className={`w-full p-4 rounded-xl border outline-none resize-none h-32 transition-colors
                      ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' : 'bg-white border-gray-200 text-gray-800 focus:border-primary'}`}
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Reply size={18} /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Mail size={64} className="mb-4 opacity-20" />
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
