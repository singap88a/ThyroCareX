import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'var(--primary-color)'; // Using primary color variable
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = 'var(--primary-color)'; // Using primary color variable
            ctx.globalAlpha = 0.3 * (1 - distance/150);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Text animation effect
  useEffect(() => {
    if (!textRef.current || !isVisible) return;

    const textElements = textRef.current.querySelectorAll('.animate-text');
    textElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`;
      element.classList.add('text-animation');
    });
  }, [isVisible]);

  return (
    <div 
      ref={heroRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden font-sans bg-white"
    >
      {/* Animated particles background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />

      {/* Additional background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern - clearer and more visible */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--primary-color)_1px,transparent_1px),linear-gradient(90deg,var(--primary-color)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] opacity-20"></div>
        
        {/* Animated circles - more visible */}
         
        {/* 3D elements - clearer and more visible */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Moving triangles - clearer animation */}
          <div className="absolute w-32 h-32 transform rotate-45 border-2 rounded-lg opacity-50 top-20 left-20 border-primary animate-pulse"></div>
          <div className="absolute w-40 h-40 delay-700 border-2 rounded-full opacity-50 bottom-20 right-20 border-primary animate-pulse"></div>
          <div className="absolute w-24 h-24 delay-300 transform border-2 opacity-50 top-1/2 left-1/4 border-primary -rotate-12 animate-pulse"></div>

          {/* Additional moving shapes - clearer */}
          <div className="absolute w-20 h-20 transform border top-1/3 right-1/3 border-primary rotate-30 animate-spin-slow opacity-40"></div>
          <div className="absolute delay-500 transform -rotate-45 border bottom-1/3 left-1/3 w-28 h-28 border-primary animate-spin-slow opacity-40"></div>
        </div>

        {/* Floating medical icons - clearer */}
        <div className="absolute top-1/3 right-1/4 animate-float">
          <div className="text-4xl text-primary opacity-60">🫀</div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float-slower">
          <div className="text-4xl text-primary opacity-60">🧬</div>
        </div>
        <div className="absolute delay-1000 top-1/4 right-1/3 animate-float">
          <div className="text-3xl opacity-50 text-primary">⚕️</div>
        </div>
      </div>

      {/* Main content */}
      <div ref={textRef} className="relative z-10 w-full max-w-6xl px-4 mx-auto text-center">
        {/* Trust badge */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-6 py-3 space-x-3 border shadow-lg bg-primary/5 backdrop-blur-md rounded-2xl border-primary/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800 font-inter">Trusted by Medical Professionals Worldwide</span>
            </div>
            <div className="text-gray-400">•</div>
            <div className="text-sm text-gray-600 font-inter">FDA Approved Technology</div>
          </div>
        </div>

        {/* Main heading with text animation - NO SHADOW */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl font-inter">
            <span className="block opacity-0 animate-text italic font-black  ">Thyroid Cancer</span>
            <span className="block mt-4 opacity-0 text-primary animate-text italic font-black">
              Detection Reimagined
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 opacity-0 md:text-xl lg:text-2xl font-inter animate-text">
            Revolutionary AI-powered platform delivering instant, accurate thyroid cancer diagnosis 
            with expert medical validation. Your health, our priority.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button className="relative px-10 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-xl group bg-gradient-to-r from-primary to-primaryHover rounded-xl hover:from-primaryHover hover:to-primary hover:-translate-y-1 hover:shadow-2xl font-inter">
            <div className="relative z-10 flex items-center space-x-2">
              <span>Start Free Diagnosis</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent group-hover:opacity-100"></div>
          </button>

          <button className="px-10 py-4 text-lg font-semibold transition-all duration-300 transform border-2 text-primary group border-primary/40 rounded-xl hover:border-primary hover:bg-primary/8 hover:-translate-y-1 backdrop-blur-sm font-inter">
            <div className="flex items-center space-x-2">
              <span>Watch Medical Demo</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">▶</span>
            </div>
          </button>
        </div>

        {/* Statistics */}
        <div className={`mt-16 transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-inter">99%</div>
              <div className="text-sm text-gray-600 font-inter">Diagnosis Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-inter">50,000+</div>
              <div className="text-sm text-gray-600 font-inter">Successful Analyses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-inter">2 min</div>
              <div className="text-sm text-gray-600 font-inter">Average Analysis Time</div>
            </div>
          </div>
        </div>
      </div>

 

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .text-animation {
          animation: textReveal 0.8s ease-out forwards;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;