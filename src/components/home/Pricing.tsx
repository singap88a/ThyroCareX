import React, { useState } from 'react';
import { FaCheck, FaStar, FaCrown, FaUserMd, FaHandHoldingMedical, FaArrowRight } from 'react-icons/fa';
import { FaShieldHeart } from 'react-icons/fa6';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Basic',
      label: 'Entry Level',
      price: '$0',
      period: 'forever',
      description: 'Essential thyroid health monitoring for individuals.',
      features: [
        'Standard scan uploads',
        'AI insights summary',
        'Email health tips', 
        'Community access'
      ],
      cta: 'Start Free',
      icon: <FaHandHoldingMedical size={18} />,
      isPopular: false
    },
    {
      name: 'Advanced',
      label: 'Recommended',
      price: billingCycle === 'monthly' ? '$49' : '$39',
      period: 'per month',
      description: 'Complete care with specialist consultations and priority.',
      features: [
        'Detailed AI diagnosis',
        'Video consultations',
        'Priority 24/7 support',
        'Secure record storage'
      ],
      cta: 'Get Started',
      icon: <FaShieldHeart size={18} />,
      isPopular: true
    },
    {
      name: 'Professional',
      label: 'Elite Care',
      price: billingCycle === 'monthly' ? '$99' : '$89',
      period: 'per month',
      description: 'The ultimate package for comprehensive family wellness.',
      features: [
        'Unlimited consultations',
        'Second-opinion reviews',
        'Family plan coverage',
        'Personalized treatment'
      ],
      cta: 'Consult Sales',
      icon: <FaCrown size={18} />,
      isPopular: false
    }
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Split Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
           {/* Left Content */}
           <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                 <FaUserMd /> Pricing & Plans
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                 Flexible <span className="text-primary italic font-light">Healthcare</span> Plans
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                 Select a transparent pricing model tailored to your thyroid health needs. 
                 Switch or cancel at any time without hidden fees.
              </p>
           </div>

           {/* Right Actions */}
           <div className="flex flex-col items-center lg:items-end gap-6">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 group">
                 View All Benefits <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <button 
                   onClick={() => setBillingCycle('monthly')}
                   className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-400'}`}
                 >
                   Monthly
                 </button>
                 <button 
                   onClick={() => setBillingCycle('yearly')}
                   className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-400'}`}
                 >
                   Yearly <span className="text-green-500 text-[10px] font-bold">SAVE 20%</span>
                 </button>
              </div>
           </div>
        </div>

        {/* Unified Cards Grid - No Shadows, Snappy Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col p-10 rounded-[2.5rem] border-2 transition-all duration-200 group shadow-none
                ${plan.isPopular 
                  ? 'bg-white dark:bg-slate-900 border-primary' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary'}`}
            >
              {/* Border Title Badge */}
              <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-6 py-1.5 border-2 transition-all duration-200
                ${plan.isPopular 
                  ? 'bg-primary border-primary text-white' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white'} 
                rounded-full text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap z-20`}>
                 {plan.name}
              </div>

              {/* Icon & Label Header */}
              <div className="flex items-center gap-4 mb-8">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border-2
                   ${plan.isPopular ? 'bg-primary text-white border-primary/10' : 'bg-primary/5 text-primary border-primary/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary/10'}`}>
                   {plan.icon}
                 </div>
                 <div>
                    <span className="block text-[10px] uppercase tracking-widest font-black text-primary mb-0.5 opacity-60">Plan Level</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none">{plan.label}</h4>
                 </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-8 pr-4">
                 {plan.description}
              </p>

              {/* Price */}
              <div className="mb-10 flex items-baseline gap-1">
                 <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200 group-hover:text-primary">
                    {plan.price}
                 </span>
                 <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-[0.2em] ml-2">
                    /{plan.period === 'forever' ? 'life' : 'mo'}
                 </span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-12 flex-1">
                 {plan.features.map((feature, fIdx) => (
                   <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                      <div className="w-5 h-5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-primary/20">
                         <FaCheck size={9} className="text-primary" />
                      </div>
                      <span className="font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">{feature}</span>
                   </li>
                 ))}
              </ul>

              {/* CTA - Professional Styling */}
              <button className={`w-full py-5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-200 active:scale-[0.97]
                ${plan.isPopular 
                  ? 'bg-primary text-white border-2 border-primary hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 border-transparent hover:-translate-y-1 shadow-none' 
                  : 'bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-primary hover:text-primary hover:-translate-y-1 shadow-none'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Minimal Footer */}
        <div className="mt-12 flex flex-col items-center">
           <div className="w-80 h-[2px] bg-gradient-to-r from-transparent via-primary/40 dark:via-primary/30 to-transparent mb-10"></div>
           <div className="flex flex-wrap justify-center items-center gap-12 text-slate-400 dark:text-slate-600 font-bold tracking-[0.2em] uppercase text-[10px] transition-all duration-500 grayscale opacity-70 hover:grayscale-0 hover:opacity-100">
              <span>Clinic One</span>
              <span>NeuroHealth</span>
              <span>MedSaaS</span>
              <span>ThyroCare Pro</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;