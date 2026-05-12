import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaCrown, FaUserMd, FaHandHoldingMedical, FaArrowRight } from 'react-icons/fa';
import { FaShieldHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { mapPlansFromApiResponse } from '../../utils/plansFromApi';

type BillingCycle = 'monthly' | 'yearly';

type MappedPlan = {
  id: number;
  planType?: number;
  name: string;
  description: string;
  durationInDays: number;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  features: string[];
  cta: string;
  popular: boolean;
};

type HomePlanCard = {
  id: number;
  name: string;
  label: string;
  price: string;
  period: 'forever' | 'per month';
  description: string;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  isPopular: boolean;
  checkoutPlan: MappedPlan;
};

const FALLBACK_PLANS: MappedPlan[] = [
  {
    id: 1,
    planType: 1,
    name: 'Starter',
    description: 'Essential AI screening for individuals starting their journey.',
    durationInDays: 30,
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
    id: 2,
    planType: 2,
    name: 'Professional',
    description: 'Advanced care & continuous monitoring for best results.',
    durationInDays: 30,
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
    id: 3,
    planType: 3,
    name: 'Enterprise',
    description: 'Complete solution for clinics and healthcare providers.',
    durationInDays: 30,
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
  },
];

function planIcon(planType?: number, isPopular?: boolean) {
  if (planType === 3) return <FaCrown size={18} />;
  if (planType === 2 || isPopular) return <FaShieldHeart size={18} />;
  return <FaHandHoldingMedical size={18} />;
}

function planLabel(plan: MappedPlan): string {
  if (plan.popular) return 'Recommended';
  const monthly = Number(plan.monthlyPrice);
  if (Number.isFinite(monthly) && monthly === 0) return 'Entry Level';
  if ((plan.name || '').toLowerCase().includes('enterprise')) return 'Elite Care';
  return 'Healthcare Plan';
}

function toHomeCard(plan: MappedPlan, billingCycle: BillingCycle): HomePlanCard {
  const monthly = Number(plan.monthlyPrice);
  const yearly = Number(plan.yearlyPrice);
  const useMonthly = billingCycle === 'monthly';
  const amount = useMonthly ? monthly : yearly;
  const isFree = Number.isFinite(monthly) && monthly === 0;

  const price = isFree ? '$0' : `$${Number.isFinite(amount) ? amount : 0}`;

  return {
    id: plan.id,
    name: plan.name,
    label: planLabel(plan),
    price,
    period: isFree ? 'forever' : 'per month',
    description: plan.description || '',
    features: plan.features?.length ? plan.features : ['See full details on the pricing page'],
    cta: plan.cta,
    icon: planIcon(plan.planType, plan.popular),
    isPopular: plan.popular,
    checkoutPlan: plan,
  };
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [mappedPlans, setMappedPlans] = useState<MappedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let cancelled = false;
    const fetchPlans = async () => {
      try {
        const response = await api.get('/Plan');
        if (!cancelled && response.data?.succeeded && Array.isArray(response.data.data)) {
          const mapped = mapPlansFromApiResponse(response.data.data) as MappedPlan[];
          setMappedPlans(mapped.length ? mapped : FALLBACK_PLANS);
        } else if (!cancelled) {
          setMappedPlans(FALLBACK_PLANS);
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        if (!cancelled) {
          setMappedPlans(FALLBACK_PLANS);
          toast.error('Could not load plans, showing defaults');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPlans();
    return () => {
      cancelled = true;
    };
  }, []);

  const plans = useMemo(
    () => mappedPlans.map((p) => toHomeCard(p, billingCycle)),
    [mappedPlans, billingCycle]
  );

  const handlePurchase = (checkoutPlan: MappedPlan) => {
    if (!isLoggedIn) {
      toast.error('Please login first to purchase a subscription');
      navigate('/login', { state: { message: 'Authentication required to access checkout.' } });
      return;
    }
    navigate('/checkout', { state: { plan: checkoutPlan } });
  };

  const goPricing = () => navigate('/pricing');

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <FaUserMd /> Pricing & Plans
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Flexible <span className="text-primary italic font-light">Healthcare</span> Plans
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              Select a transparent pricing model tailored to your thyroid health needs. Switch or cancel at any time
              without hidden fees.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6">
            <button
              type="button"
              onClick={goPricing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 group"
            >
              View All Benefits <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-400'}`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-400'}`}
              >
                Yearly <span className="text-green-500 text-[10px] font-bold">SAVE 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="relative flex flex-col p-10 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse"
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-lg mb-8" />
                  <div className="h-14 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-10" />
                  <div className="space-y-4 mb-12 flex-1">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    ))}
                  </div>
                  <div className="h-14 w-full bg-slate-200 dark:bg-slate-800 rounded-[1.25rem]" />
                </div>
              ))
            : plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col p-10 rounded-[2.5rem] border-2 transition-all duration-200 group shadow-none
                ${plan.isPopular
                      ? 'bg-white dark:bg-slate-900 border-primary'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary'}`}
                >
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-6 py-1.5 border-2 transition-all duration-200
                ${plan.isPopular
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white'}
                rounded-full text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap z-20`}
                  >
                    {plan.name}
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border-2
                   ${plan.isPopular ? 'bg-primary text-white border-primary/10' : 'bg-primary/5 text-primary border-primary/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary/10'}`}
                    >
                      {plan.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest font-black text-primary mb-0.5 opacity-60">
                        Plan Level
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                        {plan.label}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-8 pr-4">
                    {plan.description}
                  </p>

                  <div className="mb-10 flex items-baseline gap-1">
                    <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200 group-hover:text-primary">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-[0.2em] ml-2">
                      /{plan.period === 'forever' ? 'life' : 'mo'}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                        <div className="w-5 h-5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-primary/20">
                          <FaCheck size={9} className="text-primary" />
                        </div>
                        <span className="font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handlePurchase(plan.checkoutPlan)}
                    className={`w-full py-5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-200 active:scale-[0.97]
                ${plan.isPopular
                        ? 'bg-primary text-white border-2 border-primary hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 border-transparent hover:-translate-y-1 shadow-none'
                        : 'bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-primary hover:text-primary hover:-translate-y-1 shadow-none'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
        </div>

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
