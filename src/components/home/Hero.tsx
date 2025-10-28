import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "AI-Powered Diagnosis",
      description: "Advanced artificial intelligence for accurate thyroid cancer detection",
      icon: "🔬"
    },
    {
      title: "Instant Results",
      description: "Get your diagnosis report within minutes, not days",
      icon: "⚡"
    },
    {
      title: "Expert Validation",
      description: "All results are verified by certified endocrinologists",
      icon: "👨‍⚕️"
    }
  ];

  const stats = [
    { number: "98%", label: "Accuracy Rate" },
    { number: "24/7", label: "Available" },
    { number: "50K+", label: "Patients Served" },
    { number: "2min", label: "Average Wait Time" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 to-secondary">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute rounded-full -top-24 -right-24 w-96 h-96 bg-primary/20 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full -bottom-24 -left-24 w-96 h-96 bg-secondary mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-primary/15 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 px-4 pt-20 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full text-primary bg-primary/10">
                🏆 Trusted by Medical Professionals Worldwide
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                Early Detection
                <span className="block text-transparent bg-clip-text bg-primary ">
                  Saves Lives
                </span>
              </h1>
              <p className="max-w-2xl mb-8 text-xl leading-relaxed text-gray-600">
                Revolutionary AI-powered platform for thyroid cancer diagnosis. 
                Get accurate, instant results with our cutting-edge technology 
                and expert medical validation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row lg:justify-start">
              <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-primary rounded-xl hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl">
                Start Free Diagnosis
              </button>
              <button className="px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 transform border-2 border-gray-300 rounded-xl hover:border-primary hover:text-primary hover:-translate-y-1">
                Watch Demo Video
              </button>
            </div>

            {/* Stats */}
            <div className="grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Animated Cards */}
          <div className="relative">
            {/* Main Feature Card */}
            <div className="p-8 transition-transform duration-300 transform bg-white border border-gray-100 shadow-2xl rounded-2xl hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-primary rounded-xl">
                  {features[currentSlide].icon}
                </div>
                <h3 className="ml-4 text-2xl font-bold text-gray-900">
                  {features[currentSlide].title}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-600">
                {features[currentSlide].description}
              </p>
              
              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute px-4 py-2 text-sm font-semibold text-white transform bg-green-500 rounded-full shadow-lg -top-4 -right-4 rotate-6">
              FDA Approved
            </div>
            <div className="absolute px-4 py-2 text-sm font-semibold text-white transform bg-orange-500 rounded-full shadow-lg -bottom-4 -left-4 -rotate-6">
              HIPAA Compliant
            </div>
          </div>
        </div>

        {/* Trust Badges */}
 
      </div>

      {/* Wave Divider */}
     
    </div>
  );
};

export default Hero;