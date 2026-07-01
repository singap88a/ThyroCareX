import React, { useState, useEffect, useRef } from 'react';
import { Brain, Send, User, Loader2, RefreshCcw, AlertTriangle, MessageSquarePlus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import aiService from '../../services/aiService';

const PatientAiAgent = ({ patientId }) => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (patientId) {
      fetchSessions();
    }
  }, [patientId]);

  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const data = await aiService.getPatientSessions(patientId);
      setSessions(data || []);
      if (data && data.length > 0) {
        selectSession(data[0].id);
      } else {
        createNewSession();
      }
    } catch (error) {
      console.error('Failed to fetch sessions', error);
      toast.error('Failed to load past sessions');
    } finally {
      setLoadingSessions(false);
    }
  };

  const selectSession = async (sessionId) => {
    setCurrentSessionId(sessionId);
    setLoadingMessages(true);
    try {
      const data = await aiService.getSessionMessages(sessionId);
      if (data && data.length > 0) {
        setMessages(data.map(m => ({
          id: m.id.toString(),
          role: m.role,
          content: m.content
        })));
      } else {
        setMessages([{
          id: 'sys-1',
          role: 'system',
          content: `Resumed session. How can I help you regarding Patient #${patientId}?`
        }]);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
      toast.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const createNewSession = () => {
    const newSessionId = "sess_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    setCurrentSessionId(newSessionId);
    setMessages([{
      id: 'sys-1',
      role: 'system',
      content: `Hello Doctor, I am the AI Agent. Started a new session for Patient #${patientId}. How can I help you?`
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!currentSessionId) {
      toast.error('No session selected.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiService.agentChat(currentSessionId, userMessage, patientId);
      
      if (response && response.response) {
        setMessages(prev => [...prev, { 
          id: Date.now().toString() + 'ai', 
          role: 'ai', 
          content: response.response,
          tools: response.tools_used || []
        }]);
        // Refresh sessions list silently if this was the first message
        if (messages.length <= 1) {
            aiService.getPatientSessions(patientId).then(data => setSessions(data || []));
        }
      } else {
        toast.error('Received an empty response from AI Agent.');
      }
    } catch (error) {
      console.error('Agent chat error', error);
      toast.error('Failed to communicate with AI Agent');
      setMessages(prev => [...prev, { 
        id: Date.now().toString() + 'err', 
        role: 'system', 
        content: 'Failed to reach AI Agent. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] max-h-[800px] bg-white dark:bg-admin-dark-card border border-gray-100 dark:border-admin-dark-border rounded-3xl overflow-hidden shadow-sm">
      
      {/* Sidebar for Sessions */}
      <div className="w-72 bg-gray-50/50 dark:bg-admin-dark-bg border-r border-gray-100 dark:border-admin-dark-border flex flex-col">
        <div className="p-4 border-b border-gray-100 dark:border-admin-dark-border">
          <button 
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors shadow-sm font-semibold text-sm"
          >
            <MessageSquarePlus size={18} />
            New Session
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {loadingSessions ? (
            <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : (
            sessions.map(session => (
              <button
                key={session.id}
                onClick={() => selectSession(session.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${currentSessionId === session.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-admin-dark-hover text-gray-700 dark:text-gray-300'}`}
              >
                <MessageSquare size={16} className={currentSessionId === session.id ? "text-primary" : "text-gray-400"} />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium truncate">{session.title || "New Chat"}</p>
                  <p className="text-xs opacity-70 truncate">{new Date(session.createdAt).toLocaleString()}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-gray-100 dark:border-admin-dark-border">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-gray-900 dark:text-white">AI Medical Agent</h2>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contextual intelligence for Patient #{patientId}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/50 dark:bg-admin-dark-bg/50">
          {loadingMessages ? (
             <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === 'user' ? 'bg-primary text-white' : 
                        msg.role === 'system' ? 'bg-amber-100 text-amber-600' : 'bg-gradient-to-br from-indigo-500 to-primary text-white'
                      }`}>
                        {msg.role === 'user' ? <User size={20} /> : msg.role === 'system' ? <AlertTriangle size={20} /> : <Brain size={20} />}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className={`p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-sm' 
                            : msg.role === 'system'
                              ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-tl-sm'
                              : 'bg-white dark:bg-admin-dark-hover dark:text-gray-100 border border-gray-100 dark:border-admin-dark-border/50 text-gray-800 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                        {msg.tools && msg.tools.length > 0 && (
                          <div className="flex gap-2 items-center text-[10px] font-bold text-gray-400">
                            <span>Tools used:</span>
                            {msg.tools.map((t, idx) => (
                              <span key={idx} className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-gradient-to-br from-indigo-500 to-primary text-white">
                      <Brain size={20} />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-sm shadow-sm bg-white dark:bg-admin-dark-hover border border-gray-100 dark:border-admin-dark-border/50">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white dark:bg-admin-dark-card border-t border-gray-100 dark:border-admin-dark-border">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-3 max-w-4xl mx-auto">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={currentSessionId ? "Ask the AI Agent about this patient..." : "Session unavailable..."}
              disabled={!currentSessionId || isLoading || loadingMessages}
              className="flex-1 max-h-32 min-h-[56px] py-4 pl-5 pr-14 bg-gray-50 dark:bg-admin-dark-bg border border-gray-200 dark:border-admin-dark-border/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm dark:text-white transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || !currentSessionId || loadingMessages}
              className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primaryHover disabled:opacity-50 transition-colors shadow-sm"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-400 font-medium mt-3">
            ThyraX AI Agent can make mistakes. Always verify medical information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientAiAgent;
