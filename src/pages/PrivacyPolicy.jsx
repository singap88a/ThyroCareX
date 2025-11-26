import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Globe, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
                <Shield className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-4">
              We are committed to protecting your personal information and your right to privacy.
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
              {/* Introduction */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileText className="w-5 h-5" />
                  </span>
                  1. Introduction
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Welcome to ThyroCareX. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-powered diagnostic services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>

              {/* Data Collection */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Database className="w-5 h-5" />
                  </span>
                  2. Information We Collect
                </h2>
                <p className="mb-6 text-slate-400 leading-relaxed text-lg">
                  We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                </p>
                <ul className="space-y-4">
                  {[
                    "Personal Data (Name, Email, Contact Information)",
                    "Health Data (Medical history, diagnostic images uploaded for analysis)",
                    "Technical Data (IP address, browser type, device information)",
                    "Usage Data (Pages visited, time spent, interaction patterns)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use of Information */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Eye className="w-5 h-5" />
                  </span>
                  3. How We Use Your Information
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg mb-8">
                  We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-colors">
                    <h3 className="font-semibold text-white mb-2 text-lg">Service Provision</h3>
                    <p className="text-slate-400">To provide and maintain our AI diagnostic services and user accounts.</p>
                  </div>
                  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-colors">
                    <h3 className="font-semibold text-white mb-2 text-lg">Communication</h3>
                    <p className="text-slate-400">To send you administrative information, product updates, and support responses.</p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Lock className="w-5 h-5" />
                  </span>
                  4. Data Security
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk.
                </p>
              </div>

              {/* Third Party */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-white">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Globe className="w-5 h-5" />
                  </span>
                  5. Third-Party Disclosure
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                </p>
              </div>

              {/* Contact */}
              <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-3xl border border-indigo-500/20 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white">Have Questions?</h2>
                <p className="text-slate-400 mb-6">
                  If you have questions or comments about this policy, please contact us.
                </p>
                <a href="mailto:privacy@thyrocarex.ai" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                  privacy@thyrocarex.ai
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
