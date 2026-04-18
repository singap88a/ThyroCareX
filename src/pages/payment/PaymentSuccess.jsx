import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, Download, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex items-center justify-center px-6 py-12">
      
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* LEFT — Icon + Status */}
            <div className="lg:col-span-4 bg-gradient-to-br from-teal-500 to-cyan-600 p-12 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
                className="w-28 h-28 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 ring-4 ring-white/20"
              >
                <CheckCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black text-center mb-2"
              >
                Payment Successful
              </motion.h2>
              <p className="text-teal-100 text-sm font-semibold text-center leading-relaxed">
                Your subscription is now active and ready to use.
              </p>

              <div className="mt-8 flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                SUBSCRIPTION ACTIVE
              </div>
            </div>

            {/* RIGHT — Details + Actions */}
            <div className="lg:col-span-8 p-12 flex flex-col justify-between gap-8">
              
              {/* Info grid */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Transaction Overview</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Status', value: 'Confirmed', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Access', value: 'Full Unlock', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Billing', value: 'Monthly', color: 'text-slate-700', bg: 'bg-slate-50' },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-2xl p-4 border border-slate-100`}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className={`font-black text-lg ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Thank you for trusting <span className="font-black text-slate-800">ThyroCareX</span>. 
                    Your AI-powered thyroid diagnostics are now fully unlocked. 
                    Head to your profile to start using all premium features.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex-1 py-4 px-6 bg-teal-500 hover:bg-teal-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 group"
                >
                  Go to Profile
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Main Page
                </button>
                <button className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Invoice
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-6">
          Secured by ThyroCareX · 256-bit SSL Encryption
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
