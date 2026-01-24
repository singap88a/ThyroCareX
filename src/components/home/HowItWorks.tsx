import { FaUpload, FaRobot, FaFileAlt, FaArrowRight, FaChartBar, FaCheckCircle, FaShieldAlt, FaImages, FaClock, FaBrain, FaMicrochip, FaDatabase, FaFilePdf, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { useRef } from 'react';

const HowItWorks = () => {
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

  // Background Animation Removed for Performance

  // Professional Animated Number Indicator - Original Version
  const ProfessionalNumber = ({ number, gradient, color }: { number: string, gradient: string, color: string }) => (
    <div className="absolute top-4 right-4 z-30 w-16 h-16 pointer-events-none">
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Animated Rotating Dashed Circle */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full"
          style={{ animation: 'rotate-slow 10s linear infinite' }}
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
        </svg>

        {/* Counter-Rotating Inner Ring */}
        <div 
          className="absolute inset-2 rounded-full border opacity-50"
          style={{ 
            borderTopColor: color, 
            borderRightColor: 'transparent', 
            borderBottomColor: color, 
            borderLeftColor: 'transparent', 
            borderWidth: '2px',
            animation: 'rotate-slow-reverse 15s linear infinite'
          }}
        />

        {/* Background Blob Animation */}
        <div
          className={`absolute inset-1 rounded-full bg-gradient-to-br ${gradient} opacity-10`}
          style={{
            animation: 'pulse-blob 3s ease-in-out infinite'
          }}
        />

        {/* The Number */}
        <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br ${gradient} relative z-10`}>
          {number}
        </span>
      </div>
    </div>
  );

  // Connecting line - Animation Removed for Performance
  const ConnectingLine = () => (
    <div className="absolute left-0 right-0 z-0 hidden h-2 transform -translate-y-1/2 lg:block top-24 pointer-events-none">
      <div className="w-full h-full bg-blue-100/50 rounded-full"></div>
    </div>
  );

  // Arrow component - Animation Removed
  const Arrow = () => (
    <div className="flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm">
      <FaArrowRight className="w-4 h-4 text-gray-400" />
    </div>
  );

  // Intersection Observer Removed for Performance

  return (
    <section 
      ref={sectionRef} 
      className="relative py-10 overflow-hidden"
    >
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header with Professional Background Animation */}
        <div className="text-center bg-gradient-to-b from-primary to-primary/10 rounded-t-[40px]  pt-10 relative overflow-hidden mb-12">
          {/* Professional Animated Grid Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234695a5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }} />
          
          {/* Subtle Shimmer Effect */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(70, 149, 165, 0.1) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite'
            }}
          />

          <div className="inline-flex items-center px-4 py-1 mb-4 text-sm font-medium rounded-full text-primary bg-white shadow-lg">
            🎯 SIMPLE 3-STEP PROCESS
          </div>
          
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            How Our AI Diagnosis
            <span className="block text-primary">
              Platform Works
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            From medical data upload to comprehensive diagnosis - our platform makes thyroid cancer 
            detection accessible, accurate, and secure in just three simple steps.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          <ConnectingLine />

          {/* Steps Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden bg-white rounded-3xl group ${step.shadowColor} shadow-md hover:shadow-xl`}
              >
                {/* Simple Background Animation */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden rounded-3xl">
                  <div 
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${step.spiralColor} 0%, transparent 70%)`,
                      animation: 'float-gentle 6s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${step.spiralColor} 0%, transparent 70%)`,
                      animation: 'float-gentle 8s ease-in-out infinite reverse',
                      animationDelay: '1s'
                    }}
                  />
                </div>

                {/* Card Content Container */}
                <div className="relative h-full p-8 backdrop-blur-[1px]">
                  
                  {/* Professional Number */}
                  <ProfessionalNumber 
                    number={step.number} 
                    gradient={step.gradient}
                    color={step.spiralColor}
                  />

                  {/* Icon Area */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} mb-6`}>
                    <div className="text-gray-700 relative z-10">
                      {step.icon}
                    </div>
                  </div>

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
                      <div 
                        key={featureIndex} 
                        className="flex items-center gap-3"
                      >
                        <span className={`text-lg ${feature.color}`}>
                          {feature.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Arrows - Animation Removed */}
          <div className="absolute left-0 right-0 z-0 items-center justify-between hidden px-12 lg:flex top-24 pointer-events-none">
            {steps.slice(0, -1).map((_, index) => (
              <div key={index} className="flex justify-center flex-1 transform translate-y-8 translate-x-12 opactiy-50">
                <Arrow />
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
      
      <style>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;