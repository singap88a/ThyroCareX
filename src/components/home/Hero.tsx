import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaUserMd, FaPills, FaStethoscope, FaArrowRight, FaPlay, FaBell, FaWifi, FaBatteryFull, FaSignal } from 'react-icons/fa';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans pt-20 lg:pt-0">
      
      {/* Background Wave Animation - Full Screen */}
      <div className="absolute inset-0 w-full h-full z-0 scale-y-[-1]   pointer-events-none overflow-hidden ">
        <div className="w-full h-full scale-[2.5] origin-center -translate-y-[400px] translate-x-[340px]">
            <DotLottieReact
            src="https://lottie.host/fa205f6c-f6ad-4fe5-a832-2d57dc1d0c85/5EAmETaf6d.lottie"
            loop
            autoplay
            className="w-full h-full  "
            />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 h-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full min-h-screen gap-12 lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className={`w-full lg:w-1/2 flex flex-col justify-center space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Premium Tagline Badge */}
            <div className="inline-flex items-center self-start gap-3 px-1.5 py-1.5 pr-6 border rounded-full bg-white/50 border-primary/20 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-[360deg] transition-transform duration-700">
                  <FaStethoscope className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-black text-gray-800 tracking-[0.2em] uppercase font-inter flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Advanced AI Diagnostics
              </span>
            </div>

            {/* Heading - Descriptive & Long */}
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 font-inter tracking-tight">
                Empowering Your Health <br/>
                <span className="text-primary italic">with AI Precision </span>
 
                </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg font-inter leading-relaxed opacity-80 border-l-2 border-primary/40 pl-5">
              Experience the next generation of thyroid screening. Our AI analyzes your results instantly, providing accuracy validated by leading oncology experts.
            </p>

            {/* Refined Liquid-Fill Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <button className="relative px-10 py-4 bg-primary text-white rounded-xl font-bold transition-all duration-500 hover:text-primary border-2 border-primary group overflow-hidden flex items-center justify-center gap-3 font-inter shadow-lg shadow-primary/20">
                <span className="relative z-10">Start Analysis</span>
                <BsArrowUpRightCircleFill className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-0 bg-white group-hover:h-full transition-all duration-500 ease-in-out"></div>
              </button>
              
              <button className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-xl font-bold transition-all duration-500 hover:border-primary hover:bg-primary/[0.03] flex items-center justify-center gap-3 font-inter group">
                 <FaPlay className="w-3 h-3 text-primary group-hover:scale-125 transition-transform" />
                 Watch Demo
                 <FaArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

            {/* Compact Stats */}
            <div className="flex items-center gap-10 pt-6">
               <div className="flex flex-col">
                 <span className="text-2xl font-bold text-gray-900">99.8%</span>
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Accuracy</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-2xl font-bold text-gray-900">2 Min</span>
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Process</span>
               </div>
                <div className="flex items-center gap-2">
                   <div className="flex -space-x-2">
                         {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+30}`} className="w-8 h-8 rounded-full border-2 border-white" alt="user"/>)}
                   </div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase">10k+ Protected</span>
                </div>
            </div>

          </div>

          {/* Right Column: Premium iPhone 15 Pro Max Component */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 lg:pr-36 pt-10 relative ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
             
             {/* Floating Animated Cards */}
             <div className="absolute -left-12 top-20 z-30 animate-float-card-primary hidden md:block">
                <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 flex items-center gap-4 min-w-[200px] group transition-all duration-500 hover:scale-110">
                    <div className="w-10 h-10 rounded-full bg-cyan-100/50 flex items-center justify-center text-cyan-600 shadow-inner">
                        <FaArrowRight className="-rotate-45" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-cyan-800/60 uppercase tracking-widest">Analysis Result</p>
                        <p className="text-sm font-black text-gray-900">100% Negative</p>
                    </div>
                </div>
             </div>

             <div className="absolute -right-20 bottom-32 z-30 animate-float-card-secondary hidden md:block">
                <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 flex items-center gap-4 min-w-[220px] group transition-all duration-500 hover:scale-110">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                        <FaBell className="animate-bounce" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">New Message</p>
                        <p className="text-sm font-black text-gray-900">Dr. Alison is typing...</p>
                    </div>
                </div>
             </div>

             {/* Phone Body - iPhone 15 Pro Max Style (No Shadow) */}
             <div className="relative w-[340px] h-[680px] bg-[#1a1a1a] rounded-[3.5rem] p-[10px] z-20 group">
                
                {/* Side Buttons */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-[#2a2a2a] rounded-r-sm shadow-sm border-r border-white/10"></div> {/* Action Button */}
                <div className="absolute -left-[2px] top-40 w-[3px] h-14 bg-[#2a2a2a] rounded-r-sm shadow-sm border-r border-white/10"></div> {/* Vol Up */}
                <div className="absolute -left-[2px] top-56 w-[3px] h-14 bg-[#2a2a2a] rounded-r-sm shadow-sm border-r border-white/10"></div> {/* Vol Down */}
                <div className="absolute -right-[2px] top-44 w-[4px] h-24 bg-[#2a2a2a] rounded-l-sm shadow-sm border-l border-white/10"></div> {/* Power */}

                {/* Internal Frame / Bezel */}
                <div className="w-full h-full bg-white rounded-[3rem] overflow-hidden relative">
                    
                    {/* Dynamic Island with Branding */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-8 w-28 bg-black rounded-full z-50 flex items-center justify-center gap-2 group-hover:w-40 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <span className="hidden group-hover:block text-[8px] font-black text-white uppercase tracking-[0.2em] animate-pulse">ThyroCareX</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40"></div>
                    </div>

                    {/* Status Bar */}
                    <div className="absolute top-3 w-full px-8 flex justify-between items-center z-40 text-gray-900 text-[10px] font-bold font-inter">
                        <span>9:41</span>
                        <div className="flex gap-1.5 items-center">
                            <FaSignal />
                            <FaWifi />
                            <FaBatteryFull className="text-green-500" />
                        </div>
                    </div>

                    {/* Screen Content */}
                    <div className="w-full h-full bg-gradient-to-b from-primary/[0.03] via-white to-white pt-14 flex flex-col relative">
                        
                        {/* App Dashboard Header */}
                        <div className="px-6 flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primaryHover shadow-lg shadow-primary/30 flex items-center justify-center text-white font-black text-sm">
                                    TX
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">My Health</p>
                                    <p className="text-sm font-black text-gray-900">Dashboard</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer relative group/bell">
                                    <FaBell className="w-4 h-4" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[7px] font-black text-white group-hover/bell:scale-125 transition-transform">3</span>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Card */}
                        <div className="px-6 mb-6">
                            <div className="bg-gray-900 rounded-[2rem] p-5 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] rounded-full -mr-10 -mt-10"></div>
                                <div className="relative z-10">
                                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/20">Active Analysis</span>
                                    <h3 className="text-xl font-black mt-3">Thyroid Scan</h3>
                                    <p className="text-xs text-gray-400 mt-1">Processing clinical data...</p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className="w-[85%] h-full bg-primary animate-pulse"></div>
                                        </div>
                                        <span className="text-[10px] font-black">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Swiper - Professionalized */}
                        <div className="px-5 mb-6 h-[160px]">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={10}
                                slidesPerView={1}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                className="h-full rounded-3xl"
                            >
                                <SwiperSlide>
                                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 border border-white/5 rounded-[2rem] p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group/slide">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full transition-all duration-500 group-hover/slide:bg-primary/20"></div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                                                <FaStethoscope size={20} className="group-hover/slide:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">Emergency</p>
                                                <p className="text-sm font-black text-white">Rapid AI Scan</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Status</span>
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                    <span className="text-[9px] font-black text-green-500">READY</span>
                                                </div>
                                            </div>
                                            <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 group/btn">
                                                Start
                                                <FaArrowRight size={8} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="w-full h-full bg-white border border-gray-100 rounded-[2rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-500 group/slide">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                                                <FaPills size={20} className="group-hover/slide:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-0.5">Medication</p>
                                                <p className="text-sm font-black text-gray-900">Treatment Plan</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-500">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Dose reminder</span>
                                                <span className="text-[10px] font-black text-gray-900">2 Doses Left Today</span>
                                            </div>
                                            <button className="bg-gray-100 hover:bg-primary hover:text-white text-gray-400 w-10 h-10 rounded-2xl flex items-center justify-center transition-all">
                                                <FaArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Recent Analysis list */}
                        <div className="px-6 flex-1 pb-20">
                            <p className="text-xs font-black text-gray-900 mb-4 tracking-tighter uppercase">Recent Analysis</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-50 shadow-sm hover:border-primary/20 transition-all cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                        <FaStethoscope />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-gray-900">Lab Results</p>
                                        <p className="text-[10px] text-gray-400">Oct 24, 2024</p>
                                    </div>
                                    <div className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">CLEAN</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Dock / Navigation */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2rem] p-2 flex justify-between items-center shadow-2xl z-50">
                            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                <FaPlay size={10} />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                <FaUserMd />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                <FaBell />
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                <FaSignal />
                            </div>
                        </div>

                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                {/* iPhone Rear Camera Detail (Visually Stylized) */}
                <div className="absolute top-1 right-24 h-1 w-1 bg-blue-500/20 rounded-full z-[60]"></div>

                {/* Professional Base / Pedestal (No Shadows) */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-4/5 h-24 pointer-events-none">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-gradient-to-b from-primary/5 to-transparent rounded-[100%]"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-100 rounded-full"></div>
                </div>
             </div>

             {/* Background Glow */}
             <div className="absolute w-[400px] h-[700px] bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

          </div>

        </div>
      </div>
      
       <style>{`
          @keyframes draw-underline {
              from { stroke-dasharray: 0 400; opacity: 0; }
              to { stroke-dasharray: 400 400; opacity: 1; }
          }
          .animate-draw-underline {
              animation: draw-underline 1.5s ease-out forwards;
              animation-delay: 1s;
          }

          @keyframes float-card {
              0%, 100% { transform: translateY(0) translateX(0); }
              33% { transform: translateY(-15px) translateX(5px); }
              66% { transform: translateY(5px) translateX(-5px); }
          }
          .animate-float-card-primary {
              animation: float-card 6s ease-in-out infinite;
          }
          .animate-float-card-secondary {
              animation: float-card 8s ease-in-out infinite;
              animation-delay: 1s;
          }

          @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
          }
          .animate-shimmer {
              animation: shimmer 1.5s infinite;
          }

          .swiper-pagination-bullet-active {
              background-color: #fff !important;
          }
      `}</style>
    </div>
  );
};

export default Hero;