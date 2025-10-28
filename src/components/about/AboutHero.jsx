"use client";
import { motion } from "framer-motion";
import { Activity, HeartPulse, Microscope } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative py-24 overflow-hidden ">
  

      <div className="relative grid items-center grid-cols-1 gap-16 px-6 mx-auto max-w-7xl lg:px-8 lg:grid-cols-2">
        {/* --- LEFT CONTENT --- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-5 py-2 mb-6 text-sm font-medium rounded-full text-primary bg-primary/10"
          >
            🧬 ABOUT THYROCAREX
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl"
          >
            Revolutionizing
            <span className="block text-transparent bg-clip-text bg-primary">
              Thyroid Diagnosis
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10 text-xl leading-relaxed text-gray-600"
          >
            We combine world-class medical expertise and AI technology to bring
            accurate, early thyroid cancer detection and personalized care to every patient.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-primary rounded-xl hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl">
              Meet Our Team
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 rounded-xl hover:border-primary hover:text-primary">
              View Our Story
            </button>
          </motion.div>
        </div>

        {/* --- RIGHT VISUAL / ANIMATION AREA --- */}
        <div className="relative flex justify-center">
          {/* Main Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center overflow-hidden rounded-lg w-80 h-80 sm:w-96 sm:h-96"
          >
            <img
              src="/hero_about.webp"
              alt="Hero About"
              className="object-cover w-full h-full "
            />
          </motion.div>

          {/* Floating Medical Icons */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.2 }}
            className="absolute p-4 bg-white border border-gray-100 shadow-lg top-10 left-10 rounded-xl"
          >
            <Activity className="text-primary" size={28} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.4 }}
            className="absolute left-0 p-4 bg-white border border-gray-100 shadow-lg bottom-10 rounded-xl"
          >
            <HeartPulse className="text-primary" size={28} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 0.6 }}
            className="absolute top-0 p-4 bg-white border border-gray-100 shadow-lg right-10 rounded-xl"
          >
            <Microscope className="text-primary" size={28} />
          </motion.div>

          {/* Floating Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute p-6 bg-white border border-gray-100 shadow-xl -bottom-6 -right-6 rounded-2xl"
          >
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">AI Accuracy Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
