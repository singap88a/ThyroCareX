"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Award, GraduationCap, Briefcase, Linkedin, Mail, Twitter, Crown } from "lucide-react";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      specialty: "Endocrinology & Oncology",
      bio: "Pioneering research in thyroid cancer treatment with over 15 years of clinical excellence.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Harvard Medical", icon: <GraduationCap size={14} /> },
        { text: "200+ Papers", icon: <Award size={14} /> },
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@thyrocarex.com"
      }
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of AI Research",
      specialty: "AI & Healthcare",
      bio: "Leading the integration of deep learning algorithms to predict thyroid anomalies early.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Stanford AI Lab", icon: <GraduationCap size={14} /> },
        { text: "50+ Patents", icon: <Briefcase size={14} /> },
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@thyrocarex.com"
      }
    },
    {
      name: "Dr. Emily Watson",
      role: "Clinical Director",
      specialty: "Thyroid Surgery",
      bio: "Renowned surgeon specializing in minimally invasive thyroidectomy techniques.",
      image:
        "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Mayo Clinic", icon: <GraduationCap size={14} /> },
        { text: "1k+ Surgeries", icon: <Award size={14} /> },
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@thyrocarex.com"
      }
    },
    {
      name: "Dr. James Kim",
      role: "Data Science Lead",
      specialty: "Medical Imaging",
      bio: "Expert in computer vision for analyzing ultrasound images with high precision.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "MIT Research", icon: <GraduationCap size={14} /> },
        { text: "DL Expert", icon: <Award size={14} /> },
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@thyrocarex.com"
      }
    },
  ];

  return (
    <section className="relative py-5 bg-white overflow-hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* ===== Enhanced Header ===== */}
        <div className="relative mb-20 text-center">
            <div className="inline-block relative">
                <span className="relative z-10 px-6 py-2 text-sm font-bold tracking-widest text-white uppercase bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center gap-2">
                  <Crown size={18} fill="currentColor" /> Our Leadership
                </span>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary blur-md opacity-40 rounded-full animate-pulse-slow"></div>
            </div>
            
            <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Meet The <span className="text-primary underline decoration-4 decoration-primary/20 underline-offset-4">Visionaries</span>
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-500 font-light leading-relaxed">
              Merging world-class medical expertise with cutting-edge artificial intelligence.
            </p>
        </div>

        {/* ===== Swiper Configuration ===== */}
        <div className="relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            navigation={{
              nextEl: '.button-next-team',
              prevEl: '.button-prev-team',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 30, slidesPerGroup: 1 },
            }}
            className="w-full overflow-hidden"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="h-full  pt-2 px-1">
                {/* ===== DETAILED HORIZONTAL CARD ===== */}
                <div className="group relative w-full h-full bg-white   rounded-[2.5rem] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(var(--primary-color-rgb),0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden  border border-primary/20  border-primary">
                  
                  {/* Decorative Background Shapes */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                  </div>

                  {/* Left: Circular Image with PERMANENT Border */}
                  <div className="relative z-10 shrink-0">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-white shadow-lg border-4 border-primary/20  border-primary transition-colors duration-500">
                       <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner relative z-10">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                       </div>
                       
                       {/* Floating Badge */}
                       <div className="absolute bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-2 border-white z-20 animate-float">
                          <Award size={18} />
                       </div>
                    </div>
                  </div>

                  {/* Right: Rich Content */}
                  <div className="relative z-10 flex-1 text-center md:text-left w-full">
                    <div className="mb-1">
                        <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10   py-1 rounded-md">
                            {member.role}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold      text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <p className="text-sm font-medium text-gray-500 mt-1 mb-4">
                      {member.specialty}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-3">
                        {member.bio}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-gray-100">
                        {/* Achievements */}
                       {member.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                             <span className="text-primary">{ach.icon}</span>
                             {ach.text}
                          </div>
                       ))}
                    </div>

                    {/* Social - Absolute positioning on desktop card or standard? Let's keep it inline but clean */}
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                      {[
                         { icon: <Linkedin size={16} />, href: member.social.linkedin },
                         { icon: <Twitter size={16} />, href: member.social.twitter },
                         { icon: <Mail size={16} />, href: `mailto:${member.social.email}` }
                      ].map((item, i) => (
                        <a 
                          key={i}
                          href={item.href}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 border border-gray-200 hover:border-primary"
                        >
                          {item.icon}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ===== Bottom Navigation & Pagination ===== */}
          <div className="mt-8 flex flex-col items-center justify-center gap-6">
             <div className="flex items-center gap-4">
                 <button className="button-prev-team w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white hover:text-white hover:bg-primary hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 focus:outline-none group">
                   <ArrowRight className="rotate-180 transition-transform group-hover:-translate-x-1" size={24} />
                 </button>
                 
                 {/* Pagination Dots Container */}
                 <div className="custom-pagination !w-auto !static flex gap-2 !translate-x-0"></div>
                 
                 <button className="button-next-team w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white hover:text-white hover:bg-primary hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 focus:outline-none group">
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={24} />
                 </button>
             </div>
          </div>

        </div>
      </div>

       <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--primary-color, #2563eb);
          width: 32px;
          border-radius: 999px;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(2deg); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Helper for ArrowRight simple icon
const ArrowRight = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default AboutTeam;
