import { FaUpload, FaRobot, FaFileAlt, FaArrowRight, FaChartBar, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
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

  return (
    <section className="relative py-20 overflow-hidden ">
       
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full text-primary bg-primary/10">
            🎯 SIMPLE 3-STEP PROCESS
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            How Our AI Diagnosis
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">
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
          {/* Connecting Line - Desktop */}
          <div className="absolute left-0 right-0 z-0 hidden h-1 transform -translate-y-1/2 lg:block top-24 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 animate-pulse"></div>
          </div>

          {/* Steps Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-xl group rounded-2xl hover:shadow-2xl hover:-translate-y-4"
              >
                {/* Number Badge */}
                <div className="absolute z-20 flex items-center justify-center w-16 h-16 text-lg font-bold text-white rounded-full shadow-lg -top-4 -right-4 bg-gradient-to-r from-gray-900 to-gray-700">
                  {step.number}
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative p-8">
                  {/* Icon Container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16  rounded-2xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={`z-50 text-gray-700`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                    {step.title}
                  </h3>
                  
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6 space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <FaCheckCircle className={`w-4 h-4 mr-3 text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`} />
                        {feature}
                      </div>
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

                {/* Hover Effect Border */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Arrows between steps - Desktop */}
          <div className="absolute left-0 right-0 z-0 items-center justify-between hidden px-12 lg:flex top-24">
            {steps.slice(0, -1).map((_, index) => (
              <div 
                key={index} 
                className="flex justify-center flex-1 transform translate-y-4"
              >
                <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-white border-2 border-gray-200 rounded-full shadow-lg">
                  <FaArrowRight className="w-5 h-5" />
                </div>
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