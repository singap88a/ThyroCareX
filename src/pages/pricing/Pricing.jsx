
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Shield, 
  Zap, 
  Activity,
  ChevronDown,
  ChevronUp,
  Globe,
  Users,
  Award
} from 'lucide-react';
import Newsletter from '../../components/home/Newsletter';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// --- Components ---

import { useNavigate } from 'react-router-dom';

const PricingCard = ({ plan, billingPeriod }) => {
  const isPopular = plan.popular;
  const navigate = useNavigate();
  
  const handlePurchase = () => {
    navigate('/checkout', { state: { plan } });
  };
  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
        isPopular 
          ? 'bg-white shadow-2xl shadow-[#4695a5]/20 ring-2 ring-[#4695a5] z-10 scale-105' 
          : 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50'
      }`}
    >
      {isPopular && (
        <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
          <span className="bg-[#4695a5] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-[#4695a5]' : 'text-slate-800'}`}>
          {plan.name}
        </h3>
        <p className="h-10 text-sm leading-relaxed text-slate-500">
          {plan.description}
        </p>
      </div>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-3xl font-bold text-slate-900">$</span>
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">
          {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
        </span>
        <span className="font-medium text-slate-500">/mo</span>
      </div>

      <button
        onClick={handlePurchase}
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 mb-8 ${
          isPopular
            ? 'bg-[#4695a5] text-white hover:bg-[#3a7e8c] shadow-lg shadow-[#4695a5]/30 hover:shadow-[#4695a5]/50'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
        }`}
      >
        {plan.cta}
      </button>

      <div className="flex-1 space-y-4">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 p-0.5 rounded-full ${isPopular ? 'bg-[#4695a5]/10 text-[#4695a5]' : 'bg-slate-100 text-slate-500'}`}>
              <Check className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium text-slate-600">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const containerRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential AI screening for individuals starting their journey.',
      monthlyPrice: '0',
      yearlyPrice: '0',
      features: [
        'Basic thyroid scan analysis',
        'AI-powered initial screening',
        'Summary report with insights',
        'Email support (48h response)',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced care & continuous monitoring for best results.',
      monthlyPrice: '49',
      yearlyPrice: '39',
      features: [
        'Everything in Starter',
        'Detailed AI diagnosis reports',
        '1 Video consultation/month',
        'Priority 24/7 support',
        'Medical record storage',
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for clinics and healthcare providers.',
      monthlyPrice: '99',
      yearlyPrice: '79',
      features: [
        'Everything in Professional',
        'Unlimited video consultations',
        'Dedicated support line',
        'Family plan coverage (up to 5)',
        'Custom API integration',
      ],
      cta: 'Contact Sales',
      popular: false,
    }
  ];

  const faqs = [
    { q: "Can I switch plans later?", a: "Yes, upgrade or downgrade anytime. Changes apply immediately to your account." },
    { q: "Is the Starter plan really free?", a: "Forever free. No credit card required for the basic tier. We believe in accessible health monitoring." },
    { q: "How accurate is the AI?", a: "99.8% accuracy in initial screenings, verified by top specialists and clinical trials." },
    { q: "Is my data secure?", a: "HIPAA compliant with military-grade AES-256 encryption. Your health data is yours alone." },
  ];

  return (
    <div ref={containerRef} className="min-h-screen font-sans text-slate-900 ">
              {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
               <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
      {/* --- Hero Section --- */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden lg:pt-20 lg:pb-32">

        
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#4695a5]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full shadow-sm bg-slate-50 border-slate-200">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4695a5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4695a5]"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-600">Simple, Transparent Pricing</span>
            </div>
            
            <h1 className="mb-8 text-5xl font-extrabold tracking-tight md:text-7xl text-slate-900">
              Invest in Your <br />
              <span className="text-[#4695a5]">Long-term Health</span>
            </h1>
            
            <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-slate-500">
              Choose the plan that fits your needs. Whether you're just starting or need continuous monitoring, we have you covered.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-6">
              <span className={`text-sm font-bold transition-colors ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-9 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4695a5] focus:ring-offset-2"
              >
                <motion.div
                  className="bg-white rounded-full shadow-md w-7 h-7"
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ x: billingPeriod === 'monthly' ? 0 : 28 }}
                />
              </button>
              <span className={`text-sm font-bold transition-colors ${billingPeriod === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
                Yearly <span className="text-[#4695a5] text-xs ml-1 font-extrabold">SAVE 20%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Pricing Cards --- */}
      <section className="relative z-10 px-6 pb-32">
        <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billingPeriod={billingPeriod} />
          ))}
        </div>
      </section>

      {/* --- FAQ Section --- */}
      {/* --- FAQ Section --- */}
      <section className="relative z-10 px-6 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Header & Animation */}
            <div className="relative">
              <div className="relative z-10">
                <span className="text-[#4695a5] font-bold tracking-wider uppercase text-sm mb-2 block">
                  Support & Help
                </span>
                <h2 className="mb-6 text-3xl font-extrabold md:text-5xl text-slate-900 leading-tight">
                  Frequently Asked <br />
                  <span className="text-[#4695a5]">Questions</span>
                </h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
                  Find answers to common questions about our plans, security, and medical accuracy. Need more help? Our team is available 24/7.
                </p>
                
                <div className="w-full max-w-[500px] -ml-4">
                  <div className="relative w-full h-full filter drop-shadow-xl opacity-90 hover:opacity-100 transition-opacity duration-500">
                    <DotLottieReact
                      src="https://lottie.host/264bce94-3b27-4892-afc8-d7065a84135e/I7XCnE1Ghd.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
              </div>

               {/* Decorative Gradient Blob behind left column */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4695a5]/5 blur-3xl rounded-full -z-10 pointer-events-none" />
            </div>

            {/* Right Column: FAQs */}
            <div className="space-y-4 relative z-10">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openFaqIndex === index 
                      ? 'border-[#4695a5] shadow-lg shadow-[#4695a5]/10 ring-1 ring-[#4695a5]/20' 
                      : 'border-slate-200 hover:border-[#4695a5]/40 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-start justify-between w-full p-6 text-left group"
                  >
                    <span className={`text-lg font-bold transition-colors duration-300 pr-8 ${
                      openFaqIndex === index ? 'text-[#4695a5]' : 'text-slate-800 group-hover:text-[#4695a5]'
                    }`}>
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                       openFaqIndex === index ? 'bg-[#4695a5]/10 rotate-180' : 'bg-slate-50 group-hover:bg-[#4695a5]/10'
                    }`}>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-[#4695a5]" />
                      ) : (
                        <ChevronDown className={`w-5 h-5 transition-colors ${
                          openFaqIndex === index ? 'text-[#4695a5]' : 'text-slate-400 group-hover:text-[#4695a5]'
                        }`} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 leading-relaxed text-slate-500 text-base border-t border-transparent">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

     <Newsletter/>

    </div>
  );
};

export default PricingPage;
