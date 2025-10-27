import { FaUsers, FaUserMd, FaPercentage, FaClock, FaGlobe, FaHeart, FaShieldAlt, FaRocket } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    { 
      icon: <FaUsers className="w-8 h-8" />, 
      label: 'Patients Diagnosed', 
      value: '10K+',
      description: 'Happy patients worldwide',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: <FaUserMd className="w-8 h-8" />, 
      label: 'Medical Experts', 
      value: '200+',
      description: 'Certified specialists',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: <FaPercentage className="w-8 h-8" />, 
      label: 'AI Accuracy Rate', 
      value: '99.2%',
      description: 'Clinical precision',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    { 
      icon: <FaClock className="w-8 h-8" />, 
      label: 'Medical Support', 
      value: '24/7',
      description: 'Always available',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full w-72 h-72 opacity-20"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-purple-200 rounded-full w-96 h-96 opacity-20"></div>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            📊 OUR ACHIEVEMENTS
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Making a Real
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Impact in Healthcare
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Transforming thyroid cancer diagnosis through innovative technology and 
            trusted medical expertise that delivers real results.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 text-center">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <div className={`text-gray-700`}>
                    {stat.icon}
                  </div>
                </div>

                {/* Value */}
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-500">
                  {stat.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.gradient} group-hover:w-3/4 transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3">
              <FaGlobe className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-gray-700">Global Reach</span>
            </div>
            <div className="flex items-center gap-3">
              <FaHeart className="w-6 h-6 text-red-500" />
              <span className="font-semibold text-gray-700">Patient First</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <FaRocket className="w-6 h-6 text-purple-500" />
              <span className="font-semibold text-gray-700">Fast Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;