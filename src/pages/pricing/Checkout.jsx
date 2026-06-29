import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowLeft, 
  Check, 
  Lock, 
  Info,
  ChevronRight,
  Zap,
  Activity,
  Star
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { plan } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border">
          <Info className="w-12 h-12 text-[#4695a5] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Plan Selected</h2>
          <p className="text-gray-500 mb-6">Please select a subscription plan to proceed.</p>
          <button 
            onClick={() => navigate('/pricing')}
            className="px-6 py-2 bg-[#4695a5] text-white rounded-lg font-bold hover:bg-[#00A2C2] transition-colors"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  const handlePaymobRedirect = async () => {
    setLoading(true);
    try {
      // Step 1: Create transaction record and get Paymob Iframe URL
      const doctorId = user?.DoctorId || user?.['DoctorId'];
      
      if (!doctorId) {
        toast.error('Doctor ID not found. Please logout and login again.');
        setLoading(false);
        return;
      }

      const response = await api.post('/Payment/create', { 
        planId: plan.id,
        doctorId: parseInt(doctorId)
      });

      if (response.data && response.data.succeeded) {
        const paymentUrl = response.data.data;
        toast.success('Redirecting to secure payment gateway...');
        // Step 2: Redirect to Paymob Iframe
        window.location.href = paymentUrl;
      } else {
        toast.error(response.data.message || 'Failed to initiate payment');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      toast.error('Connection to payment server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 px-4 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-[#4695a5] transition-colors font-semibold group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Pricing
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                <Lock className="w-3.3 h-3.3" />
                Secured SSL Connection
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: PLAN SUMMARY */}
            <div className="lg:col-span-7 space-y-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <span className="px-3 py-1 bg-[#4695a5]/10 text-[#4695a5] text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 inline-block">
                                Selected Plan
                            </span>
                            <h1 className="text-4xl font-black text-slate-900 mb-2">{plan.name}</h1>
                            <p className="text-slate-500 font-medium">{plan.description}</p>
                        </div>
                        <div className="w-16 h-16 bg-[#4695a5] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4695a5]/20">
                            {plan.name === 'Starter' && <Zap className="w-8 h-8 text-white" />}
                            {plan.name === 'Professional' && <Activity className="w-8 h-8 text-white" />}
                            {(plan.name === 'Enterprise' || plan.name === 'Standard Plan') && <Star className="w-8 h-8 text-white" />}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="block text-slate-400 text-[10px] font-bold uppercase mb-1">Price</span>
                            <span className="text-2xl font-black text-slate-900">${plan.monthlyPrice}</span>
                            <span className="text-slate-400 text-sm font-bold ml-1">/ Month</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="block text-slate-400 text-[10px] font-bold uppercase mb-1">Billing cycle</span>
                            <span className="text-lg font-black text-slate-900">Monthly</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-900 font-bold flex items-center gap-2">
                            Included Advanced Features:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-[#4695a5]/5 rounded-xl border border-[#4695a5]/20">
                                    <div className="w-6 h-6 bg-[#4695a5] rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-slate-700 font-semibold text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* TRUST SIGNALS */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">HIPAA Compliant</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <Lock className="w-6 h-6 text-[#4695a5] mx-auto mb-2" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">256-bit AES</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Premium Support</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: CHECKOUT ACTION */}
            <div className="lg:col-span-5">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 sticky top-24"
                >
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Order Checkout</h2>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-slate-600 font-medium">
                            <span>{plan.name} Plan (1 Month)</span>
                            <span>${plan.monthlyPrice}.00</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 font-medium">
                            <span>Service Setup Fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-slate-900 font-black text-xl">Total Amount</span>
                            <span className="text-[#4695a5] font-black text-3xl">${plan.monthlyPrice}.00</span>
                        </div>
                    </div>

                    <div className="bg-[#4695a5]/5 rounded-2xl p-5 mb-8 flex gap-4 border border-[#4695a5]/20">
                        <CreditCard className="w-6 h-6 text-[#4695a5] mt-1" />
                        <div>
                            <h4 className="text-[#1a3d44] font-bold mb-1">Paymob Secure Gateway</h4>
                            <p className="text-[#4a7d87] text-xs font-semibold leading-relaxed">
                                You will be redirected to Paymob's secure server to complete your transaction with Visa, Mastercard, or ValU.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handlePaymobRedirect}
                        disabled={loading}
                        className="w-full py-5 bg-[#4695a5] hover:bg-[#00A2C2] disabled:bg-slate-300 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-[#4695a5]/30 flex items-center justify-center gap-3 group overflow-hidden relative"
                    >
                        {loading ? (
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="relative z-10">Confirm & Pay Now</span>
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                            </>
                        )}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-[#4695a5]/20 to-transparent pointer-events-none"
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                    </button>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                        <div className="flex gap-4 mb-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                        </div>
                        <p className="text-slate-400 text-[11px] font-bold text-center uppercase tracking-tighter">
                            Encrypted by Thyrax Neural Security v4.9
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
