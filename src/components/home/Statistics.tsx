import { useState, useEffect, useRef } from 'react';

const ProfessionalAnalyticsSection = () => {
  const [counters, setCounters] = useState({
    patients: 0,
    experts: 0,
    accuracy: 0
  });

  const [showVideo, setShowVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounterAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounterAnimation = () => {
    const targetValues = { 
      patients: 10427, 
      experts: 213, 
      accuracy: 99.2 
    };
    
    const duration = 1800;
    const steps = 80;
    
    const easeOutQuad = (t: number) => t * (2 - t);

    let startTime: number | null = null;

    const animateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setCounters({
        patients: Math.floor(targetValues.patients * easedProgress),
        experts: Math.floor(targetValues.experts * easedProgress),
        accuracy: parseFloat((targetValues.accuracy * easedProgress).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        // Set final values precisely
        setCounters({
          patients: targetValues.patients,
          experts: targetValues.experts,
          accuracy: targetValues.accuracy
        });
      }
    };

    requestAnimationFrame(animateCounters);
  };

  const handleVideoOpen = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  const primaryColor = "from-primary to-primary";
  const primaryColorSolid = "bg-gradient-to-r from-primary to-primary";

  const features = [
    {
      title: "AI-Powered Diagnostics",
      description: "Advanced machine learning algorithms analyze thyroid scans with unprecedented accuracy.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3v18M3 9h18M9 21l6-18M21 9l-18 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      points: [
        {
          text: "Real-time Analysis",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          )
        },
        {
          text: "Pattern Recognition",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          )
        },
        {
          text: "Automated Reports",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "Expert Medical Review",
      description: "Connect with board-certified thyroid specialists for second opinions and treatment planning.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 13.5A9 9 0 0112 21" strokeLinecap="round"/>
        </svg>
      ),
      points: [
        {
          text: "Board Certified",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15l-2-2 1.5-1.5L12 12l2.5-2.5L16 13l-2 2z"/>
              <path d="M20 7h-5.5L12 2l-2.5 5H4l4.5 3.5L6 17l6-4 6 4-2.5-6.5L20 7z"/>
            </svg>
          )
        },
        {
          text: "Quick Response",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          )
        },
        {
          text: "Detailed Feedback",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden ">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-[800] bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden">
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={handleVideoClose}
              className="absolute right-0 p-3 text-white transition-colors -top-12 hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-96 h-96 bg-gradient-to-tl from-primary/10 to-transparent blur-3xl animate-pulse"></div>
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-16 pb-12">
          <div className="flex flex-col items-center justify-between gap-8 mb-12 md:flex-row">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium tracking-wide uppercase rounded-full text-primary bg-primary/10">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary"></span>
                Precision Healthcare
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Thyroid Cancer
                <span className="block text-transparent bg-gradient-to-r from-primary to-primary bg-clip-text">
                  Diagnostic Platform
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Combining AI technology with medical expertise for accurate, fast, and accessible thyroid cancer diagnosis.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primary rounded-xl hover:-translate-y-1">
                Get Started
              </button>
              <button className="px-8 py-3.5 font-semibold text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-xl hover:bg-gray-50">
                Schedule Demo
              </button>
              <button className="px-8 py-3.5 font-semibold text-primary transition-all duration-300 bg-primary/10 rounded-xl hover:bg-primary/20">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
{/* Left Section: Split Color Image */}
<div className="relative group">
  <div className="relative h-[628px] overflow-hidden rounded-3xl">

    {/* Main Image */}
    <img
      src="/Gland_shape.png"
      alt="Medical Technology Interface"
      className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
    />

    {/* Black Gradient Overlay */}
    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Content Overlay */}
    <div className="absolute bottom-0 left-0 right-0 z-30 p-8">
      <div className="max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Real-time Diagnostic Interface
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
          Experience our intuitive dashboard that provides instant AI analysis with detailed visualization.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleVideoOpen}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Demo
          </button>

          <button className="px-6 py-3 font-semibold text-white transition-all duration-300 border rounded-xl border-white/30 hover:bg-white/10">
            Learn More
          </button>
        </div>
      </div>
    </div>

  </div>
</div>


          {/* Right Section: Stats + Features */}
          <div className="flex flex-col gap-5">
            {/* Global Impact Statistics - الجزء المحسن */}
            <div
              ref={statsRef}
              className={`p-8 bg-white border border-gray-200 rounded-3xl transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Header مع أيقونة متحركة */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 text-white rounded-xl bg-gradient-to-r from-primary to-primary">
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 opacity-0 rounded-xl bg-gradient-to-r from-primary to-primary animate-ping"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        Global Impact
                      </h3>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold tracking-wide uppercase rounded-full text-primary bg-primary/10">
                        Live
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Trusted by healthcare professionals worldwide
                    </p>
                  </div>
                </div>
                
                <div className="items-center hidden gap-2 md:flex text-primary animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Updating...</span>
                </div>
              </div>
              
              {/* Stats Grid مع تأثيرات متطورة */}
              <div className="grid grid-cols-3 gap-6 md:gap-8">
                {/* Patients Counter */}
                <div className="relative p-4 text-center transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl group hover:border-primary/20 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 transition-opacity opacity-100 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  
                  {/* <div className="inline-flex p-3 mb-4 border-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/15 group-hover:to-primary/10 border-primary">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div> */}

                  <div className="relative">
                    <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                      <span className="text-transparent bg-gradient-to-r from-primary to-primary bg-clip-text">
                        {counters.patients.toLocaleString()}
                      </span>
                      <span className="text-primary">+</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-600">Patients Treated</div>
                    <div className="mt-1 text-xs text-gray-400">Across 42 countries</div>
                  </div>
                  
                  <div className="absolute bottom-0 w-8 h-px transform -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-primary"></div>
                </div>

                {/* Experts Counter */}
                <div className="relative p-4 text-center transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl group hover:border-primary/20 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 transition-opacity opacity-100 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent"></div>
{/*
                  <div className="inline-flex p-3 mb-4 border-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/15 group-hover:to-primary/10 border-primary">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div> */}

                  <div className="relative">
                    <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                      <span className="text-transparent bg-gradient-to-r from-primary to-primary bg-clip-text">
                        {counters.experts}
                      </span>
                      <span className="text-primary">+</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-600">Medical Experts</div>
                    <div className="mt-1 text-xs text-gray-400">Board certified specialists</div>
                  </div>

                  <div className="absolute bottom-0 w-8 h-px transform -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-primary"></div>
                </div>

                {/* Accuracy Counter */}
                <div className="relative p-4 text-center transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl group hover:border-primary/20 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 transition-opacity opacity-100 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  {/*                               
                  <div className="inline-flex p-3 mb-4 border-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/15 group-hover:to-primary/10 border-primary">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div> */}

                  <div className="relative">
                    <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                      <span className="text-transparent bg-gradient-to-r from-primary to-primary bg-clip-text">
                        {counters.accuracy}%
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-600">Diagnostic Accuracy</div>
                    <div className="mt-1 text-xs text-gray-400">Clinically validated</div>
                  </div>
                  
             
                </div>
              </div>
 
            </div>

            {/* Features Grid - تصميم أبسط */}
            <div className="flex gap-5">
              {features.map((feature, index) => (
                <div key={index} className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-3xl">
                  <div className="">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center p-3 text-white rounded-md bg-primary">
                        {feature.icon}
                      </div>
                      <div className="">
                        <h4 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h4>
                      </div>
                    </div>

                    <p className="mb-4 text-gray-600">{feature.description}</p>

                    <div className="space-y-2">
                      {feature.points.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-left">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                            <div className="text-primary">
                              {point.icon}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalAnalyticsSection;