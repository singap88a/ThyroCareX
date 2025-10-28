import { 
  FaBrain, 
  FaClock, 
  FaUserMd, 
  FaShieldAlt, 
  FaChartLine, 
  FaMobileAlt 
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBrain className="text-purple-600 w-7 h-7" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze thyroid scans with 98% accuracy, detecting even the earliest signs of cancer.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      stats: "98% Accuracy",
    },
    {
      icon: <FaClock className="text-blue-600 w-7 h-7" />,
      title: "Instant Results",
      description:
        "Get comprehensive diagnosis reports in under 5 minutes, eliminating weeks of waiting for lab results and specialist appointments.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      stats: "5 Min Results",
    },
    {
      icon: <FaUserMd className="text-green-600 w-7 h-7" />,
      title: "Expert Validation",
      description:
        "Every diagnosis is reviewed and validated by our team of certified endocrinologists and oncology specialists.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      stats: "24/7 Experts",
    },
    {
      icon: <FaShieldAlt className="text-orange-600 w-7 h-7" />,
      title: "Military-Grade Security",
      description:
        "Your medical data is protected with HIPAA-compliant encryption and blockchain technology for maximum privacy.",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      stats: "100% Secure",
    },
    {
      icon: <FaChartLine className="text-indigo-600 w-7 h-7" />,
      title: "Progress Tracking",
      description:
        "Monitor your health journey with detailed analytics, trend reports, and personalized recovery recommendations.",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      stats: "Real-time Tracking",
    },
    {
      icon: <FaMobileAlt className="text-teal-600 w-7 h-7" />,
      title: "Mobile First",
      description:
        "Access your diagnosis and medical reports anytime, anywhere with our fully optimized mobile application.",
      gradient: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50",
      stats: "Anywhere Access",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-white">
 

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full text-primary bg-primary/10">
            🚀 WHY CHOOSE THYROCAREX
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Revolutionary Thyroid Cancer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">
              Diagnosis Platform
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
            Combining cutting-edge artificial intelligence with medical expertise 
            to deliver the most accurate and accessible thyroid cancer diagnosis available today.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Hover Overlay (subtle) */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              <div className="relative p-8">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="flex-1 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-left text-gray-600">
                  {feature.description}
                </p>

                {/* Stat Badge */}
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${feature.gradient} text-white shadow-md`}
                >
                  {feature.stats}
                </div>

                {/* Hover Line Animation */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${feature.gradient} group-hover:w-full transition-all duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
