import { motion } from "framer-motion";
import { Scale, FileCheck, AlertTriangle, Copyright, Gavel, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-slate-900/50 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* Header */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>

            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md shadow-lg shadow-indigo-500/10">
                <Scale className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-4">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-indigo-400 font-mono bg-indigo-500/10 inline-block px-3 py-1 rounded-full border border-indigo-500/20">
              Last Updated: November 22, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 md:p-12 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl"
          >
            
            <div className="space-y-16">
              {/* Agreement */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileCheck className="w-5 h-5" />
                  </span>
                  1. Agreement to Terms
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ThyroCareX ("we," "us" or "our"), concerning your access to and use of the ThyroCareX website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Copyright className="w-5 h-5" />
                  </span>
                  2. Intellectual Property Rights
                </h2>
                <p className="mb-6 text-slate-400 leading-relaxed text-lg">
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>
              </div>

              {/* User Representations */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Gavel className="w-5 h-5" />
                  </span>
                  3. User Representations
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                  By using the Site, you represent and warrant that:
                </p>
                <ul className="space-y-4">
                  {[
                    "All registration information you submit will be true, accurate, current, and complete.",
                    "You will maintain the accuracy of such information and promptly update such registration information as necessary.",
                    "You have the legal capacity and you agree to comply with these Terms of Use.",
                    "You are not a minor in the jurisdiction in which you reside."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  4. Medical Disclaimer
                </h2>
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                  <p className="text-yellow-200 leading-relaxed font-bold mb-2">
                    THE SITE DOES NOT PROVIDE MEDICAL ADVICE.
                  </p>
                  <p className="text-yellow-100/80 leading-relaxed">
                    The contents of the ThyroCareX Site, such as text, graphics, images, and other material contained on the ThyroCareX Site ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-3xl border border-indigo-500/20 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white">Have Questions?</h2>
                <p className="text-slate-400 mb-6">
                  In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us.
                </p>
                <a href="mailto:legal@thyrocarex.ai" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                  legal@thyrocarex.ai
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
