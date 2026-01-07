import { FaUsers, FaStethoscope, FaUserMd, FaAward } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const AboutStats = () => {
  const containerRef = useRef(null);
  
  const stats = [
    { 
      icon: <FaUsers className="w-8 h-8" />, 
      number: "50K+", 
      label: "Patients Served", 
      description: "Trusted by over 50,000 patients across 25+ countries with exceptional healthcare services" 
    },
    { 
      icon: <FaStethoscope className="w-8 h-8" />, 
      number: "98%", 
      label: "Accuracy Rate", 
      description: "Clinically validated accuracy rate ensuring reliable diagnoses and treatment plans" 
    },
    { 
      icon: <FaUserMd className="w-8 h-8" />, 
      number: "200+", 
      label: "Medical Experts", 
      description: "Network of 200+ certified medical professionals providing expert consultations worldwide" 
    },
    { 
      icon: <FaAward className="w-8 h-8" />, 
      number: "15+", 
      label: "Industry Awards", 
      description: "Recognized with 15+ prestigious awards for innovation and excellence in healthcare" 
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div ref={containerRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* البطاقة الرئيسية */}
              <div className="relative p-6 bg-white rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                
                {/* الخلفية المتحركة الدائمة - بوردر من الزوايا */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {/* بوردر دائم من الزوايا */}
                  <div className="absolute w-40 h-40 bg-gradient-to-br from-primary to-primaryHover rounded-full blur-2xl -top-10 -left-10 opacity-5"></div>
                  
                  <div className="absolute w-40 h-40 bg-gradient-to-tr from-primary to-primaryHover rounded-full blur-2xl -bottom-10 -right-10 opacity-5"></div>
                  
                  {/* أنماط هندسية خلفية دائمة */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-3 left-3 w-20 h-20 border-2 border-primary rounded-lg rotate-12"></div>
                    <div className="absolute bottom-3 right-3 w-16 h-16 border-2 border-primaryHover rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-primary rotate-45 opacity-50"></div>
                  </div>
                  
                  {/* خطوط متحركة دائمة في الخلفية */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
                      style={{animation: 'lineMove 3s linear infinite'}}></div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primaryHover to-transparent opacity-70"
                      style={{animation: 'lineMove 3s linear infinite reverse'}}></div>
                  </div>
                  
                  {/* تأثير نبض دائم */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-primaryHover opacity-5 rounded-2xl"></div>
                </div>
                
                {/* المحتوى */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* الصف العلوي: الأيقونة والرقم */}
                  <div className="flex items-start justify-between mb-4">
                    {/* الأيقونة المحترفة مع تصميم متطور */}
                    <div className="relative">
                      {/* الخلفية المتدرجة للأيقونة */}
                      <div className="absolute -inset-3 bg-gradient-to-br from-primary to-primaryHover rounded-2xl blur-lg opacity-20"></div>
                      
                      {/* الأيقونة الرئيسية مع تأثير 3D */}
                      <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary to-primaryHover shadow-xl">
                        <div className="text-white relative z-10">
                          {stat.icon}
                        </div>
                        
                        {/* تأثير اللمعة */}
                        <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
                        
                        {/* تأثير الظل */}
                        <div className="absolute bottom-0 right-0 w-full h-2 bg-primary rounded-b-xl blur-sm opacity-50"></div>
                      </div>
                      
                      {/* نقطة متحركة حول الأيقونة */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primaryHover rounded-full animate-ping"></div>
                    </div>
                    
                    {/* الرقم مع تصميم مميز */}
                    <div className="text-right">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primaryHover bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* الاسم */}
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.label}
                    </h3>
                  </div>
                  
                  {/* الوصف الكبير */}
                  <div className="flex-grow">
                    <p className="text-gray-700 text-[15px] leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                  
             
                </div>
                
                {/* تأثيرات إضافية دائمة */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primaryHover rounded-full opacity-40"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary rounded-full opacity-40"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* أنماط CSS مخصصة */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lineMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes progressMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-5px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        
        .float-element {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default AboutStats;