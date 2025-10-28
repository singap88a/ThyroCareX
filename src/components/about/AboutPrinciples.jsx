"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket, FaGlobe, FaHeartbeat } from "react-icons/fa";

const AboutPrinciples = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const companyInfo = {
    mission: {
      title: "Our Mission",
      description:
        "To revolutionize thyroid cancer diagnosis through cutting-edge AI technology, making accurate and accessible healthcare available to everyone. Early detection saves lives — our goal is to empower doctors and patients alike with precision, trust, and hope.",
      icon: <FaRocket className="w-9 h-9" />,
      gradient: "from-blue-600 to-purple-600",
    },
    vision: {
      title: "Our Vision",
      description:
        "We envision a future where thyroid cancer is diagnosed early, treatments are personalized, and every patient benefits from the perfect harmony between human expertise and AI intelligence — transforming care on a global scale.",
      icon: <FaGlobe className="w-9 h-9" />,
      gradient: "from-purple-600 to-pink-600",
    },
    values: {
      title: "Our Values",
      description:
        "Integrity, innovation, compassion, and accuracy guide our every decision. We uphold ethical AI development, data transparency, and patient-first principles to improve lives through trustworthy medical intelligence.",
      icon: <FaHeartbeat className="w-9 h-9" />,
      gradient: "from-blue-500 to-cyan-500",
    },
  };

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* خلفية ديكورية ناعمة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        {/* ===== Section Header ===== */}
        <div className="relative mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-5 py-2 mb-6 text-sm font-medium rounded-full text-primary bg-primary/10"
          >
            🌍 OUR CORE FOUNDATION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl"
          >
            The Heart of{" "}
            <span className="text-transparent bg-clip-text bg-primary">
              ThyroCareX
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Our guiding principles define our purpose — combining medical excellence with
            AI innovation to create a healthier world.
          </motion.p>

          {/* ديكور أنيميشن خلف الهيدر */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute w-32 h-32 -translate-x-1/2 rounded-full -top-16 left-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
          />
        </div>

        {/* ===== Tabs ===== */}
        <div className="relative flex flex-wrap justify-center gap-8 mb-14">
          {Object.entries(companyInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative pb-2 text-lg font-semibold transition-all duration-300 ${
                activeTab === key
                  ? "text-transparent bg-clip-text bg-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {info.title}
              {activeTab === key && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-[3px] bg-primary rounded-full -bottom-1"
                />
              )}
            </button>
          ))}
        </div>

        {/* ===== Content Card ===== */}
        <div className="relative p-10 overflow-hidden bg-white border border-gray-100 shadow-2xl md:p-14 rounded-3xl">
          {/* ديكور خلفية متحرك */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute w-64 h-64 rounded-full opacity-50 bg-gradient-to-tr from-blue-100 to-purple-100 blur-3xl -top-10 -right-10"
          ></motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-start gap-8 md:flex-row"
            >
              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`flex items-center justify-center flex-shrink-0 w-24 h-24 text-white bg-gradient-to-r ${companyInfo[activeTab].gradient} rounded-2xl shadow-xl`}
              >
                {companyInfo[activeTab].icon}
              </motion.div>

              {/* Text */}
              <div>
                <h3 className="mb-4 text-3xl font-bold text-gray-900">
                  {companyInfo[activeTab].title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {companyInfo[activeTab].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciples;
