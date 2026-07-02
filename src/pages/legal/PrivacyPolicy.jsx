import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Globe, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-primary/30 mt-20">
      
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-white/50 blur-[100px]" />
      </div>

      {/* Header */}
      <section className="relative z-10 pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-2xl bg-white/80 border border-gray-200 backdrop-blur-md shadow-lg shadow-primary/10">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-4">
              We are committed to protecting your personal information and your right to privacy.
            </p>
            <p className="text-sm text-primary font-mono bg-primary/10 inline-block px-3 py-1 rounded-full border border-primary/20">
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
            className="p-8 md:p-12 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl"
          >
            
            <div className="space-y-16">
              {/* Introduction */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <FileText className="w-5 h-5" />
                  </span>
                  1. Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Welcome to Thyrax. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-powered diagnostic services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>

              {/* Data Collection */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Database className="w-5 h-5" />
                  </span>
                  2. Information We Collect
                </h2>
                <p className="mb-6 text-gray-600 leading-relaxed text-lg">
                  We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                </p>
                <ul className="space-y-4">
                  {[
                    "Personal Data (Name, Email, Contact Information)",
                    "Health Data (Medical history, diagnostic images uploaded for analysis)",
                    "Technical Data (IP address, browser type, device information)",
                    "Usage Data (Pages visited, time spent, interaction patterns)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use of Information */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Eye className="w-5 h-5" />
                  </span>
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 transition-colors shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Service Provision</h3>
                    <p className="text-gray-600">To provide and maintain our AI diagnostic services and user accounts.</p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 transition-colors shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Communication</h3>
                    <p className="text-gray-600">To send you administrative information, product updates, and support responses.</p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Lock className="w-5 h-5" />
                  </span>
                  4. Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk.
                </p>
              </div>

              {/* Third Party */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Globe className="w-5 h-5" />
                  </span>
                  5. Third-Party Disclosure
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                </p>
              </div>

              {/* Contact */}
              <div className="p-8 bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-3xl border border-primary/20 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Have Questions?</h2>
                <p className="text-gray-600 mb-6">
                  If you have questions or comments about this policy, please contact us.
                </p>
                <a href="mailto:privacy@thyrax.ai" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primaryHover transition-colors shadow-lg shadow-primary/20">
                  privacy@thyrax.ai
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
