import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Lottie Animation or Illustration */}
        <div className="flex justify-center h-64 md:h-80">
          <DotLottieReact
            src="https://lottie.host/7e008c26-5b4d-4560-af80-a6a9b40049e7/yY7x0N0T2X.lottie"
            loop
            autoplay
            className="w-full h-full object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-3">
            <AlertCircle className="w-10 h-10 text-primary" />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight">
              404
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Oops! Page not found
          </h2>
          
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg hover:bg-primaryHover hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
