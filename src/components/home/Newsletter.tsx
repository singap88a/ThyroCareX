import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* اللون الجديد: درجات غامقة بس مش سودة */}
        <div className="relative overflow-hidden border shadow-2xl bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 rounded-3xl border-slate-700/50">
          
          {/* Background Pattern بتاعك */}
          <div className="absolute inset-0 opacity-[0.15]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#4695a5', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00B4D8', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Grid Pattern خفيف خلفي */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* توهجات راقية */}
          <div className="absolute top-0 right-0 -mt-24 -mr-24 rounded-full w-96 h-96 bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 rounded-full w-96 h-96 bg-secondary/20 blur-3xl"></div>
          
          {/* زوايا مضيئة */}
          <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl"></div>

          <div className="relative flex flex-col items-center justify-between gap-12 px-6 py-16 md:px-12 lg:px-16 lg:py-20 lg:flex-row">
            
            {/* Text Content */}
            <div className="max-w-xl text-center lg:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Stay Ahead in <span className="text-primary">Thyroid Care</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg leading-relaxed text-slate-300/90"
              >
                Join our community of professionals and patients. Get the latest AI diagnosis breakthroughs and medical updates delivered to your inbox.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium lg:justify-start text-slate-400/90"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Unsubscribe Anytime</span>
                </div>
              </motion.div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative flex items-center group">
                    <Mail className="absolute w-5 h-5 transition-colors left-4 text-slate-400 group-focus-within:text-primary" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full py-4 pl-12 text-white transition-all duration-300 border pr-36 bg-white/5 border-slate-600/50 rounded-xl backdrop-blur-sm placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 focus:bg-white/10 hover:bg-white/7 hover:border-slate-500/50"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      className="absolute flex items-center justify-center gap-2 px-6 font-semibold text-white transition-all duration-300 rounded-lg right-2 top-2 bottom-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primaryHover hover:to-primaryHover/90 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] min-w-[120px]"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Subscribed</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {status === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 flex items-center gap-2 text-sm text-green-400 -bottom-8"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Successfully subscribed!
                    </motion.p>
                  )}
                </form>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-xs text-center lg:text-left text-slate-500/80"
                >
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </motion.p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;