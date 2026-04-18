import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, Clock, CheckCircle, XCircle, Eye, ExternalLink, Trash2, Send, Paperclip, Check } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import api from '../../../services/api';
import toast from 'react-hot-toast';

const ContactMessagesManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const baseURL = "https://thyrocarex.runasp.net/"; // Adjust as needed for your backend image base

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Contact/List');
      if (res.data?.succeeded) {
        setMessages(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await api.put(`/Contact/ToggleStatus/${id}`);
      toast.success('Status updated');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Support Inbox
          </h2>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage user inquiries, technical support, and feedback.
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 text-sm rounded-xl outline-none border transition-all w-full md:w-64 ${
              isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white focus:border-[#4695a5]' 
              : 'bg-white border-slate-200 text-slate-900 focus:border-[#4695a5]'
            }`}
          />
        </div>
      </div>

      {/* Messages Grid/List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
             <div className="w-10 h-10 border-4 border-[#4695a5] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className={`p-20 text-center rounded-3xl border border-dashed ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-slate-200 text-slate-400'}`}>
             <Mail size={40} className="mx-auto mb-4 opacity-20" />
             <p className="font-bold">No messages found.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <motion.div
              layout
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`group p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isDarkMode 
                ? 'bg-admin-dark-card border-admin-dark-border hover:bg-gray-800' 
                : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                  msg.isReplied 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-[#4695a5]/10 text-[#4695a5]'
                }`}>
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {msg.subject}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                      From: <span className="font-bold text-[#4695a5]">{msg.name}</span>
                    </p>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-slate-400'} flex items-center gap-1`}>
                      <Clock size={12} /> {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {msg.attachmentUrl && (
                  <Paperclip size={16} className="text-slate-400" />
                )}
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  msg.isReplied 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-orange-100 text-orange-600'
                }`}>
                  {msg.isReplied ? 'Replied' : 'Pending'}
                </div>
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-slate-50 text-slate-400'
                  }`}
                >
                  <Eye size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border ${
                isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-[#4695a5]/5 to-transparent">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#4695a5] rounded-2xl text-white">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {selectedMessage.subject}
                      </h3>
                      <p className="text-xs font-bold text-[#4695a5]">{selectedMessage.email}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <XCircle size={24} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message Content</span>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.attachmentUrl && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attachment</span>
                    <a 
                      href={`${baseURL}${selectedMessage.attachmentUrl}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`block p-4 rounded-2xl border transition-all group ${
                        isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-[#4695a5]' : 'bg-slate-50 border-slate-200 hover:border-[#4695a5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#4695a5]/10 rounded-lg text-[#4695a5]">
                              <Paperclip size={18} />
                            </div>
                            <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Click to view attachment</span>
                         </div>
                         <ExternalLink size={16} className="text-[#4695a5] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                   <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-100'}`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sent Date</span>
                      <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                   </div>
                   <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-100'}`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${selectedMessage.isReplied ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                         <p className={`font-bold ${selectedMessage.isReplied ? 'text-emerald-500' : 'text-orange-500'}`}>
                           {selectedMessage.isReplied ? 'Handled / Replied' : 'Pending Review'}
                         </p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t flex flex-col sm:flex-row gap-3">
                 <button 
                  onClick={() => toggleStatus(selectedMessage.id)}
                  className={`flex-1 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedMessage.isReplied 
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                  }`}
                 >
                   {selectedMessage.isReplied ? <XCircle size={18} /> : <Check size={18} />}
                   {selectedMessage.isReplied ? 'Mark as Pending' : 'Mark as Replied'}
                 </button>
                 <a 
                   href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                   className="flex-[2] py-3 bg-[#4695a5] hover:bg-[#3d8391] text-white font-black rounded-2xl shadow-xl shadow-[#4695a5]/20 transition-all flex items-center justify-center gap-2"
                 >
                    <Send size={18} />
                    Reply via Email
                    <ExternalLink size={14} className="opacity-60" />
                 </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactMessagesManager;
