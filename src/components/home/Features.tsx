import React from "react";
import { motion } from "framer-motion";
import { 
  FaBalanceScale, 
  FaFire, 
  FaHeartbeat, 
  FaBrain,
  FaArrowRight,
  FaRegCircle
} from "react-icons/fa";
import { TbHeartbeat } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    title: "Hormone Regulation",
    desc: "Balances T3 & T4 hormone levels to ensure stable endocrine function and consistent biological activity",
    position: "lg:top-[5px] lg:left-[-140px]",
    delay: 0.6,
    icon: <FaBalanceScale className="text-blue-600" />,
    color: "blue"
  },
  {
    title: "Metabolism Control",
    desc: "Regulates energy production and metabolic rate to support healthy weight management and daily vitality",
    position: "lg:top-[5px] lg:right-[-140px]",
    delay: 0.8,
    icon: <FaFire className="text-orange-500" />,
    color: "orange"
  },
  {
    title: "Cardiovascular Support",
    desc: "Maintains heart rhythm balance and supports normal blood circulation for overall cardiovascular health",
    position: "lg:bottom-[40px] lg:left-[-140px]",
    delay: 1,
    icon: <FaHeartbeat className="text-red-500" />,
    color: "red"
  },
  {
    title: "Nervous System Balance",
    desc: "Supports neural signal efficiency and enhances focus, response speed, and cognitive stability",
    position: "lg:bottom-[40px] lg:right-[-140px]",
    delay: 1.2,
    icon: <FaBrain className="text-purple-600" />,
    color: "purple"
  },
];


const FeatureCard = ({ title, desc, position, delay, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-50 to-white border-blue-100",
    orange: "from-orange-50 to-white border-orange-100",
    red: "from-red-50 to-white border-red-100",
    purple: "from-purple-50 to-white border-purple-100"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative lg:absolute ${position} z-20 w-full lg:w-96 p-5 lg:p-6 rounded-2xl 
        bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm
        shadow-xl lg:shadow-2xl shadow-gray-200/50 border-2`}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
        <div className={`p-4 lg:p-3 rounded-2xl lg:rounded-xl bg-white shadow-lg border-2 border-${color}-100`}>
          <div className="text-3xl lg:text-2xl">
            {icon}
          </div>
        </div>
        <div className="flex-1 w-full mt-2 lg:mt-0">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 lg:mb-3 px-2 lg:px-0">{desc}</p>
          <div className="flex items-center justify-center lg:justify-start text-xs lg:text-sm text-gray-500 bg-white/50 lg:bg-transparent py-2 lg:py-0 rounded-xl lg:rounded-none">
            <span className="flex items-center gap-1 font-medium">
              <TbHeartbeat className="text-gray-400 text-sm lg:text-base" />
              Active function
            </span>
            <FaArrowRight className="mx-2 text-gray-300 text-[10px] lg:text-xs" />
            <span className="font-medium">Optimal range</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ThyroidFeatures = () => {
  return (
    <section className="relative pt-12 lg:pt-60 bg-white overflow-hidden pb-10 lg:pb-28">
      
      {/* Center Wrapper - تركيز العمل هنا */}
      <div className="relative w-full lg:w-fit mx-auto px-4 lg:px-0 flex flex-col items-center lg:block">
        
        {/* دوائر حلزونية احترافية حول الصورة */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] z-0 hidden lg:block">
          {/* الدائرة الخارجية */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-gray-200 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400"></div>
          </motion.div>
          
          {/* الدائرة الوسطى */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[60px] border border-gray-300/70 rounded-full"
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-blue-300"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300"></div>
          </motion.div>
          
          {/* الدائرة الداخلية */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[120px] border border-gray-400/50 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500"></div>
          </motion.div>
        </div>

        {/* خطوط توصيل متحركة احترافية */}
        <svg className="absolute top-0 left-0 w-full h-full z-5 hidden lg:block" style={{ overflow: 'visible' }}>
          {features.map((feature, index) => {
            const positions = {
              0: { x1: "320", y1: "180", x2: "140", y2: "150" },
              1: { x1: "480", y1: "180", x2: "620", y2: "150" },
              2: { x1: "320", y1: "420", x2: "140", y2: "550" },
              3: { x1: "480", y1: "420", x2: "620", y2: "550" },
            };
            
            const pos = positions[index];
            const colors = {
              0: "blue",
              1: "orange", 
              2: "red",
              3: "purple"
            };
            
            return (
              <g key={index}>
                <motion.line
                  x1={pos.x1}
                  y1={pos.y1}
                  x2={pos.x2}
                  y2={pos.y2}
                  stroke={`url(#gradient-${colors[index]})`}
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.5, delay: feature.delay, ease: "easeOut" }}
                  fill="none"
                />
                {/* نقاط متحركة على الخط */}
                <motion.circle
                  cx={pos.x1}
                  cy={pos.y1}
                  r="3"
                  fill={`var(--color-${colors[index]})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.5 }}
                />
              </g>
            );
          })}
          
          <defs>
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Thyroid Image - مكبرة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="relative">
            {/* تأثير وهج خفيف */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 rounded-full blur-2xl"></div>
            
            {/* الإطار الاحترافي */}
            <div className="absolute -inset-4 border-2 border-gray-100 rounded-3xl"></div>
            
            {/* الصورة مكبرة */}
            <img
              src="/fff.png"
              alt="Thyroid Gland"
              className="relative z-10 w-full max-w-[300px] sm:max-w-[400px] lg:w-[780px] lg:max-w-none h-auto select-none drop-shadow-xl rounded-2xl mx-auto"
            />
            
        
 
          </div>
        </motion.div>

        {/* Desktop Feature Cards (Hidden on Mobile) */}
        <div className="hidden lg:block">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>

        {/* Mobile Feature Cards Swiper (Hidden on Desktop) */}
        <div className="w-full block lg:hidden mt-6 px-2 max-w-full overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full pb-12 pt-4"
            loop={true}
          >
            {features.map((item, index) => (
              <SwiperSlide key={index}>
                <FeatureCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      {/* مؤشرات إضافية في الأسفل */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 mt-12 lg:mt-7 text-center px-4"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white/80 backdrop-blur-sm px-6 sm:px-8 py-4 rounded-2xl border-2 border-blue-100 shadow-lg w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-gray-700 font-medium">Active Regulation</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-gray-700 font-medium">Vascular Response</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-gray-700 font-medium">Neural Integration</span>
          </div>
        </div>
      </motion.div>
      
      {/* CSS Variables للألوان */}
      <style jsx>{`
        :root {
          --color-blue: #3b82f6;
          --color-orange: #f97316;
          --color-red: #ef4444;
          --color-purple: #8b5cf6;
        }
      `}</style>
    </section>
  );
};

export default ThyroidFeatures;