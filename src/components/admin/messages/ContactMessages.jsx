import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Search, Clock, CheckCircle, XCircle, Eye, 
  ExternalLink, Trash2, Send, Paperclip, Check, 
  AlertTriangle, Filter, ChevronRight, User, Inbox
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../config.js';

const ContactMessages = () => {
  const { isDarkMode } = useAdminTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, pending, replied
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const baseURL = BASE_URL; 

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContactMessages();
      const succeeded = res?.succeeded ?? res?.Succeeded;
      const data = res?.data ?? res?.Data;
      
      if (succeeded && Array.isArray(data)) {
        const mappedData = data.map(m => ({
          id: m.id ?? m.Id,
          name: m.name ?? m.Name,
          email: m.email ?? m.Email,
          subject: m.subject ?? m.Subject,
          message: m.message ?? m.Message,
          attachmentUrl: m.attachmentUrl ?? m.AttachmentUrl,
          isReplied: m.isReplied ?? m.IsReplied,
          createdAt: m.createdAt ?? m.CreatedAt
        }));
        setMessages(mappedData);
        
        // Auto-select first message if none selected
        if (mappedData.length > 0 && !selectedMessage) {
          // setSelectedMessage(mappedData[0]); // Optional, maybe better to keep empty
        }
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
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
      await adminService.toggleContactStatus(id);
      toast.success('Status updated');
      
      // Update local state to avoid full reload flikering if possible, 
      // but fetchMessages is safer for consistency
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isReplied: !m.isReplied } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage(prev => ({ ...prev, isReplied: !prev.isReplied }));
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteContactMessage(id);
      toast.success('Message deleted');
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      setMessageToDelete(null);
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'pending' && !m.isReplied) || 
      (filterType === 'replied' && m.isReplied);
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
      {/* Top Header/Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Support Inbox
          </h2>
          <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#4695a5]' : 'text-[#4695a5]'}`}>
            {messages.length} Total Messages
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text"
                    placeholder="Search inbox..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 text-sm rounded-xl outline-none border transition-all w-full md:w-64 ${
                    isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-[#4695a5]' 
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#4695a5]'
                    }`}
                />
            </div>
            <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`py-2 px-3 text-sm rounded-xl border outline-none cursor-pointer ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-700'
                }`}
            >
                <option value="all">All Messages</option>
                <option value="pending">Pending</option>
                <option value="replied">Replied</option>
            </select>
        </div>
      </div>

      {/* Main Content Area: Split View */}
      <div className={`flex-1 flex overflow-hidden rounded-3xl border ${
          isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        
        {/* Left Hand: Message List (Master) */}
        <div className={`w-full md:w-[380px] flex flex-col border-r ${
            isDarkMode ? 'border-admin-dark-border' : 'border-slate-100'
        }`}>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50">
                        <div className="w-8 h-8 border-3 border-[#4695a5] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-tighter">Syncing...</span>
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-40">
                        <Inbox size={48} className="mb-4" />
                        <p className="font-black text-sm uppercase tracking-widest">Inbox Empty</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100/10">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`group p-4 cursor-pointer transition-all relative ${
                                    selectedMessage?.id === msg.id
                                    ? (isDarkMode ? 'bg-[#4695a5]/10' : 'bg-[#4695a5]/5')
                                    : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
                                }`}
                            >
                                {selectedMessage?.id === msg.id && (
                                    <motion.div 
                                        layoutId="active-indicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#4695a5]"
                                    />
                                )}
                                
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                                        msg.isReplied 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : 'bg-[#4695a5]/10 text-[#4695a5]'
                                    }`}>
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className={`text-sm font-black truncate pr-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {msg.name}
                                            </h4>
                                            <span className={`text-[10px] whitespace-nowrap ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className={`text-xs font-bold truncate mb-1 ${isDarkMode ? 'text-[#4695a5]' : 'text-[#4695a5]'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className={`text-xs line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                                            {msg.message}
                                        </p>
                                    </div>
                                    {!msg.isReplied && (
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 animate-pulse" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Right Hand: Message Details (Detail) */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden relative">
            <AnimatePresence mode="wait">
                {selectedMessage ? (
                    <motion.div 
                        key={selectedMessage.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        {/* Detail Header */}
                        <div className={`p-6 border-b flex items-center justify-between ${
                            isDarkMode ? 'border-admin-dark-border bg-white/5' : 'border-slate-100 bg-slate-50/30'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'} text-[#4695a5]`}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {selectedMessage.subject}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                                            {selectedMessage.name}
                                        </span>
                                        <span className="text-slate-400 text-[10px]">•</span>
                                        <span className="text-xs text-[#4695a5] font-bold">{selectedMessage.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => toggleStatus(selectedMessage.id)}
                                    className={`p-2 rounded-xl transition-all ${
                                        selectedMessage.isReplied 
                                        ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                    }`}
                                    title={selectedMessage.isReplied ? "Mark as Pending" : "Mark as Replied"}
                                >
                                    {selectedMessage.isReplied ? <XCircle size={20} /> : <CheckCircle size={20} />}
                                </button>
                                <button 
                                    onClick={() => setMessageToDelete(selectedMessage)}
                                    className={`p-2 rounded-xl transition-all ${
                                        isDarkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'bg-red-50 text-red-500 hover:bg-red-100'
                                    }`}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Clock size={14} />
                                    </div>
                                    <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                                        Received on {new Date(selectedMessage.createdAt).toLocaleString(undefined, {
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>

                                <div className={`p-6 rounded-3xl border ${
                                    isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-slate-50/50 border-slate-100'
                                }`}>
                                    <p className={`whitespace-pre-wrap leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                {selectedMessage.attachmentUrl && (
                                    <div className="mt-8">
                                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Attachment</h5>
                                        
                                        {/* Inline Image Preview */}
                                        {selectedMessage.attachmentUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                            <div className="space-y-4">
                                                <div className={`relative overflow-hidden rounded-3xl border group shadow-xl transition-all ${
                                                    isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-slate-100 bg-white'
                                                }`}>
                                                    <img 
                                                        src={`${baseURL}${selectedMessage.attachmentUrl}`} 
                                                        alt="Attachment" 
                                                        className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <a 
                                                            href={`${baseURL}${selectedMessage.attachmentUrl}`} 
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all active:scale-90"
                                                            title="View Full Size"
                                                        >
                                                            <ExternalLink size={24} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <a 
                                                    href={`${baseURL}${selectedMessage.attachmentUrl}`} 
                                                    download
                                                    className={`inline-flex items-center gap-2 text-xs font-bold ${isDarkMode ? 'text-[#4695a5]' : 'text-[#4695a5] hover:underline'}`}
                                                >
                                                    <Paperclip size={14} />
                                                    Download Original Image
                                                </a>
                                            </div>
                                        ) : (
                                            /* Non-image attachment (e.g. PDF) */
                                            <a 
                                                href={`${baseURL}${selectedMessage.attachmentUrl}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className={`inline-flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                                                    isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-[#4695a5]' : 'bg-white border-slate-200 hover:border-[#4695a5] shadow-sm'
                                                }`}
                                            >
                                                <div className="p-3 bg-[#4695a5]/10 rounded-xl text-[#4695a5]">
                                                    <Paperclip size={20} />
                                                </div>
                                                <div className="pr-4">
                                                    <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>View File</p>
                                                    <p className="text-[10px] font-bold text-slate-400">Click to open or download</p>
                                                </div>
                                                <ExternalLink size={16} className="text-[#4695a5] opacity-40 group-hover:opacity-100 transition-all" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detail Bottom Bar / Quick Reply */}
                        <div className={`p-6 border-t ${isDarkMode ? 'border-admin-dark-border bg-white/5' : 'border-slate-100 bg-slate-50/30'}`}>
                            <div className="flex gap-4">
                                <a 
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="flex-1 py-3 bg-[#4695a5] hover:bg-[#3d8391] text-white font-black rounded-2xl shadow-xl shadow-[#4695a5]/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Reply via Email Client
                                    <ExternalLink size={14} className="opacity-60" />
                                </a>
                                <button
                                    onClick={() => toast.success('Quick response feature coming soon')}
                                    className={`px-6 py-3 rounded-2xl font-black transition-all ${
                                        isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white border text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    Quick Note
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30"
                    >
                        <div className="w-24 h-24 rounded-full border-4 border-dashed border-current mb-6 flex items-center justify-center">
                            <Mail size={48} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter">Select a Conversation</h3>
                        <p className="max-w-xs mx-auto text-sm font-bold mt-2">
                            Choose a message from the left list to read the full content and manage the inquiry.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Responsive Overlay for Mobile (when a message is selected) */}
      <AnimatePresence>
        {selectedMessage && (
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed inset-0 z-[100] md:hidden bg-white dark:bg-admin-dark-bg flex flex-col"
            >
                <div className="p-4 border-b flex items-center gap-4">
                    <button onClick={() => setSelectedMessage(null)} className="p-2">
                        <XCircle size={24} />
                    </button>
                    <span className="font-black truncate">Details</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Reuse Detail logic here if needed, but for MVP keep it simple */}
                    <h3 className="text-xl font-black mb-4">{selectedMessage.subject}</h3>
                    <p className="text-sm border-b pb-4 mb-4">{selectedMessage.message}</p>
                    <div className="space-y-4">
                        <button 
                            onClick={() => toggleStatus(selectedMessage.id)}
                            className="w-full py-3 bg-[#4695a5]/10 text-[#4695a5] rounded-xl font-bold"
                        >
                            Toggle Status
                        </button>
                        <button 
                            onClick={() => setMessageToDelete(selectedMessage)}
                            className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Delete Modal */}
      <AnimatePresence>
        {messageToDelete && (
           <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMessageToDelete(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div
                 initial={{ opacity: 0, scale: 0.9, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 10 }}
                 className={`relative w-full max-w-sm rounded-[2rem] p-8 shadow-2xl border text-center ${
                   isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-slate-100'
                 }`}
              >
                 <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={32} />
                 </div>
                 <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Delete Message?</h3>
                 <p className={`text-sm mb-8 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    This action will permanently delete this conversation and its associated files.
                 </p>
                 <div className="flex gap-3">
                    <button 
                      onClick={() => setMessageToDelete(null)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => handleDelete(messageToDelete.id)}
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-500/20 transition-all font-bold"
                    >
                      Delete
                    </button>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactMessages;
