import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      
      {/* Animated Circle Logo */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        <motion.div
          className="absolute w-full h-full border-4 border-primary/20 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-16 h-16 border-4 border-primary/40 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-10 h-10 bg-primary rounded-full shadow-lg shadow-primary/50"
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Animated Word */}
      <div className="flex space-x-1 text-xl md:text-2xl font-bold tracking-wider text-primary">
        {"LOADING".split("").map((letter, index) => (
          <motion.span
            key={index}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          ...
        </motion.span>
      </div>
      
      <p className="mt-4 text-sm text-gray-400 font-medium tracking-wide">
        Please wait a moment
      </p>
    </div>
  );
};

export default PageLoader;
