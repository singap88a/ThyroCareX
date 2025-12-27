import { useEffect, useState, useRef } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import Lottie from "lottie-react";

const Login = () => {
  const [loaded, setLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const waveContainerRef = useRef(null);
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
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white">
      
      {/* ========== LEFT CONTENT (Form) ========== */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24 mt-16">
        <div className="w-full max-w-md mx-auto animate-fadeIn">
          
          {/* Logo / Header */}
          <div className="mb-12">
            <div className="relative inline-block w-full">
              <div className="flex items-center mb-2">
{/* أيقونة الدرع الطبي */}
<div className="flex items-center justify-center w-10 h-10 mr-3 shadow-sm bg-gradient-to-br from-blue-50 to-primary/10 rounded-xl">
  <svg 
    className="w-7 h-7 text-primary" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
</div>
                <h1 className="text-[1.7rem] font-bold tracking-tight text-gray-900">
                  <span className="relative font-extrabold text-primary">
                    Welcome Back
                    <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full transform -translate-y-1"></span>
                  </span>
                  <span className="ml-2 font-extrabold text-gray-700">
                    to MediSys Pro
                  </span>
                </h1>
              </div>
              <p className="ml-12 text-sm font-medium text-gray-600">
                Sign in to access your medical dashboard
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Username */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                </div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="w-full py-4 pr-4 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full py-4 pr-12 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors cursor-pointer hover:text-primary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-2 text-sm">
              <label className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-gray-700">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary/50" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-medium text-gray-400 transition-colors hover:text-primary">
                Forgot Password?
              </a>
            </div>

            {/* Create Account Link */}
            <div className="pt-2 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="font-semibold transition-all duration-300 text-primary hover:underline">
                  Create Account
                </a>
              </p>
            </div>

            <div className="flex pt-4">
              <button className="flex-1 py-4 px-6 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========== ANIMATED WAVE SECTION WITH LOTTIE ========== */}
      <div 
        ref={waveContainerRef}
        className="absolute top-0 right-0 h-full w-[45%] hidden lg:block overflow-hidden pointer-events-none z-10"
      >
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
        
        /* Focus styles for inputs */
        input:focus {
          outline: none;
          border-color: #4695a5 !important;
          box-shadow: 0 0 0 3px rgba(70, 149, 165, 0.1);
        }
      `}</style>
    </div>
  );
};

// AnimatedWaveShape component مع التسلسل الجديد
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

export default Login;