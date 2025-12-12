import { motion } from "framer-motion";
import { Scale, FileCheck, AlertTriangle, Copyright, Gavel, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-primary/30">

      {/* --- Header with Gradient Circles --- */}
      <section
        className="relative z-10 pt-16 pb-12 px-6 overflow-hidden bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: "url('./banner.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        {/* Fade to White at Bottom */}

        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
              <Link to="/"
              className="inline-flex items-center text-white bg-primary/80 hover:bg-primary transition-colors px-3 py-1 rounded-lg mb-8 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>

            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shadow-md">
                <Scale className="w-10 h-10 text-primary" />
              </div>
            </div>

             <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-center">
              Terms & Conditions
            </h1>
             <p className="max-w-2xl mx-auto text-xl text-white mb-4">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-gray-700 font-mono bg-gray-50 inline-block px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
              Last Updated: November 22, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Content Section --- */}
      <section className="relative z-10 pb-24 px-6 pt-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 md:p-12 bg-white border border-gray-200 rounded-3xl shadow-2xl backdrop-blur-md"
          >

            <div className="space-y-16">
              {/* Agreement */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <FileCheck className="w-5 h-5" />
                  </span>
                  1. Agreement to Terms
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ThyroCareX ("we," "us" or "our"), concerning your access to and use of the ThyroCareX website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Copyright className="w-5 h-5" />
                  </span>
                  2. Intellectual Property Rights
                </h2>
                <p className="mb-6 text-gray-600 leading-relaxed text-lg">
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>
              </div>

              {/* User Representations */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Gavel className="w-5 h-5" />
                  </span>
                  3. User Representations
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  By using the Site, you represent and warrant that:
                </p>
                <ul className="space-y-4">
                  {[
                    "All registration information you submit will be true, accurate, current, and complete.",
                    "You will maintain the accuracy of such information and promptly update such registration information as necessary.",
                    "You have the legal capacity and you agree to comply with these Terms of Use.",
                    "You are not a minor in the jurisdiction in which you reside."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="flex items-center gap-4 mb-6 text-2xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  4. Medical Disclaimer
                </h2>
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                  <p className="text-primary font-bold leading-relaxed mb-2">
                    THE SITE DOES NOT PROVIDE MEDICAL ADVICE.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The contents of the ThyroCareX Site, such as text, graphics, images, and other material contained on the ThyroCareX Site ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Have Questions?</h2>
                <p className="text-gray-600 mb-6">
                  In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us.
                </p>
                <a href="mailto:legal@thyrocarex.ai" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primaryHover transition-colors shadow-md">
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

