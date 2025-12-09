"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket, FaGlobe, FaHeartbeat, FaAward, FaUsers, FaLightbulb } from "react-icons/fa";

const AboutPrinciples = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineData = [
        {
      year: "Our Values",
      title: "Ethics & Accuracy in Patient Care",
      subtitle: "Trust & Transparency",
      description:
        "We are committed to the highest standards of medical ethics and transparency in developing AI technologies. We prioritize patient privacy and data security, and work to deliver accurate and reliable results that help make the right medical decisions.",
      icon: <FaHeartbeat className="w-7 h-7" />,
      gradient: "from-teal-500 via-cyan-600 to-blue-600",
      images: [
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
      ],
    },
    {
      year: "Our Vision",
      title: "Future of AI-Powered Medical Diagnosis",
      subtitle: "Healthcare Innovation",
      description:
        "We strive to transform the future of thyroid cancer diagnosis through advanced artificial intelligence technologies. Our vision is to make early and accurate diagnosis accessible to everyone, contributing to saving lives and improving the quality of life for patients worldwide.",
      icon: <FaLightbulb className="w-7 h-7" />,
      gradient: "from-blue-500 via-blue-600 to-cyan-600",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=300&fit=crop",
      ],
    },
    {
      year: "Our Mission",
      title: "Empowering Doctors with AI Tools",
      subtitle: "Accuracy & Speed in Diagnosis",
      description:
        "Our mission is to provide doctors and specialists with advanced AI tools to diagnose thyroid cancer with high accuracy. We believe that technology should be a partner to the physician, not a replacement, to achieve the best medical outcomes for patients.",
      icon: <FaAward className="w-7 h-7" />,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      images: [
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
      ],
    },

  ];

  const activeItem = timelineData[activeIndex];

  return (
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="relative px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="relative mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-2.5 mb-6 text-sm font-semibold rounded-full bg-primary text-white shadow-lg"
          >
            ✨ About Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl"
          >
            Our Vision{" "}
            <span className="text-transparent bg-clip-text bg-primary">
              & Mission
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed"
          >
            We believe in the power of artificial intelligence to improve healthcare and save lives through early and accurate diagnosis of thyroid cancer
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative flex gap-12 md:gap-20 items-center min-h-[600px]">
          {/* Professional Vertical Timeline Sidebar */}
          <div className="relative flex-shrink-0 w-40">
            {/* Top Arrow Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 -top-8 z-20"
            >
 
            </motion.div>

            {/* Clean Professional Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full overflow-visible">
              {/* Main Gradient Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full" />
              
              {/* Subtle Inner Highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full" />
              
              {/* Smooth Energy Flow */}
              <motion.div
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
              />
            </div>

            {/* Bottom Arrow Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-20"
            >
         
            </motion.div>

            {/* Year Markers with Clean Design */}
            <div className="relative space-y-32 py-8">
              {timelineData.map((item, index) => (
                <motion.button
                  key={item.year}
                  onClick={() => setActiveIndex(index)}
                  className="relative group flex flex-col items-center w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Year Label */}
                  <motion.div
                    className={`mb-4 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeIndex === index
                        ? `text-white bg-gradient-to-r ${item.gradient} shadow-lg scale-105`
                        : "text-gray-500 bg-white shadow-md group-hover:bg-gray-50 group-hover:text-gray-700"
                    }`}
                  >
                    {item.year}
                  </motion.div>

                  {/* Circular Node */}
                  <motion.div
                    className="relative z-10"
                    animate={activeIndex === index ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={activeIndex === index ? { 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "easeInOut" 
                    } : {}}
                  >
                    {/* Subtle Glow */}
                    {activeIndex === index && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`absolute -inset-4 rounded-full bg-gradient-to-br ${item.gradient} blur-lg`}
                      />
                    )}
                    
                    {/* Main Circle */}
                    <div
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                        activeIndex === index 
                          ? "ring-4 ring-white/60 ring-offset-2 shadow-xl" 
                          : "opacity-40 group-hover:opacity-70 group-hover:shadow-md"
                      }`}
                    >
                      {/* Inner Subtle Glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                      
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 text-xl"
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Fixed Position Content Card Area */}
          <div className="flex-1 relative" style={{ minHeight: "600px" }}>
            <AnimatePresence mode="wait">
              {/* Content Card - Always in Same Position */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ 
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="relative top-1/2 -translate-y-1/2"
              >
                <motion.div
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${activeIndex}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="1" fill={`url(#${activeItem.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ')[0]})`} />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${activeIndex})`} />
                    </svg>
                  </div>

                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeItem.gradient} opacity-5`} />
                  
                  {/* Animated Particles Background */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -100],
                          x: [0, Math.sin(i) * 30],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2 + i * 0.2,
                          delay: i * 0.1,
                        }}
                        className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-blue-500/30' : i % 3 === 1 ? 'bg-purple-500/30' : 'bg-pink-500/30'}`}
                        style={{
                          left: `${(i * 7) % 100}%`,
                          top: `${(i * 8) % 100}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12">
                    {/* Enhanced Subtitle Badge with Connection Animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-flex items-center gap-3 mb-6"
                    >
                      {/* Animated Connection Dot */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeItem.gradient}`}
                      />
                      
                      <span className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r ${activeItem.gradient} rounded-full shadow-lg`}>
                        {activeItem.subtitle}
                      </span>
                      
                      {/* Animated Line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 40 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="h-0.5 bg-gradient-to-r from-gray-300 to-transparent"
                      />
                    </motion.div>

                    {/* Title with Advanced Animation */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                        {activeItem.title}
                      </span>
                    </motion.h3>

                    {/* Description with Staggered Text Animation */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, staggerChildren: 0.05 }}
                      className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-inner"
                    >
                      {activeItem.description.split('. ').map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="mb-3 last:mb-0"
                        >
                          {sentence}
                          {i < activeItem.description.split('. ').length - 1 ? '. ' : ''}
                        </motion.p>
                      ))}
                    </motion.div>

                    {/* Images Grid with Enhanced Animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="grid grid-cols-3 gap-4"
                    >
                      {activeItem.images.map((image, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.7 + imgIndex * 0.15, type: "spring" }}
                          whileHover={{ 
                            scale: 1.08, 
                            zIndex: 10,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                          className="relative aspect-video rounded-xl overflow-hidden shadow-xl group/img"
                        >
                          {/* Image */}
                          <motion.img
                            src={image}
                            alt={`${activeItem.title} - Image ${imgIndex + 1}`}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${activeItem.gradient} opacity-0 group-hover/img:opacity-30 transition-opacity duration-500`} />
                          
                          {/* Shine Effect */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "200%" }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          />
                          
                          {/* Image Number Badge */}
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{imgIndex + 1}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${activeItem.gradient} opacity-5 rounded-full blur-3xl`} />
                  <div className={`absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-tr ${activeItem.gradient} opacity-5 rounded-full blur-3xl`} />
                  
                  {/* Corner Accents with Animation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-0 right-0 w-32 h-32 overflow-hidden`}
                  >
                    <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${activeItem.gradient} opacity-20`} />
                  </motion.div>
                  
                  {/* Bottom Navigation Indicator */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 flex gap-2">
                    {timelineData.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                      >
                        <motion.div
                          animate={activeIndex === index ? {
                            scale: [1, 1.3, 1],
                          } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className={`w-2 h-2 rounded-full ${
                            activeIndex === index 
                              ? `bg-gradient-to-r ${activeItem.gradient}` 
                              : 'bg-gray-300'
                          }`}
                        />
                        {activeIndex === index && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -inset-1 rounded-full border border-gray-300"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </motion.button>
                    ))}
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

export default AboutPrinciples;