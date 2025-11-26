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
    <section className="pb-10 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative overflow-hidden shadow-2xl bg-slate-900 rounded-3xl">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 opacity-20">
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
          
          <div className="absolute top-0 right-0 -mt-20 -mr-20 rounded-full w-96 h-96 bg-primary/30 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 rounded-full w-80 h-80 bg-blue-500/20 blur-3xl"></div>

          <div className="relative flex flex-col items-center justify-between gap-12 px-6 py-16 md:px-12 lg:px-16 lg:py-20 lg:flex-row">
            
            {/* Text Content */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stay Ahead in <span className="text-primary">Thyroid Care</span>
              </h2>
              <p className="text-lg leading-relaxed text-slate-300">
                Join our community of professionals and patients. Get the latest AI diagnosis breakthroughs and medical updates delivered to your inbox.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium lg:justify-start text-slate-400">
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
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                  <Mail className="absolute w-5 h-5 left-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full py-4 pl-12 text-white transition-all border pr-36 bg-white/10 border-white/10 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/5 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute flex items-center gap-2 px-6 font-semibold text-white transition-all duration-300 rounded-lg right-2 top-2 bottom-2 bg-primary hover:bg-primaryHover disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <>
                        Subscribe
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
              <p className="mt-4 text-xs text-center lg:text-left text-slate-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;