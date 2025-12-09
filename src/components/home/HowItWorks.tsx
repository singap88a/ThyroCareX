import { FaUpload, FaRobot, FaFileAlt, FaArrowRight, FaChartBar, FaCheckCircle } from 'react-icons/fa';
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
      features: ['HIPAA Compliant', 'Multiple Formats', 'Instant Upload'],
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      number: '02',
      title: 'AI Analysis & Processing',
      description: 'Our advanced AI algorithms analyze thyroid nodules, calculate cancer probability, and cross-reference with global medical databases.',
      features: ['98% Accuracy', 'Real-time Processing', 'Deep Learning'],
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      number: '03',
      title: 'Get Detailed Report',
      description: 'Receive comprehensive diagnosis reports with risk assessment, treatment recommendations, and specialist insights.',
      features: ['PDF Report', 'Doctor Validation', 'Follow-up Plan'],
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    }
  ];

  // Floating circles for background animation
  const FloatingCircles = () => {
    const circles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden rounded-[40px]">
        {circles.map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/5"
            style={{
              width: circle.size,
              height: circle.size,
              left: `${circle.x}%`,
              top: `${circle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: circle.duration,
              delay: circle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Animated connecting line with moving dots
  const AnimatedConnectingLine = () => (
    <div className="absolute left-0 right-0 z-0 hidden h-2 transform -translate-y-1/2 lg:block top-24">
      <div className="relative h-full overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full">
        {/* Moving dots on the line */}
        <motion.div
          className="absolute top-0 w-4 h-full bg-white/30 rounded-full"
          animate={{
            left: ['0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-0 w-3 h-full bg-white/40 rounded-full"
          animate={{
            left: ['0%', '100%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
      </div>
      
      {/* Pulsing dots at connection points */}
      {[0, 1, 2].map((point) => (
        <motion.div
          key={point}
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-4 border-blue-500"
          style={{
            left: `${(point + 1) * 25}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 0 rgba(59, 130, 246, 0.4)',
              '0 0 0 10px rgba(59, 130, 246, 0)',
              '0 0 0 0 rgba(59, 130, 246, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: point * 0.6,
          }}
        />
      ))}
    </div>
  );

  // Counter animation for stats
  const CounterAnimation = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    useEffect(() => {
      const step = end / (duration * 60); // 60fps
      const interval = setInterval(() => {
        countRef.current += step;
        if (countRef.current >= end) {
          countRef.current = end;
          clearInterval(interval);
        }
        setCount(Math.floor(countRef.current));
      }, 1000 / 60);

      return () => clearInterval(interval);
    }, [end, duration]);

    return <span>{count}%</span>;
  };

  // Animated arrow component
  const AnimatedArrow = ({ index }: { index: number }) => (
    <motion.div
      className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full shadow-lg group"
      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
      animate={{
        x: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: index * 0.3,
      }}
    >
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <FaArrowRight className="w-5 h-5 text-gray-600" />
      </motion.div>
    </motion.div>
  );

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-10 overflow-hidden"
    >
 
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header with enhanced animations */}
        <motion.div 
          className="text-center bg-gradient-to-b from-primary to-primary/5 rounded-t-[40px] py-5 relative overflow-hidden"
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
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary"
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
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-xl group rounded-2xl hover:shadow-2xl hover:-translate-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated number badge */}
                <motion.div 
                  className="absolute z-20 flex items-center justify-center w-16 h-16 text-lg font-bold text-white rounded-full shadow-lg -top-4 -right-4 bg-gradient-to-r from-gray-900 to-gray-700"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.number}
                </motion.div>

                {/* Particle effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Gradient Overlay with animation */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />

                <div className="relative p-8">
                  {/* Icon with floating animation */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    whileHover={{ rotate: [0, 10, -10, 0] }}
                  >
                    <motion.div 
                      className={`z-50 text-gray-700`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                    {step.title}
                  </h3>
                  
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  {/* Features List with staggered animation */}
                  <div className="mb-6 space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center text-sm text-gray-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: (index * 0.3) + (featureIndex * 0.1) }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <FaCheckCircle className={`w-4 h-4 mr-3 text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`} />
                        </motion.div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Step Indicator for Mobile */}
                  <div className="flex items-center justify-center pt-4 border-t border-gray-100 lg:hidden">
                    {index < steps.length - 1 && (
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2 text-sm">Next</span>
                        <FaArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border with animation */}
                <motion.div 
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${step.gradient}`}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Animated arrows between steps - Desktop */}
          <div className="absolute left-0 right-0 z-0 items-center justify-between hidden px-12 lg:flex top-24">
            {steps.slice(0, -1).map((_, index) => (
              <div 
                key={index} 
                className="flex justify-center flex-1 transform translate-y-4"
              >
                <AnimatedArrow index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-full max-w-2xl p-6 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-semibold text-gray-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <FaChartBar className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-700">98% Accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <FaRobot className="w-6 h-6 text-purple-500" />
                <span className="font-semibold text-gray-700">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;