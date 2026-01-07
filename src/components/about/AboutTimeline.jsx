"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaRocket, FaBrain, FaAward, FaGlobe, FaUsers, FaChartLine, FaChevronRight } from "react-icons/fa";

const AboutTimeline = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Primary color configuration - Updated to site primary teal
  const primaryColor = {
    light: "#6bb1be", 
    main: "#4695a5",  // Site Primary Teal
    dark: "#357a88", 
    gradient: "from-[#4695a5] to-[#5baab9]",
    gradientLight: "from-[#5baab9] to-[#7fbeca]",
    bgLight: "bg-[#f4f9fa]",
    bgCard: "bg-gradient-to-br from-white to-[#f4f9fa]"
  };

  const milestones = [
    {
      year: "2020",
      phase: "Clinical Vision",
      title: "Founding & Strategic Research",
      description: "Established the core objective: bridging the gap between advanced AI and clinical endocrinology to enable early, non-invasive thyroid screening.",
      icon: <FaRocket className="w-5 h-5" />,
      stat: "Consolidated Phase I",
      context: "R&D Center",
      details: ["Medical Feasibility", "Stakeholder Alignment"],
      tag: "ORIGIN",
    },
    {
      year: "2021",
      phase: "AI Intelligence",
      title: "Diagnostic Model Validation",
      description: "Successfully trained convolutional neural networks on diverse clinical datasets, reaching high sensitivity in identifying early-stage thyroid nodules.",
      icon: <FaBrain className="w-5 h-5" />,
      stat: "96.4% Precision",
      context: "Clinical Datasets",
      details: ["CNN Optimization", "Data Anonymization"],
      tag: "VALIDATION",
    },
    {
      year: "2022",
      phase: "Regulatory Pathway",
      title: "Pilot Deployments & Compliance",
      description: "Secured initial regulatory approvals and launched pilot programs across selected diagnostic centers, gathering critical physician feedback.",
      icon: <FaAward className="w-5 h-5" />,
      stat: "Regulatory Greenlight",
      context: "5 Pilot Sites",
      details: ["HIPAA Compliance", "Physician Beta"],
      tag: "REGULATORY",
    },
    {
      year: "2023",
      phase: "Network Expansion",
      title: "Enterprise Clinical Integration",
      description: "ThyroCareX became standard in regional hospitals, integrating seamlessly with existing EMR systems to provide real-time diagnostic support.",
      icon: <FaGlobe className="w-5 h-5" />,
      stat: "ISO 13485 Certified",
      context: "Regional Centers",
      details: ["EMR Integration", "Workflow Optimization"],
      tag: "ADOPTION",
    },
    {
      year: "2024",
      phase: "Precision Scaling",
      title: "Global AI Diagnostic Network",
      description: "Empowering a global network of specialists with cloud-native AI insights, ensuring every patient benefits from precision-driven thyroid care.",
      icon: <FaUsers className="w-5 h-5" />,
      stat: "50k+ Screenings",
      context: "Growth Hub",
      details: ["Continuous Learning", "Scalable Infrastructure"],
      tag: "FUTURE",
    },
  ];

  return (
    <section ref={containerRef} className="relative overflow-hidden py-10 bg-white">
      {/* Professional Background Artwork */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Abstract gradient backgrounds - cleaner for white background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4695a5]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4695a5]/[0.02] rounded-full blur-[100px]" />
        
        {/* Geometric pattern - slightly more visible on pure white */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%234695a5' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative px-6 mx-auto sm:px-8">
        {/* Professional Header */}
        <div className="relative mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-4 text-[11px] font-bold text-[#4695a5] uppercase tracking-[0.3em] bg-[#4695a5]/10 rounded-full border border-[#4695a5]/20"
          >
            Clinical Evolution
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl"
          >
            A Journey of <span className="text-[#4695a5]">Precision</span> Diagnostics
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#4695a5] to-transparent mx-auto mb-6 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto text-base leading-relaxed text-gray-500 font-medium"
          >
            Chronological milestones defining our commitment to transforming thyroid care through advanced intelligence and medical excellence.
          </motion.p>
        </div>

        {/* Main Timeline Container */}
        <div className="relative max-w-5xl mx-auto pb-10">
          {/* Animated Vertical Timeline - Enhanced with Glow & Traveling Pulse */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[3px] h-full bg-gray-50 hidden md:block overflow-hidden rounded-full">
            {/* Base Glow Line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#4695a5]/10 via-[#4695a5] to-[#4695a5]/10 origin-top shadow-[0_0_15px_rgba(70,149,165,0.6)]"
            />
            
            {/* Traveling Pulse Animation */}
            <motion.div
              animate={{ 
                top: ["-20%", "120%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                delay: 0.5
              }}
              className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-40 z-10"
            />
          </div>

          {/* Timeline Milestones - Compressed Spacing */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <TimelineItem 
                key={index} 
                milestone={milestone} 
                index={index} 
                isLast={index === milestones.length - 1}
                primaryColor={primaryColor}
              />
            ))}
          </div>

   
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index, isLast, primaryColor }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] // Custom ease-out cubic
      }}
      className={`relative flex flex-col md:flex-row items-center w-full gap-6 md:gap-0 ${
        isEven ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Year Section - Large and Transparent */}
      <div className={`w-full md:w-[45%] flex flex-col ${isEven ? "md:order-3 items-start md:pl-20" : "md:order-1 items-end md:pr-20"}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="relative">
            {/* Year Number with Minimalist Transparency - Enhanced Visibility */}
            <div className="relative flex items-center justify-center">
              <span className="text-[115px] md:text-[150px] font-black leading-none text-[#4695a5]/[0.12] select-none tracking-tighter filter blur-[0.5px] drop-shadow-[0_2px_4px_rgba(70,149,165,0.1)]">
                {milestone.year}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-black text-[#4695a5]/40 tracking-tight drop-shadow-sm">
                  {milestone.year}
                </span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ y: 5, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`flex flex-col -mt-6 ${isEven ? "items-start" : "items-end"}`}
          >
            <div className={`flex items-center gap-2 text-[#4695a5] text-[9px] font-extrabold bg-[#4695a5]/5 px-3 py-1 rounded-sm border border-[#4695a5]/10 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
              <FaChartLine className="w-2 h-2 opacity-50" />
              <span className="tracking-wider uppercase">{milestone.stat}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Center Connection Point - All Pulse Now */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="relative w-4 h-4 rounded-full bg-white border-2 border-[#4695a5]/40 shadow-md"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.8, 1], 
              opacity: [0.3, 0.8, 0.3],
              boxShadow: ["0 0 0px rgba(70,149,165,0)", "0 0 10px rgba(70,149,165,0.6)", "0 0 0px rgba(70,149,165,0)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-[2px] rounded-full border border-[#4695a5]/50" 
          />
          <div className="absolute inset-[2.5px] rounded-full bg-[#4695a5] shadow-[0_0_8px_rgba(70,149,165,0.4)]" />
        </motion.div>
      </div>

      {/* Content Card Section */}
      <div className={`w-full md:w-[45%] group ${isEven ? "md:order-1" : "md:order-3"}`}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative py-5 px-7 bg-white rounded-xl border border-[#4695a5]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(70,149,165,0.15)] transition-all duration-500 overflow-hidden"
        >
          {/* Advanced Dynamic Background Graphics - Bokeh & Tech Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700">
             <motion.svg 
               width="100%" height="100%" 
               initial={{ opacity: 0.04 }}
               whileHover={{ opacity: 0.15 }}
               className="transition-opacity duration-700"
             >
               <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M0 20h40M20 0v40" stroke="#4695a5" strokeWidth="0.5" fill="none" opacity="0.15" />
                 <circle cx="20" cy="20" r="1.5" fill="#4695a5" opacity="0.1" />
               </pattern>
               <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
               
               {/* Medical Tech "Resomat" symbols - Rotating Crosses */}
               <motion.path
                 d="M-5 -5 h10 M0 -5 v10"
                 stroke="#4695a5"
                 strokeWidth="1"
                 fill="none"
                 initial={{ opacity: 0, rotate: 0 }}
                 animate={{ 
                   opacity: [0, 0.2, 0],
                   rotate: 360,
                   x: ["10%", "90%"],
                   y: ["10%", "90%"]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute"
               />

               <motion.circle
                 cx="85%" cy="15%" r="35"
                 fill="#4695a5"
                 initial={{ opacity: 0.06, scale: 0.8 }}
                 animate={{ 
                   opacity: [0.06, 0.12, 0.06],
                   scale: [0.8, 1.1, 0.8],
                   x: [0, 15, 0]
                 }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               />

               {/* Animated floating medical pulses */}
               <motion.path
                 d="M 0 60 Q 30 30 60 60 T 120 60 T 180 60"
                 stroke="#4695a5"
                 strokeWidth="1.5"
                 fill="none"
                 initial={{ pathLength: 0, opacity: 0, x: -100 }}
                 animate={{ 
                   pathLength: [0, 1, 0], 
                   opacity: [0, 0.8, 0], 
                   x: [0, 400] 
                 }}
                 transition={{ 
                   duration: 5, 
                   repeat: Infinity, 
                   delay: index * 1.2,
                   ease: "linear"
                 }}
                 className="absolute top-1/2 left-0"
               />
             </motion.svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#4695a5] text-white shadow-lg shadow-[#4695a5]/20 group-hover:scale-105 transition-transform duration-500">
                <div className="transition-transform duration-500">
                  {milestone.icon}
                </div>
              </div>
              
              <div className="flex-1 pt-0.5 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-black text-[#4695a5] uppercase tracking-[0.25em] bg-[#4695a5]/10 px-2 py-0.5 rounded-md border border-[#4695a5]/5">
                    {milestone.tag}
                  </span>
                  {isLast && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-extrabold text-gray-900 leading-tight group-hover:text-[#4695a5] transition-colors duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
                  {milestone.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-snug mb-3 text-[13px] font-medium transition-colors duration-500 group-hover:text-gray-700">
              {milestone.description}
            </p>

            {/* Details Pills */}
            <div className="flex gap-1.5 flex-wrap pt-1 border-t border-gray-50 group-hover:border-[#4695a5]/10 transition-colors duration-500">
              {milestone.details.map((detail, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-0.5 text-[8px] font-bold text-[#4695a5] bg-[#4695a5]/5 rounded-lg border border-[#4695a5]/10 hover:bg-[#4695a5] hover:text-white transition-all duration-300 cursor-default"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutTimeline;