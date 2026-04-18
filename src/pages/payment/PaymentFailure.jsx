import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, MessageCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 flex items-center justify-center px-6 py-12">

      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-400 via-rose-400 to-orange-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* LEFT — Icon + Status */}
            <div className="lg:col-span-4 bg-gradient-to-br from-red-500 to-rose-600 p-12 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
                className="w-28 h-28 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 ring-4 ring-white/20"
              >
                <XCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black text-center mb-2"
              >
                Payment Failed
              </motion.h2>
              <p className="text-red-100 text-sm font-semibold text-center leading-relaxed">
                The transaction could not be completed. No charges were made.
              </p>

              <div className="mt-8 flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-bold">
                <AlertTriangle className="w-4 h-4" />
                TRANSACTION DECLINED
              </div>
            </div>

            {/* RIGHT — Details + Actions */}
            <div className="lg:col-span-8 p-12 flex flex-col justify-between gap-8">

              {/* Troubleshooting */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Common Reasons & Fixes</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Insufficient Funds', desc: 'Check your card balance or use a different card.' },
                    { label: 'Card Limit Exceeded', desc: 'Contact your bank to raise your transaction limits.' },
                    { label: 'Network Timeout', desc: 'Unstable connection — retry on a stable network.' },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="font-black text-slate-800 text-sm mb-1">{item.label}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-4 items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800 font-medium leading-relaxed">
                    If this issue persists after retrying, please contact our support team. 
                    Your account has <span className="font-black">not been charged</span> for this transaction.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/pricing')}
                  className="flex-1 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group"
                >
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Main Page
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Support
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

export default PaymentFailure;
