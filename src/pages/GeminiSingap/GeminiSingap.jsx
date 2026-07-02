import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { FaCopy, FaStop, FaTrash, FaRedo, FaPaperPlane, FaLightbulb, FaSearch, FaCode, FaRobot, FaUser, FaBrain, FaImage, FaTimes, FaPlus, FaComments, FaBars } from "react-icons/fa";
import aiService from "../../services/aiService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config";

const GeminiSingap = ({ darkMode = false }) => {
  const typingIntervalsRef = useRef({});
  const chatContainerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const charQueueRef = useRef([]);
  const typewriterIntervalRef = useRef(null);
  const isStreamDoneRef = useRef(false);

  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chats, setChats] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [isTypingStopped, setIsTypingStopped] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem('thyrax_user');
    if (!user) {
      setIsLoggedIn(false);
      toast.error("Please login to access the AI Assistant");
    } else {
      fetchSessions();
    }
  }, []);

  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const data = await aiService.getGeneralSessions();
      setSessions(data || []);
      if (data && data.length > 0) {
        // Option to either select latest or start new. We will start new by default
        // Or show header
        createNewSession();
      } else {
        createNewSession();
      }
    } catch (error) {
      console.error('Failed to load sessions', error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const createNewSession = () => {
    stopGenerating();
    const newId = `sess_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    setCurrentSessionId(newId);
    setChats([]);
    setShowHeader(true);
  };

  const selectSession = async (sessionId) => {
    stopGenerating();
    setCurrentSessionId(sessionId);
    setShowHeader(false);
    setLoadingMessages(true);
    try {
      const data = await aiService.getGeneralSessionMessages(sessionId);
      if (data && data.length > 0) {
        setChats(data.map(m => ({
          role: m.role,
          content: m.content
        })));
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error('Failed to load messages', error);
      toast.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
      setIsSidebarOpen(false); // Close sidebar on mobile after selecting
    }
  };

  // Stop typing and any ongoing requests
  const stopGenerating = useCallback(() => {
    setIsTypingStopped(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    charQueueRef.current = [];
    isStreamDoneRef.current = true;
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }
    setIsGenerating(false);
  }, []);

  const resetChat = useCallback(() => {
    createNewSession();
    setInputValue("");
    setIsSidebarOpen(false);
  }, [createNewSession]);

  const copyMessage = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyPopup(true);
      setTimeout(() => setShowCopyPopup(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = useCallback(
    async (e, overrideText = null) => {
      if (e) e.preventDefault();
      const messageToProcess = overrideText || inputValue.trim();
      if (!messageToProcess || isGenerating) return;

      if (!currentSessionId) {
        createNewSession();
      }

      const userMessage = messageToProcess;
      setInputValue("");
      setIsTypingStopped(false);
      setShowHeader(false);
      setIsGenerating(true);

      const isFirstMessage = chats.length === 0;
      setChats(prev => [...prev, { role: "user", content: userMessage }]);
      setChats(prev => [...prev, { role: "ai", content: "", loading: true }]);

      charQueueRef.current = [];
      isStreamDoneRef.current = false;
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);

      typewriterIntervalRef.current = setInterval(() => {
        if (charQueueRef.current.length > 0) {
          const char = charQueueRef.current.shift();
          setChats((prevChats) => {
            const updated = [...prevChats];
            const lastIndex = updated.findLastIndex((msg) => msg.role === "ai");
            if (lastIndex !== -1) {
              updated[lastIndex] = {
                ...updated[lastIndex],
                loading: false,
                content: updated[lastIndex].content + char
              };
            }
            return updated;
          });
        } else if (isStreamDoneRef.current) {
          clearInterval(typewriterIntervalRef.current);
          typewriterIntervalRef.current = null;
          setIsGenerating(false);
          if (isFirstMessage) {
            aiService.getGeneralSessions().then(data => setSessions(data || []));
          }
        }
      }, 20);

      abortControllerRef.current = new AbortController();

      aiService.chatStream(
        userMessage,
        currentSessionId,
        abortControllerRef.current.signal,
        (chunk) => {
          for (const char of chunk) charQueueRef.current.push(char);
        },
        (err) => {
          if (err.name === 'AbortError') {
            setIsGenerating(false);
            return;
          }
          let errorMessage = "Sorry, I encountered an error. Please try again.";
          if (err.message === "403") {
            errorMessage = "⚠️ Access Denied: You need an active subscription to use the AI medical assistant.";
            setIsSubscribed(false);
          } else if (err.message === "401") {
            errorMessage = "Please login to use the AI assistant.";
          } else {
            errorMessage = `Sorry, I encountered an error (${err.message || 'Unknown'}). Please try again.`;
          }
          setChats((prev) => {
            const updated = [...prev];
            const lastIndex = updated.findLastIndex((msg) => msg.role === "ai");
            if (lastIndex !== -1) {
              updated[lastIndex] = { ...updated[lastIndex], loading: false, content: errorMessage, error: true };
            }
            return updated;
          });
          charQueueRef.current = [];
          isStreamDoneRef.current = true;
          clearInterval(typewriterIntervalRef.current);
          typewriterIntervalRef.current = null;
          setIsGenerating(false);
        },
        () => {
          isStreamDoneRef.current = true;
        }
      );

      removeImage();
    },
    [inputValue, isGenerating, chats, selectedImage, currentSessionId]
  );

  const handleSuggestionClick = (question) => {
    handleSendMessage(null, question);
  };

  const formatMessage = (text) => {
    if (!text) return null;
    const formattedText = text.replace(/(^|\n)\*\s+/g, '$1• ');
    const parts = formattedText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chats]);

  return (
    <div className={`relative flex h-[calc(100vh-80px)] transition-colors duration-300 overflow-hidden ${darkMode ? 'bg-background text-text' : 'bg-slate-50 text-gray-900'}`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 flex-shrink-0 flex flex-col border-r transition-transform duration-300 transform md:relative md:translate-x-0 pt-16 md:pt-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-surface border-border' : 'bg-white border-gray-200'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-border relative">
          <button className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
          <button 
            onClick={() => { createNewSession(); setIsSidebarOpen(false); }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-8 md:mt-0 bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors shadow-sm font-semibold text-sm"
          >
            <FaPlus size={14} />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {loadingSessions ? (
            <div className="flex justify-center p-4"><div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            sessions.map(session => (
              <button
                key={session.id}
                onClick={() => selectSession(session.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors border shadow-sm ${currentSessionId === session.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white border-gray-100 hover:border-gray-200 dark:bg-surface dark:border-border text-gray-700 dark:text-gray-300'}`}
              >
                <FaComments size={16} className={currentSessionId === session.id ? "text-primary" : "text-gray-400"} />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-16 md:pt-16 w-full max-w-full">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-[84px] left-4 z-30 p-2.5 bg-white rounded-xl shadow-md border border-gray-100 text-gray-700 hover:text-primary transition-colors"
        >
          <FaBars size={20} />
        </button>

        {/* Modals */}
        {showCopyPopup && (
          <div className={`fixed z-50 px-4 py-2 text-white bg-green-600 rounded-full shadow-lg top-6 left-1/2 -translate-x-1/2 animate-bounce-in`}>
            Copied to clipboard!
          </div>
        )}

        {!isLoggedIn && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className={`p-8 rounded-3xl shadow-2xl ${darkMode ? 'bg-surface border-border' : 'bg-white border-gray-100'} border max-w-md w-full animate-scale-in flex flex-col items-center`}>
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-red-50 rounded-full border-[6px] border-red-50/50">
                <FaUser className="text-3xl text-red-500" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-center text-text">Login Required</h3>
              <p className="mb-8 text-center text-text-muted leading-relaxed">
                You must be logged in to use the AI medical assistant and access personalized health insights.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {isLoggedIn && !isSubscribed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className={`p-8 rounded-3xl shadow-2xl ${darkMode ? 'bg-surface border-border' : 'bg-white border-gray-100'} border max-w-md w-full animate-scale-in flex flex-col items-center`}>
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-amber-50 rounded-full border-[6px] border-amber-50/50">
                <FaBrain className="text-3xl text-amber-500" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-center text-text">Subscription Required</h3>
              <p className="mb-8 text-center text-text-muted leading-relaxed">
                You need an active subscription to access the AI medical assistant and your personalized health insights.
              </p>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-4 py-3.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20"
              >
                View Subscription Plans
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        {showHeader && !loadingMessages && (
          <header className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-4 mx-auto text-center animate-fade-in py-6">
            <div className="p-4 mb-6 rounded-3xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10">
              <FaBrain className="w-12 h-12 text-primary animate-pulse-slow" />
            </div>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="text-primary">
                Thyrax AI
              </span>
            </h1>
            <p className={`text-lg font-medium max-w-2xl mx-auto ${darkMode ? 'text-text-secondary' : 'text-gray-500'}`}>
              Welcome to your intelligent assistant. Start a new chat below.
            </p>

            <div className="grid w-full max-w-3xl grid-cols-1 gap-4 mt-8 md:grid-cols-3">
              {[
                "What are the symptoms of hypothyroidism?",
                "How do I read my TSH test results?",
                "Does the thyroid affect my weight?"
              ].map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(question)}
                  className={`p-4 text-sm font-medium text-left transition-all border rounded-2xl ${darkMode ? 'bg-surface border-border hover:border-primary/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 text-gray-700'}`}
                >
                  <div className="flex justify-start mb-3 text-primary">
                    <FaLightbulb size={20} />
                  </div>
                  {question}
                </button>
              ))}
            </div>
          </header>
        )}

        {/* Chat container */}
        <div
          ref={chatContainerRef}
          className={`flex-1 overflow-y-auto px-4 py-8 mt-12 md:mt-0 mx-auto max-w-4xl w-full scroll-smooth ${
            showHeader && !loadingMessages ? "hidden" : "block"
          }`}
        >
          {loadingMessages ? (
             <div className="flex justify-center items-center h-full"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            chats.map((chat, index) => (
              <div
                key={index}
                className={`mb-8 flex gap-4 ${chat.role === "user" ? "flex-row-reverse" : "flex-row"} animate-slide-up`}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all overflow-hidden ${
                  chat.role === "ai" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {chat.role === "ai" ? <FaRobot size={22} /> : (
                    user?.profileImage ? (
                      <img src={user.profileImage.startsWith('http') ? user.profileImage : `${BASE_URL}/${user.profileImage}`} className="w-full h-full object-cover" alt="User" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=0D8ABC&color=fff`; }} />
                    ) : (
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=0D8ABC&color=fff`} className="w-full h-full object-cover" alt="User" />
                    )
                  )}
                </div>

                <div className={`group relative max-w-[80%] ${chat.role === "user" ? "items-end" : "items-start"}`}>
                  {chat.loading ? (
                    <div className={`p-5 rounded-2xl ${darkMode ? 'bg-surface' : 'bg-white shadow-sm'} border ${darkMode ? 'border-border' : 'border-gray-100'}`}>
                      <div className="flex flex-col w-48 gap-3 md:w-80">
                        <div className="w-full h-2 rounded bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 animate-loading-bar"></div>
                        <div className="w-3/4 h-2 rounded opacity-75 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 animate-loading-bar"></div>
                        <div className="w-1/2 h-2 rounded opacity-50 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 animate-loading-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <div className={`relative p-5 rounded-3xl shadow-sm text-[15px] leading-relaxed transition-all ${
                      chat.role === "user" 
                        ? "bg-primary text-white rounded-tr-none shadow-primary/20" 
                        : `${darkMode ? 'bg-surface border-border' : 'bg-white border-gray-100'} border text-text rounded-tl-none`
                    } ${chat.error ? "border-red-500/50 bg-red-50/10 text-red-600" : ""}`}>
                      <p className="whitespace-pre-wrap text-right" dir="auto">{formatMessage(chat.content)}</p>
                      
                      {chat.role === "ai" && !chat.error && (
                        <button
                          onClick={() => copyMessage(chat.content)}
                          className={`absolute -bottom-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-accent/50 ${darkMode ? 'text-text-muted' : 'text-gray-400 hover:text-gray-600'}`}
                          title="Copy message"
                        >
                          <FaCopy className="text-sm" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input area */}
        <div className={`sticky bottom-0 w-full px-4 pb-6 pt-4 backdrop-blur-md transition-colors ${darkMode ? 'bg-background/80' : 'bg-slate-50/80'}`}>
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative group">
                <div className={`flex items-end gap-2 p-2 pl-4 rounded-[28px] border transition-all duration-300 ${
                darkMode 
                  ? 'bg-surface border-border focus-within:border-primary/50' 
                  : 'bg-white border-gray-100 shadow-2xl shadow-gray-200/50 focus-within:border-primary focus-within:shadow-primary/10'
              }`}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageSelect} 
                  accept="image/*" 
                  className="hidden" 
                />

                <div className="flex flex-col flex-1">
                  {imagePreview && (
                    <div className="relative inline-block mt-2 ml-2 mb-2 w-20 h-20">
                      <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-primary/20 shadow-lg" />
                      <button 
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  )}
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask anything about thyroid health..."
                    className="w-full max-h-40 min-h-[48px] py-3 bg-transparent outline-none resize-none text-[15px] scrollbar-hide text-right"
                    rows={1}
                    dir="auto"
                  />
                </div>
                
                <div className="flex items-center gap-1.5 mb-1 mr-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center justify-center w-10 h-10 transition-all rounded-full ${imagePreview ? 'text-primary bg-primary/10' : 'text-gray-400 hover:bg-gray-100'}`}
                    title="Upload image for analysis"
                  >
                    <FaImage className="text-lg" />
                  </button>
                  {isGenerating ? (
                    <button
                      type="button"
                      onClick={stopGenerating}
                      className="flex items-center justify-center w-10 h-10 text-red-500 transition-all rounded-full hover:bg-red-50"
                      title="Stop generation"
                    >
                      <FaStop className="text-sm" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all ${
                        inputValue.trim() 
                          ? "bg-primary text-white shadow-xl shadow-primary/20 scale-100 hover:scale-105" 
                          : "bg-gray-50 text-gray-300 scale-90"
                      }`}
                    >
                      <FaPaperPlane className="text-sm ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <style>{`
          @keyframes bounce-in {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            50% { opacity: 1; transform: translate(-50%, 5px); }
            100% { transform: translate(-50%, 0); }
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes loading-bar {
            from { background-position: 200% 0; }
            to { background-position: -200% 0; }
          }
          .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
          .animate-scale-in { animation: scale-in 0.3s ease-out; }
          .animate-fade-in { animation: fade-in 0.6s ease-out; }
          .animate-slide-up { animation: slide-up 0.4s ease-out; }
          .animate-loading-bar { 
            background-size: 200% 100%;
            animation: loading-bar 1.5s infinite linear;
          }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};

export default GeminiSingap;
