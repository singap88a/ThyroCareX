import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { 
  FaBrain, 
  FaClock, 
  FaUserMd, 
  FaShieldAlt, 
  FaChartLine, 
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze thyroid scans with 98% accuracy, detecting even the earliest signs .",
      gradient: "from-purple-700 to-pink-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-700",
      stats: "98% Accuracy",
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get comprehensive diagnosis reports in under 5 minutes, eliminating weeks of waiting for lab results and ",
      gradient: "from-blue-700 to-cyan-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
      iconColor: "text-blue-700",
      stats: "5 Min Results",
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Expert Validation",
      description: "Every diagnosis is reviewed and validated by our team of certified endocrinologists and oncology specialists.",
      gradient: "from-green-700 to-emerald-700",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-700",
      stats: "24/7 Experts",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Military-Grade  ",
      description: "Your medical data is protected with HIPAA-compliant encryption and blockchain technology for maximum .",
      gradient: "from-orange-700 to-red-700",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      iconBg: "bg-gradient-to-br from-orange-100 to-red-100",
      iconColor: "text-orange-700",
      stats: "100% Secure",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your health journey with detailed analytics, trend reports, and personalized recovery recommendations.",
      gradient: "from-indigo-700 to-purple-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
      iconBg: "bg-gradient-to-br from-indigo-100 to-purple-100",
      iconColor: "text-indigo-700",
      stats: "Real-time Tracking",
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: "Mobile First",
      description: "Access your diagnosis and medical reports anytime, anywhere with our fully optimized mobile application.",
      gradient: "from-teal-700 to-blue-700",
      bgColor: "bg-gradient-to-br from-teal-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-teal-100 to-blue-100",
      iconColor: "text-teal-700",
      stats: "Anywhere Access",
    },
  ];

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
       
      
 




 

 

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center ">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white rounded-full shadow-lg text-primary bg-primary">
            <span className="mr-2">🚀</span> WHY CHOOSE THYROCAREX
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Revolutionary Thyroid Cancer
            <span className="block mt-2 text-primary">
              Diagnosis Platform
            </span>
          </h2>
          <p className="max-w-3xl pb-10 mx-auto text-lg font-light leading-relaxed text-gray-600">
            Combining cutting-edge artificial intelligence with medical expertise 
            to deliver the most accurate and accessible thyroid cancer diagnosis available today.
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative px-2 lg:px-8">
    
          
  

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 35,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.feature-prev-btn',
              nextEl: '.feature-next-btn',
            }}
            pagination={{
              clickable: true,
              el: '.feature-pagination',
              type: 'bullets',
              bulletClass: 'swiper-pagination-bullet bg-gray-300',
              bulletActiveClass: 'swiper-pagination-bullet-active bg-gradient-to-r from-blue-500 to-purple-500',
            }}
            loop={true}
            speed={800}
            grabCursor={true}
            className="pb-16 features-swiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full pb-10">
                  <div className={`relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100   group rounded-3xl hover:shadow-3xl hover:-translate-y-2 h-full ${feature.bgColor}`}>
                    {/* Background Pattern for Card */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute w-16 h-16 top-4 right-4">
                        <svg viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                        </svg>
                      </div>
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl`}></div>
                    
                    {/* Corner Accents */}
                    <div className={`absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl`}>
                      <div className={`absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-r ${feature.gradient} opacity-10`}></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full p-8">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                          <div className={`${feature.iconColor}`}>
                            {feature.icon}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                            {feature.title}
                          </h3>
                          {/* Stat Badge */}
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.gradient} text-white shadow-sm`}>
                            {feature.stats}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="flex-grow mb-8 leading-relaxed text-left text-gray-600">
                        {feature.description}
                      </p>

                      {/* Hover Indicator */}
                      <div className="mt-auto">
                        <div className="flex items-center text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-primary">
                          <span>Learn more</span>
                          <div className="w-6 h-px ml-2 transition-all duration-300 bg-gray-300 group-hover:bg-primary group-hover:w-8"></div>
                          <svg className="w-4 h-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </div>
                      </div>

                      {/* Animated Bottom Line */}
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 feature-pagination swiper-pagination"></div>
        </div>
      </div>

 
    </section>
  );
};

export default Features;