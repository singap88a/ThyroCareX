import { FaUpload, FaRobot, FaFileAlt, FaArrowRight, FaChartBar, FaCheckCircle, FaShieldAlt, FaImages, FaClock, FaBrain, FaMicrochip, FaDatabase, FaFilePdf, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      icon: <FaUpload className="w-8 h-8" />,
      number: '01',
      title: 'Upload Medical Data',
      description: 'Securely upload patient thyroid scans, ultrasound images, and comprehensive medical history with end-to-end encryption.',
      features: [
        { text: 'HIPAA Compliant', icon: <FaShieldAlt />, color: 'text-blue-500' },
        { text: 'Multiple Formats', icon: <FaImages />, color: 'text-purple-500' },
        { text: 'Instant Upload', icon: <FaClock />, color: 'text-orange-500' }
      ],
      gradient: 'from-blue-500 via-blue-600 to-cyan-500',
      bgColor: 'bg-blue-50',
      spiralColor: '#3b82f6', // Solid color for SVG strokes
      shadowColor: 'shadow-blue-200'
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      number: '02',
      title: 'AI Analysis & Processing',
      description: 'Our advanced AI algorithms analyze thyroid nodules, calculate cancer probability, and cross-reference with global medical databases.',
      features: [
        { text: '98% Accuracy', icon: <FaBrain />, color: 'text-indigo-500' },
        { text: 'Real-time Processing', icon: <FaMicrochip />, color: 'text-cyan-500' },
        { text: 'Deep Learning', icon: <FaDatabase />, color: 'text-pink-500' }
      ],
      gradient: 'from-purple-500 via-purple-600 to-pink-500',
      bgColor: 'bg-purple-50',
      spiralColor: '#8b5cf6',
      shadowColor: 'shadow-purple-200'
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      number: '03',
      title: 'Get Detailed Report',
      description: 'Receive comprehensive diagnosis reports with risk assessment, treatment recommendations, and specialist insights.',
      features: [
        { text: 'PDF Report', icon: <FaFilePdf />, color: 'text-red-500' },
        { text: 'Doctor Validation', icon: <FaUserMd />, color: 'text-teal-500' },
        { text: 'Follow-up Plan', icon: <FaCalendarAlt />, color: 'text-yellow-500' }
      ],
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgColor: 'bg-green-50',
      spiralColor: '#10b981',
      shadowColor: 'shadow-green-200'
    }
  ];

  // Professional Animated Spiral Background - Adjusted Opacity (lighter)
  const AnimatedSpiralBackground = ({ color }: { color: string }) => (
    <div className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-none">
      {/* Dynamic Hand-drawn style Spirals - Slightly reduced opacity */}
      <motion.svg 
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10" 
        viewBox="0 0 400 400"
        fill="none"
      >
        <motion.path
          d="M200,200 m0,-150 a150,150 0 1,1 0,300 a150,150 0 1,1 0,-300"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="15,10"
          animate={{
            rotate: 360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ originX: "200px", originY: "200px" }}
        />
        <motion.path
          d="M200,200 m0,-100 a100,100 0 1,0 0,200 a100,100 0 1,0 0,-200"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="25,15"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ originX: "200px", originY: "200px" }}
        />
        {/* Wavy lines */}
        <motion.path
          d="M0,50 Q100,150 200,50 T400,50"
          stroke={color}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
         <motion.path
          d="M0,350 Q100,250 200,350 T400,350"
          stroke={color}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>
      
      {/* Floating Animated Shapes - Lighter */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-current rounded-full"
          style={{ 
            color: color,
            borderColor: color,
            width: Math.random() * 50 + 30 + 'px',
            height: Math.random() * 50 + 30 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.1 
          }}
          animate={{
            y: [0, -80, 0],
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20" />
    </div>
  );

  // New Professional Animated Number Indicator
  const ProfessionalNumber = ({ number, gradient, color }: { number: string, gradient: string, color: string }) => (
    <div className="absolute top-4 right-4 z-30 w-16 h-16 pointer-events-none">
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Animated Rotating Dashed Circle */}
        <motion.svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke={`url(#grad-ring-${number})`} 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="10,5"
          />
          <defs>
            <linearGradient id={`grad-ring-${number}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Counter-Rotating Inner Ring */}
        <motion.div 
          className="absolute inset-2 rounded-full border border-gray-100 opacity-50"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ borderTopColor: color, borderRightColor: 'transparent', borderBottomColor: color, borderLeftColor: 'transparent', borderWidth: '2px' }}
        />

        {/* Background Blob Animation */}
        <motion.div
          className={`absolute inset-1 rounded-full bg-gradient-to-br ${gradient} opacity-10`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* The Number */}
        <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br ${gradient} relative z-10`}>
          {number}
        </span>
      </div>
    </div>
  );

  // Enhanced Component: Connecting line with Primary Background & Moving Animation
  const AnimatedConnectingLine = () => (
    <div className="absolute left-0 right-0 z-0 hidden h-2 transform -translate-y-1/2 lg:block top-24 pointer-events-none">
      {/* Background - Primary Color */}
      <div className="w-full h-full bg-blue-100/50 rounded-full overflow-hidden relative">
        
        {/* Main Moving Line - Primary Gradient */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-blue-600 to-transparent"
          animate={{
            x: ['-100%', '400%']
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Bright Glowing Head */}
        <motion.div 
             className="absolute top-1/2 -translate-y-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[2px]"
             animate={{
                left: ['-20%', '120%']
            }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
            }}
        />
      </div>
    </div>
  );

  // Animated arrow component
  const AnimatedArrow = ({ index }: { index: number }) => (
    <motion.div
      className="flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm group"
      whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
    >
      <FaArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
    </motion.div>
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-10 overflow-hidden"
    >
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header with enhanced animations - RESTORED ORIGINAL */}
        <motion.div 
          className="text-center bg-gradient-to-b from-primary to-primary/10 rounded-t-[40px]  pt-10 relative overflow-hidden mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Animated particles in header */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div 
            className="inline-flex items-center px-4 py-1 mb-4 text-sm font-medium rounded-full text-primary bg-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🎯 SIMPLE 3-STEP PROCESS
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            How Our AI Diagnosis
            <motion.span 
              className="block text-primary  "
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              Platform Works
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            From medical data upload to comprehensive diagnosis - our platform makes thyroid cancer 
            detection accessible, accurate, and secure in just three simple steps.
          </motion.p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          <AnimatedConnectingLine />

          {/* Steps Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={`relative overflow-hidden transition-all duration-500 bg-white rounded-3xl group hover:-translate-y-2 ${step.shadowColor} shadow-md hover:shadow-xl`}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Animated Spiral Background - Lighter Opacity */}
                <AnimatedSpiralBackground color={step.spiralColor} />

                {/* Card Content Container */}
                <div className="relative h-full p-8 backdrop-blur-[1px]">
                  
                  {/* Professional Animated Number */}
                  <ProfessionalNumber 
                    number={step.number} 
                    gradient={step.gradient} 
                    color={step.spiralColor} 
                  />

                  {/* Icon Area */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-gray-700 relative z-10 transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="mb-6 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>

                  {/* Features List (Clean, No Border/Bg) */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: (index * 0.2) + (featureIndex * 0.1) + 0.5 }}
                      >
                        <span className={`text-lg ${feature.color}`}>
                          {feature.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Animated Bottom Border Line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.gradient}`}
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute left-0 right-0 z-0 items-center justify-between hidden px-12 lg:flex top-24 pointer-events-none">
            {steps.slice(0, -1).map((_, index) => (
              <div key={index} className="flex justify-center flex-1 transform translate-y-8 translate-x-12 opactiy-50">
                <AnimatedArrow index={index} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Trust Indicators */}
        <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-8 py-4 px-8 bg-white/50 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm">
                 <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <FaCheckCircle className="text-green-500" /> HIPAA Compliant
                 </div>
                 <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
                 <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <FaChartBar className="text-blue-500" /> 98% Accuracy
                 </div>
                 <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
                 <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <FaRobot className="text-purple-500" /> AI Powered
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;