import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Image as ImageIcon, Loader2, User, 
  CheckCheck, Clock, Paperclip, MoreVertical,
  Smile, Phone, Video, Info, X, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as signalR from '@microsoft/signalr';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { parseJwt } from '../../utils/jwt';

const PatientChat = ({ patientId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState(null);
  const [sending, setSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🙏', '🔥', '💊', '🏥', '🩺', '✅'];

  // Get current user (doctor) from AuthContext or decode token
  // Use DoctorId for database consistency, fallback to id for SignalR routing
  const doctorId = user?.DoctorId?.toString() || user?.id?.toString() || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']?.toString();
  const receiverId = patientId?.toString();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchHistory();
    setupSignalR();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [patientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/Chat/History/${doctorId}/${receiverId}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to fetch chat history', err);
    } finally {
      setLoading(false);
    }
  };

  const setupSignalR = async () => {
    const hubUrl = (api.defaults.baseURL || '').replace('/api', '') + '/chatHub';
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${hubUrl}?userId=${doctorId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    newConnection.on('ReceiveMessage', (message) => {
      // Check if message belongs to this conversation
      if ((message.senderId === doctorId && message.receiverId === receiverId) ||
          (message.senderId === receiverId && message.receiverId === doctorId)) {
        setMessages((prev) => {
          // Prevent duplicates by checking content and timestamp
          const isDuplicate = prev.some(m => 
            m.content === message.content && 
            new Date(m.sentAt).getTime() === new Date(message.sentAt).getTime()
          );
          if (isDuplicate) return prev;
          return [...prev, message];
        });
      }
    });

    try {
      await newConnection.start();
      console.log('SignalR Connected');
      setConnection(newConnection);
    } catch (err) {
      console.error('SignalR Connection Error: ', err);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() && !selectedImage && !sending) return;

    const content = newMessage.trim();
    const imageToUpload = selectedImage;

    setNewMessage('');
    setSelectedImage(null);
    setPreviewUrl(null);
    setSending(true);

    try {
      let finalImageUrl = null;

      // 1. If there's an image, upload it first
      if (imageToUpload) {
        const formData = new FormData();
        formData.append('image', imageToUpload);
        formData.append('senderId', doctorId);
        formData.append('receiverId', receiverId);
        
        const uploadRes = await api.post('/Chat/UploadImage', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        finalImageUrl = uploadRes.data.imageUrl;
      }

      // 2. Save to DB
      const messageData = {
        senderId: doctorId,
        receiverId: receiverId,
        content: content || '[Image]',
        imageUrl: finalImageUrl,
        senderType: 'Doctor',
        doctorId: parseInt(doctorId),
        patientId: parseInt(receiverId)
      };

      await api.post('/Chat/Save', messageData);

      // 3. Add locally (Optimistic)
      setMessages(prev => [...prev, { ...messageData, sentAt: new Date().toISOString() }]);

      // 4. Broadcast
      if (connection) {
        await connection.invoke('SendMessage', doctorId, receiverId, content || '[Image]', finalImageUrl, 'Doctor');
      }
    } catch (err) {
      console.error('Failed to send message', err);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Initializing secure channel...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-admin-dark-card rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-xl overflow-hidden m-4">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-admin-dark-border bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              <User size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-admin-dark-card rounded-full" />
          </div>
          <div>
            <h3 className="font-black dark:text-white">Patient Support Channel</h3>
            <p className="text-xs text-green-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-400 hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl transition-colors">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/30 dark:bg-admin-dark-bg/20">
        <div className="flex justify-center mb-8">
          <span className="px-4 py-1.5 bg-gray-100 dark:bg-admin-dark-hover rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Today
          </span>
        </div>

        {messages.map((msg, idx) => {
          const isMe = msg.senderId === doctorId;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-3xl shadow-sm relative group ${
                  isMe 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-admin-dark-hover border border-gray-100 dark:border-admin-dark-border dark:text-white rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.imageUrl && (
                    <img 
                      src={msg.imageUrl.startsWith('http') ? msg.imageUrl : `${api.defaults.baseURL?.replace('/api', '')}${msg.imageUrl}`} 
                      alt="attachment" 
                      className="mt-2 rounded-2xl max-w-full border border-white/20 shadow-sm" 
                    />
                  )}
                  
                  <div className={`absolute top-0 ${isMe ? '-left-12' : '-right-12'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <button className="p-2 text-gray-400 hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1.5 px-1">
                  <span className="text-[10px] font-bold text-gray-400">
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMe && (
                    <CheckCheck size={14} className={msg.isRead ? 'text-blue-500' : 'text-gray-300'} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white dark:bg-admin-dark-card border-t border-gray-100 dark:border-admin-dark-border">
        {previewUrl && (
          <div className="mb-4 relative inline-block">
            <img src={previewUrl} alt="preview" className="h-32 rounded-2xl border-4 border-white shadow-lg" />
            <button 
              onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3 bg-gray-50 dark:bg-admin-dark-bg p-3 rounded-[24px] border border-gray-100 dark:border-admin-dark-border focus-within:border-primary transition-all">
          {showEmojiPicker && (
            <div className="flex gap-2 p-2 bg-white dark:bg-admin-dark-card rounded-xl border border-gray-100 dark:border-admin-dark-border shadow-sm animate-in fade-in slide-in-from-bottom-2">
              {emojis.map(emoji => (
                <button 
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setNewMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-xl hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-primary hover:bg-white dark:hover:bg-admin-dark-hover rounded-xl transition-all"
              >
                <Paperclip size={20} />
              </button>
              <button 
                type="button" 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 rounded-xl transition-all ${showEmojiPicker ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-primary hover:bg-white dark:hover:bg-admin-dark-hover'}`}
              >
                <Smile size={20} />
              </button>
            </div>
            
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message to patient..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 dark:text-white"
            />
            
            <button 
              type="submit"
              disabled={(!newMessage.trim() && !selectedImage) || sending}
              className={`p-3 rounded-2xl transition-all flex items-center justify-center ${
                (newMessage.trim() || selectedImage) && !sending
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </form>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageSelect}
        />
        <p className="text-[10px] text-gray-400 mt-3 text-center font-bold uppercase tracking-widest">
          Messages are encrypted and stored securely
        </p>
      </div>
    </div>
  );
};

export default PatientChat;
