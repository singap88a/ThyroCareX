"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChevronLeft, FaChevronRight, FaHeartbeat, FaLightbulb, 
  FaAward, FaShieldAlt, FaUserMd, FaChartLine, 
  FaClock, FaBrain, FaCheckCircle, FaUsers 
} from "react-icons/fa";

const FloatingCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -15, 0],
      opacity: 1,
      rotate: [0, 1, 0, -1, 0]
    }}
    transition={{ 
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      opacity: { duration: 0.8, delay: 1 },
      rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={`absolute z-20 backdrop-blur-xl bg-white/90 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-5 ${className}`}
  >
    {children}
  </motion.div>
);

const DecorativeSquare = ({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, rotate: 0 }}
    animate={{ scale: 1, opacity: 0.1, rotate: 45 }}
    transition={{ duration: 1, delay }}
    className={`absolute w-32 h-32 border-2 border-primary rounded-3xl pointer-events-none ${className}`}
  />
);

const AboutPrinciplesModern = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const timelineData = [
    {
      year: "Our Values",
      title: "Ethics & Accuracy in Patient Care",
      subtitle: "Trust & Transparency",
      description: "We are committed to the highest standards of medical ethics and transparency in developing AI technologies. We prioritize patient privacy and data security, and work to deliver accurate and reliable results that empower better medical decisions.",
      icon: <FaHeartbeat className="w-10 h-10" />,
      color: "var(--primary-color)",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&auto=format",
      stats: [
        { label: "Data Security", value: "HIPAA ", icon: <FaShieldAlt className="text-primary" /> },
        { label: "Medical Experts", value: "50+Specialists", icon: <FaUserMd className="text-primary" /> },
        { label: "Accuracy Rate", value: "98.5%", icon: <FaCheckCircle className="text-primary" /> }
      ]
    },
    {
      year: "Our Vision",
      title: "Future of AI-Powered Medical Diagnosis",
      subtitle: "Healthcare Innovation",
      description: "We strive to transform the future of thyroid cancer diagnosis through advanced AI. Our vision is to make early and accurate diagnosis accessible to everyone, contributing to saving lives and improving global health quality.",
      icon: <FaLightbulb className="w-10 h-10" />,
      color: "var(--primary-color)",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
      stats: [
        { label: "AI Models", value: "15+ Trained", icon: <FaBrain className="text-primary" /> },
        { label: "Diagnosis Time", value: "< 5 min", icon: <FaClock className="text-primary" /> },
        { label: "Global Reach", value: "30+ Countries", icon: <FaChartLine className="text-primary" /> }
      ]
    },
    {
      year: "Our Mission",
      title: "Empowering Doctors with AI Tools",
      subtitle: "Accuracy & Speed in Diagnosis",
      description: "Our mission is to provide doctors with advanced AI tools to diagnose thyroid cancer with high accuracy. We believe technology should be a partner to the physician, ensuring the best outcomes for every patient.",
      icon: <FaAward className="w-10 h-10" />,
      color: "var(--primary-color)",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
      stats: [
        { label: " Trained", value: "500+", icon: <FaUsers className="text-primary" /> },
        { label: "Success Rate", value: "96.7%", icon: <FaCheckCircle className="text-primary" /> },
        { label: "Time Saved", value: "70% Faster", icon: <FaClock className="text-primary" /> }
      ]
    },
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % timelineData.length);
  }, [timelineData.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
  }, [timelineData.length]);

  const activeItem = timelineData[activeIndex];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-white selection:bg-primary selection:text-white">
      {/* Subtle Background Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] flex items-center justify-center">
        <span className="text-[20rem] font-black uppercase tracking-tighter select-none whitespace-nowrap">
          ThyroCare
        </span>
      </div>

      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                Our Foundation
              </span>
            </div>
            <h2 className="text-5xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Driven by <span className="text-primary">Purpose</span> & Innovation
            </h2>
          </motion.div>

          <div className="flex items-center gap-3 p-1.5 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`relative px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-500 rounded-xl ${
                  activeIndex === index ? "text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeTabV3"
                    className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  {activeItem.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">
                    {activeItem.subtitle}
                  </div>
                  <h3 className="text-4xl font-black text-gray-900">
                    {activeItem.year}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-2xl font-bold text-gray-800 leading-snug">
                  {activeItem.title}
                </p>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {activeItem.description}
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeItem.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="flex items-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:bg-gray-50/50"
                  >
                    <div className="flex items-center justify-center w-9 h-9 text-base bg-primary/5 text-primary rounded-lg transition-colors group-hover:bg-primary/10">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                        {stat.label}
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {stat.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Slide Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:scale-105 active:scale-95"
                >
                  <FaChevronLeft className="text-gray-500 hover:text-primary transition-colors" />
                </button>

                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-inner mx-2">
                  {timelineData.map((_, i) => (
                    <motion.div
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      initial={false}
                      animate={{
                        width: activeIndex === i ? 36 : 10,
                        backgroundColor: activeIndex === i ? "var(--primary-color)" : "#e5e7eb",
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-2.5 rounded-full cursor-pointer"
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:scale-105 active:scale-95"
                >
                  <FaChevronRight className="text-gray-500 hover:text-primary transition-colors" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Side: Proportional Focused Image */}
          <div className="relative h-full min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -20 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="relative z-10 w-full h-full"
              >
                {/* Decorative Elements - Refined */}
                <DecorativeSquare className="-top-6 -right-6 !w-24 !h-24" delay={0.2} />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-[3rem] -z-10 blur-2xl" />
                
                {/* Image Wrapper with specific height constraint */}
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group border-4 border-white">
                  <img 
                    src={activeItem.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={activeItem.title} 
                  />
                  
                  {/* Glassmorph Overlay Badge */}
                  <div className="absolute top-6 right-6 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <FaChartLine />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white leading-none">98.5%</div>
                      <div className="text-[8px] font-bold text-white/80 uppercase tracking-widest mt-1">Accuracy</div>
                    </div>
                  </div>

                  {/* Geometric Work - Overlaid Shapes */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20 rounded-tr-[2.5rem]" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary/20 rounded-bl-[2.5rem]" />
                  </div>
                </div>

                {/* Floating Elements - More Integrated */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 left-12 z-20"
                >
                  <div className="backdrop-blur-xl bg-white/90 border border-white shadow-2xl rounded-3xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900 tracking-tighter">50K+</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Consultations</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
     
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciplesModern;
