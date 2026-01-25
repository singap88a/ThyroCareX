import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaUserMd, FaPills, FaStethoscope, FaArrowRight, FaPlay, FaBell, FaWifi, FaBatteryFull, FaSignal } from 'react-icons/fa';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {

  return (
    <div className="relative w-full min-h-screen pt-20 overflow-hidden font-sans bg-white lg:pt-0">
      
      {/* Background Wave Animation - Full Screen - Animation Stopped */}
      <div className="absolute inset-0 w-full h-full z-0 scale-y-[-1]   pointer-events-none overflow-hidden ">
        <div className="w-full h-full scale-[2.5] origin-center -translate-y-[400px] translate-x-[340px]">
            <DotLottieReact
            src="https://lottie.host/fa205f6c-f6ad-4fe5-a832-2d57dc1d0c85/5EAmETaf6d.lottie"
            loop={false}
            autoplay={false}
            className="w-full h-full "
            />
        </div>
      </div>

      <div className="container relative z-10 h-full px-6 mx-auto lg:px-16">
        <div className="flex flex-col items-center justify-between h-full min-h-screen gap-12 lg:flex-row lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center w-full space-y-8 lg:w-1/2">
            
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
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-7xl font-inter">
                Empowering Your Health <br/>
                <span className="italic text-primary">with AI Precision </span>
 
                </h1>
            </div>

            {/* Description */}
            <p className="max-w-lg pl-5 text-lg leading-relaxed text-gray-600 border-l-2 font-inter opacity-80 border-primary/40">
              Experience the next generation of thyroid screening. Our AI analyzes your results instantly, providing accuracy validated by leading oncology experts.
            </p>

            {/* Refined Liquid-Fill Buttons */}
            <div className="flex flex-col gap-5 pt-2 sm:flex-row">
              <button className="relative flex items-center justify-center gap-3 px-10 py-4 overflow-hidden font-bold text-white transition-all duration-500 border-2 shadow-lg bg-primary rounded-xl hover:text-primary border-primary group font-inter shadow-primary/20">
                <span className="relative z-10">Start Analysis</span>
                <BsArrowUpRightCircleFill className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
                <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-500 ease-in-out bg-white group-hover:h-full"></div>
              </button>
              
              <button className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-xl font-bold transition-all duration-500 hover:border-primary hover:bg-primary/[0.03] flex items-center justify-center gap-3 font-inter group">
                 <FaPlay className="w-3 h-3 transition-transform text-primary group-hover:scale-125" />
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
                         {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+30}`} className="w-8 h-8 border-2 border-white rounded-full" alt="user"/>)}
                   </div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase">10k+ Protected</span>
                </div>
            </div>

          </div>

          {/* Right Column: Premium iPhone 15 Pro Max Component */}
          <div className="relative flex items-center justify-center w-full pt-10 lg:w-1/2 lg:justify-end lg:pr-36">
             
             {/* Floating Animated Cards with Simple Animation */}
             <div className="absolute z-30 hidden -left-12 top-20 md:block" style={{ animation: 'float-card-primary 6s ease-in-out infinite' }}>
                <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 flex items-center gap-4 min-w-[200px] group transition-all duration-500 hover:scale-110">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-inner bg-cyan-100/50 text-cyan-600">
                        <FaArrowRight className="-rotate-45" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-cyan-800/60 uppercase tracking-widest">Analysis Result</p>
                        <p className="text-sm font-black text-gray-900">100% Negative</p>
                    </div>
                </div>
             </div>

             <div className="absolute z-30 hidden -right-20 bottom-32 md:block" style={{ animation: 'float-card-secondary 8s ease-in-out infinite' }}>
                <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 flex items-center gap-4 min-w-[220px] group transition-all duration-500 hover:scale-110">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-inner bg-primary/20 text-primary">
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
                    <div className="absolute z-50 flex items-center justify-center h-8 gap-2 overflow-hidden transition-all duration-500 transform -translate-x-1/2 bg-black rounded-full top-2 left-1/2 w-28 group-hover:w-40">
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 group-hover:opacity-100"></div>
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
                        <div className="flex items-center justify-between px-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center text-sm font-black text-white shadow-lg w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primaryHover shadow-primary/30">
                                    TX
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">My Health</p>
                                    <p className="text-sm font-black text-gray-900">Dashboard</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative flex items-center justify-center text-gray-500 transition-all bg-gray-100 cursor-pointer w-9 h-9 rounded-xl hover:bg-primary/10 hover:text-primary group/bell">
                                    <FaBell className="w-4 h-4" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[7px] font-black text-white group-hover/bell:scale-125 transition-transform">3</span>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Card */}
                        <div className="px-6 mb-4">
                            <div className="bg-gray-900 rounded-[2rem] p-5 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] rounded-full -mr-10 -mt-10"></div>
                                <div className="relative z-10">
                                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/20">Active Analysis</span>
                                    <h3 className="mt-3 text-xl font-black">Thyroid Scan</h3>
                                    <p className="mt-1 text-xs text-gray-400">Processing clinical data...</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className="w-[85%] h-full bg-primary animate-pulse"></div>
                                        </div>
                                        <span className="text-[10px] font-black">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Medical Images Swiper */}
                        <div className="px-5 mb-4 h-[200px]">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={10}
                                slidesPerView={1}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                className="h-full rounded-3xl"
                                loop={true}
                            >
                                <SwiperSlide>
                                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden group">
                                        <img 
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjpNQKLRPnknexJ7zqvxnud2Q8yOnjFq-cQ&s" 
                                            alt="Medical Scan"
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">Normal Scan</span>
                                            </div>
                                            <p className="text-sm font-black text-white">Thyroid Ultrasound</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">Clear results detected</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden group">
                                        <img 
                                            src="https://www.shutterstock.com/image-photo/lifelong-medication-pioneering-thyroid-gland-260nw-2686926357.jpg" 
                                            alt="Lab Results"
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">Lab Analysis</span>
                                            </div>
                                            <p className="text-sm font-black text-white">Blood Test Results</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">TSH levels normal</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden group">
                                        <img 
                                            src="https://static.vecteezy.com/system/resources/previews/051/103/289/non_2x/thyroid-gland-and-half-face-free-png.png" 
                                            alt="AI Analysis"
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">AI Processing</span>
                                            </div>
                                            <p className="text-sm font-black text-white">AI Diagnosis Report</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">99.8% accuracy</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden group">
                                        <img 
                                            src="https://hoytintegrativehealth.com/wp-content/uploads/2025/11/ChatGPT-Image-Nov-17-2025-02_39_20-PM-1024x683.png" 
                                            alt="Medical Report"
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">Report Ready</span>
                                            </div>
                                            <p className="text-sm font-black text-white">Detailed Diagnosis</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">Complete analysis available</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 px-5 mb-4">
                            <div className="p-3 text-center border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                                <p className="text-lg font-black text-blue-600">98%</p>
                                <p className="text-[8px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">Accuracy</p>
                            </div>
                            <div className="p-3 text-center border border-green-100 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                                <p className="text-lg font-black text-green-600">2min</p>
                                <p className="text-[8px] font-bold text-green-500 uppercase tracking-wider mt-0.5">Process</p>
                            </div>
                            <div className="p-3 text-center border bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-primary/20">
                                <p className="text-lg font-black text-primary">10k+</p>
                                <p className="text-[8px] font-bold text-primary uppercase tracking-wider mt-0.5">Patients</p>
                            </div>
                        </div>

                        {/* Recent Analysis list */}
                        <div className="flex-1 px-6 pb-20">
                            <p className="mb-3 text-xs font-black tracking-tighter text-gray-900 uppercase">Recent Analysis</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 transition-all bg-white border shadow-sm cursor-pointer rounded-2xl border-gray-50 hover:border-primary/20 hover:shadow-md">
                                    <div className="flex items-center justify-center w-10 h-10 text-green-600 rounded-xl bg-green-50">
                                        <FaStethoscope />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-gray-900">Lab Results</p>
                                        <p className="text-[10px] text-gray-400">Oct 24, 2024</p>
                                    </div>
                                    <div className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">CLEAN</div>
                                </div>
                                <div className="flex items-center gap-3 p-3 transition-all bg-white border shadow-sm cursor-pointer rounded-2xl border-gray-50 hover:border-primary/20 hover:shadow-md">
                                    <div className="flex items-center justify-center w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                                        <FaUserMd />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-gray-900">Follow-up Check</p>
                                        <p className="text-[10px] text-gray-400">Oct 20, 2024</p>
                                    </div>
                                    <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">PENDING</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Dock / Navigation */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2rem] p-2 flex justify-between items-center shadow-2xl z-50">
                            <div className="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg bg-primary shadow-primary/20">
                                <FaPlay size={10} />
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors rounded-full hover:bg-gray-50">
                                <FaUserMd />
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors rounded-full hover:bg-gray-50">
                                <FaBell />
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors rounded-full hover:bg-gray-50">
                                <FaSignal />
                            </div>
                        </div>

                        <div className="absolute w-32 h-1 transform -translate-x-1/2 bg-gray-200 rounded-full bottom-2 left-1/2"></div>
                    </div>
                </div>

                {/* iPhone Rear Camera Detail (Visually Stylized) */}
                <div className="absolute top-1 right-24 h-1 w-1 bg-blue-500/20 rounded-full z-[60]"></div>

                {/* Professional Base / Pedestal (No Shadows) */}
                <div className="absolute w-4/5 h-24 transform -translate-x-1/2 pointer-events-none -bottom-12 left-1/2">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-gradient-to-b from-primary/5 to-transparent rounded-[100%]"></div>
                    <div className="absolute top-0 w-32 h-1 -translate-x-1/2 bg-gray-100 rounded-full left-1/2"></div>
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

          @keyframes float-card-primary {
              0%, 100% { transform: translateY(0) translateX(0); }
              33% { transform: translateY(-15px) translateX(5px); }
              66% { transform: translateY(5px) translateX(-5px); }
          }

          @keyframes float-card-secondary {
              0%, 100% { transform: translateY(0) translateX(0); }
              33% { transform: translateY(-12px) translateX(-5px); }
              66% { transform: translateY(8px) translateX(5px); }
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