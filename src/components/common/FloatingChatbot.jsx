import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FloatingChatbot = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <Link to="/gemini">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-primary text-white shadow-primary/30 transition-all duration-300"
          title="Open AI Chatbot"
        >
          <FaRobot size={28} />
        </motion.button>
      </Link>
      
      <style>{`
        .bg-primary { background-color: #4695a5; }
        .text-primary { color: #4695a5; }
        .shadow-primary\/30 { box-shadow: 0 10px 25px -5px rgba(70, 149, 165, 0.3); }
      `}</style>
    </div>
  );
};

export default FloatingChatbot;
