import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  ChevronLeft, 
  Zap, 
  Cpu, 
  Globe, 
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(location.state?.plan || {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: '49',
    features: ['Detailed AI diagnosis reports', '1 Video consultation/month', 'Priority 24/7 support']
  });
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const val = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (val.length <= 19) setFormData({ ...formData, [name]: val });
    } else if (name === 'expiry') {
      const val = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').replace(/\/$/, '');
      if (val.length <= 5) setFormData({ ...formData, [name]: val });
    } else if (name === 'cvc') {
      if (value.length <= 4) setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/profile'), 3000);
    }, 3000);
  };

  const getCardType = (number) => {
    if (number.startsWith('4')) return 'VISA';
    if (number.startsWith('5')) return 'MASTERCARD';
    return 'CREDIT CARD';
  };

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white pt-24 pb-12 px-4 relative overflow-hidden font-sans">
      {/* AI Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4695a5] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Plans
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Plan Details & AI Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Unlock Neural Intelligence
              </h1>
              <p className="text-slate-400 text-lg">
                You are upgrading to the <span className="text-[#4695a5] font-bold">{plan.name}</span> plan. 
                Experience medical diagnosis powered by 4th generation AI.
              </p>
            </div>

            {/* Plan Card (Summary) */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
              {/* AI Scan Line */}
              <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4695a5] to-transparent animate-ai-scan pointer-events-none" />
              
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold">{plan.name} Package</h3>
                  <p className="text-[#4695a5] text-sm">Active for 1 Month</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                  <p className="text-slate-500 text-xs">recurring</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-[#4695a5] font-bold">Neural Features Unlocked</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4695a5]" />
                    <span className="text-slate-300 text-sm font-medium">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-300 text-sm font-medium">99.9% AI Accuracy Depth</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
               {[
                 { icon: ShieldCheck, label: "Bank Level Security" },
                 { icon: Lock, label: "SSL Encrypted" },
                 { icon: Globe, label: "Global Access" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                   <item.icon className="w-6 h-6 text-slate-500" />
                   <span className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Right Side: Payment Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 lg:p-12 rounded-[2rem] shadow-2xl relative"
          >
            {/* Visual Card */}
            <div className="mb-12 perspective-1000">
              <motion.div 
                animate={{ rotateY: focusedField === 'cvc' ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-full aspect-[1.58/1] preserve-3d transition-all duration-500"
              >
                {/* Card Front */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#1e293b] via-[#4695a5] to-[#1e293b] p-6 shadow-2xl flex flex-col justify-between border border-white/20">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-10 bg-yellow-400/80 rounded-lg shadow-inner" /> {/* Chip */}
                    <span className="font-black italic text-2xl text-white/50">{getCardType(formData.cardNumber)}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-2xl font-mono tracking-[0.2em] text-white">
                      {formData.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between uppercase">
                      <div>
                        <p className="text-[10px] opacity-60">Card Holder</p>
                        <p className="text-sm font-bold tracking-wider">{formData.cardName || "YOUR NAME"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] opacity-60">Expires</p>
                        <p className="text-sm font-bold tracking-wider">{formData.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle Glow Effect */}
                  <div className="absolute -inset-1 bg-white/5 rounded-2xl blur opacity-20 pointer-events-none" />
                </div>

                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-[#0f172a] p-6 shadow-2xl border border-white/20 flex flex-col justify-between" style={{ transform: 'rotateY(180deg)' }}>
                   <div className="h-10 bg-black/50 -mx-6 mt-4" />
                   <div className="space-y-2">
                     <p className="text-[10px] text-right pr-4 opacity-60">CVV</p>
                     <div className="h-10 bg-white/10 rounded flex items-center justify-end px-4 font-mono">
                        {formData.cvc || "•••"}
                     </div>
                   </div>
                   <div className="flex justify-between items-end opacity-20">
                      <Globe className="w-8 h-8" />
                      <span className="text-[10px] font-bold">THYROCAREX SECURE AI PAY</span>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Card Holder Name</label>
                <div className="relative group">
                   <input 
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('cardName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Enter full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#4695a5] focus:ring-1 focus:ring-[#4695a5] outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Card Number</label>
                <div className="relative group">
                   <input 
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('cardNumber')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#4695a5] focus:ring-1 focus:ring-[#4695a5] outline-none transition-all placeholder:text-slate-600 font-mono"
                  />
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#4695a5] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Expiry Date</label>
                  <input 
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('expiry')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#4695a5] focus:ring-1 focus:ring-[#4695a5] outline-none transition-all placeholder:text-slate-600 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">CVV / CVC</label>
                  <input 
                    type="password"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('cvc')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="***"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#4695a5] focus:ring-1 focus:ring-[#4695a5] outline-none transition-all placeholder:text-slate-600 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || isSuccess}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all relative overflow-hidden flex justify-center items-center gap-2 ${
                  isSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#4695a5] hover:bg-[#3a7e8c] text-white shadow-lg shadow-[#4695a5]/30'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Neural Verification...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Success! Access Granted
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    PAY ${plan.monthlyPrice} FULL ACCESS
                  </>
                )}
                
                {/* AI Scan Effect over button */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              </button>
              
              <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                 <AlertCircle className="w-3 h-3" />
                 Encrypted transaction by ThyroCareX Intelligence System
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
