import { useState, useEffect } from 'react';
import Lottie from "lottie-react";

// Separated AnimatedWaveShape component
const AnimatedWaveShape = ({ waveAnimation, showWaveLayer1, showWaveLayer2, showWaveLayer3 }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Layer 3: Deepest Wave (Lightest Color) - تظهر رابعاً */}
      <div className={`absolute right-0 w-full h-full transition-all duration-700 ${showWaveLayer3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <svg className={`w-full h-full text-[#d8edf1]/40 ${waveAnimation ? 'wave-entrance' : ''}`} viewBox="0 0 500 800" preserveAspectRatio="none">
          <path d="M 500,0 L 250,0 C 350,170 380,370 200,570 C 50,720 -20,770 -50,800 L 500,800 Z" fill="currentColor" className={waveAnimation ? '' : 'wave-animate-3'} />
        </svg>
      </div>
      
      {/* Layer 2: Middle Wave - تظهر ثالثاً */}
      <div className={`absolute right-0 w-full h-full transition-all duration-700 ${showWaveLayer2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{transitionDelay: showWaveLayer2 ? '0.2s' : '0s'}}>
        <svg className={`w-full h-full text-[#a8d4dd]/50 ${waveAnimation ? 'wave-entrance' : ''}`} viewBox="0 0 500 800" preserveAspectRatio="none">
          <path d="M 500,0 L 300,0 C 400,160 430,360 250,560 C 100,710 30,760 -20,800 L 500,800 Z" fill="currentColor" className={waveAnimation ? '' : 'wave-animate-2'} />
        </svg>
      </div>
      
      {/* Layer 1: Front Wave (Main Gradient) - تظهر ثانياً */}
      <div className={`absolute right-0 w-full h-full transition-all duration-700 ${showWaveLayer1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{transitionDelay: showWaveLayer1 ? '0.1s' : '0s'}}>
        <svg className={`w-full h-full ${waveAnimation ? 'wave-entrance' : ''}`} viewBox="0 0 500 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mainWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5CA5B5" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#4695a5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3A7A8D" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="waveHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M 500,0 L 350,0 C 450,150 480,350 300,550 C 150,700 50,750 0,800 L 500,800 Z" 
            fill="url(#mainWaveGradient)" 
            className={waveAnimation ? '' : 'wave-animate-1'}
          />
          {/* Wave highlight effect */}
          <path 
            d="M 350,0 C 450,150 480,350 300,550 C 150,700 50,750 0,800" 
            fill="none" 
            stroke="url(#waveHighlight)" 
            strokeWidth="3"
            className={waveAnimation ? '' : 'wave-animate-1'}
          />
        </svg>
      </div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      
      {/* Shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

const AuthWave = () => {
  const [loaded, setLoaded] = useState(false);
  const [doctorAnimation, setDoctorAnimation] = useState(null);
  const [waveAnimation, setWaveAnimation] = useState(false);
  const [showWaveLayer1, setShowWaveLayer1] = useState(false);
  const [showWaveLayer2, setShowWaveLayer2] = useState(false);
  const [showWaveLayer3, setShowWaveLayer3] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    // تسلسل ظهور الأنيميشين
    setTimeout(() => {
      setLoaded(true);
      setShowLottie(true);
      
      // ظهور الطبقات بالتسلسل
      setTimeout(() => setShowWaveLayer1(true), 300);
      setTimeout(() => setShowWaveLayer2(true), 600);
      setTimeout(() => setShowWaveLayer3(true), 900);
      
      // تشغيل أنيميشين الموجة المؤقت
      setWaveAnimation(true);
      
      // إيقاف أنيميشين الموجة بعد الانتهاء
      setTimeout(() => {
        setWaveAnimation(false);
      }, 2000);
    }, 300);
    
    // تحميل animation JSON
    const loadAnimation = async () => {
      try {
        const response = await fetch('/Animation/DNA-Doctor.json');
        const animationData = await response.json();
        setDoctorAnimation(animationData);
      } catch (error) {
        console.error("Failed to load animation:", error);
        setDoctorAnimation({
          v: "5.7.4",
          fr: 60,
          ip: 0,
          op: 180,
          w: 500,
          h: 500,
          nm: "DNA Doctor Animation",
          ddd: 0,
          assets: [],
          layers: []
        });
      }
    };

    loadAnimation();
  }, []);

  return (
      <div className="absolute top-0 right-0 h-full w-[45%] hidden lg:block overflow-hidden pointer-events-none z-10">
        <div className={`w-full h-full relative transition-all duration-1000 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}>
          
          {/* Lottie Animation - DNA Doctor (تظهر أولاً) */}
          <div className={`absolute inset-0 z-40 flex items-center justify-center -top-36 -left-48 transition-all duration-700 ${showLottie ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {doctorAnimation ? (
              <div className="flex items-center justify-center w-full h-full">
                <Lottie
                  animationData={doctorAnimation}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px',
                    maxHeight: '500px'
                  }}
                  className="opacity-90"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary/30 border-t-primary animate-spin"></div>
                  <p className="font-medium text-primary">Loading animation...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Wave Layers تظهر بالتسلسل بعد Lottie */}
          <AnimatedWaveShape 
            waveAnimation={waveAnimation}
            showWaveLayer1={showWaveLayer1}
            showWaveLayer2={showWaveLayer2}
            showWaveLayer3={showWaveLayer3}
          />
          
          {/* Floating elements */}
          <div className="absolute z-20 top-1/4 right-1/4 animate-float-slow">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/10 to-[#5CA5B5]/10 blur-sm"></div>
          </div>
          <div className="absolute z-20 bottom-1/3 right-1/3 animate-float-delayed">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5CA5B5]/5 to-primary/5 blur-sm"></div>
          </div>
        </div>

        <style>{`
        :root {
          --primary: #4695a5;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite 1s;
        }
        
        /* Wave entrance animation for first time only */
        @keyframes waveEntrance {
          0% { 
            transform: translateX(100%) scaleX(0.5);
            opacity: 0;
          }
          70% {
            transform: translateX(0) scaleX(1.05);
            opacity: 0.8;
          }
          100% { 
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
        }
        
        .wave-entrance {
          animation: waveEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        /* Wave entrance from right */
        @keyframes waveFromRight {
          0% { 
            transform: translateX(100%);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .wave-from-right {
          animation: waveFromRight 0.8s ease-out forwards;
        }
        
        /* Static wave animation (after entrance) */
        @keyframes waveFlow {
          0%, 100% { 
            d: path("M 500,0 L 350,0 C 450,150 480,350 300,550 C 150,700 50,750 0,800 L 500,800 Z");
          }
          50% { 
            d: path("M 500,0 L 370,0 C 470,180 500,380 320,570 C 180,720 80,770 20,800 L 500,800 Z"); 
          }
        }
        
        @keyframes waveFlow2 {
          0%, 100% { 
            d: path("M 500,0 L 300,0 C 400,160 430,360 250,560 C 100,710 30,760 -20,800 L 500,800 Z");
          }
          50% { 
            d: path("M 500,0 L 320,0 C 420,190 450,390 270,580 C 130,730 60,780 0,800 L 500,800 Z"); 
          }
        }
        
        @keyframes waveFlow3 {
          0%, 100% { 
            d: path("M 500,0 L 250,0 C 350,170 380,370 200,570 C 50,720 -20,770 -50,800 L 500,800 Z");
          }
          50% { 
            d: path("M 500,0 L 270,0 C 370,200 400,400 220,590 C 80,740 10,790 -30,800 L 500,800 Z"); 
          }
        }
        
        .wave-animate-1 {
          animation: waveFlow 12s ease-in-out infinite;
        }
        
        .wave-animate-2 {
          animation: waveFlow2 15s ease-in-out infinite;
        }
        
        .wave-animate-3 {
          animation: waveFlow3 18s ease-in-out infinite;
        }
      `}</style>
      </div>
  );
};

export default AuthWave;
