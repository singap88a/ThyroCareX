"use client";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaShieldAlt, FaChartLine } from "react-icons/fa";

const AboutPreview = () => {
  const highlights = [
    {
      icon: <FaHeartbeat className="w-7 h-7" />,
      title: "AI-Powered Diagnosis",
      desc: "Real-time thyroid cancer detection with clinical accuracy.",
    },
    {
      icon: <FaUserMd className="w-7 h-7" />,
      title: "Expert-Driven Insights",
      desc: "Built in collaboration with top endocrinologists and oncologists.",
    },
    {
      icon: <FaShieldAlt className="w-7 h-7" />,
      title: "HIPAA & ISO Certified",
      desc: "We ensure full data security and global medical compliance.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Patients Served" },
    { number: "98%", label: "Diagnosis Accuracy" },
    { number: "25+", label: "Countries Reached" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* خلفية بسيطة متوهجة */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative z-10 grid items-center grid-cols-1 gap-16 px-6 mx-auto max-w-7xl sm:px-8 lg:px-12 lg:grid-cols-2">
        {/* ===== Left Side: Text Content ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            🧬 AI-Powered Healthcare
          </div>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Redefining{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Thyroid Diagnosis
            </span>
          </h2>

          <p className="max-w-xl mb-8 text-lg leading-relaxed text-gray-700">
            <strong>ThyroCareX</strong> leverages advanced AI to detect thyroid cancer early, 
            empowering doctors and patients with faster, more reliable diagnostic insights.
          </p>

          {/* Highlights */}
          <div className="mb-10 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex items-center gap-4 p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
              >
                <div className="flex items-center justify-center text-blue-600 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
              Learn More
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-gray-800 transition-all duration-300 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600">
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* ===== Right Side: Visual Card ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative p-10 overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl">
            {/* Light Glow */}
            <div className="absolute right-0 w-64 h-64 rounded-full -top-20 bg-blue-400/10 blur-3xl"></div>

            <div className="mb-10 text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
                <FaChartLine className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Empowering Smarter Healthcare
              </h3>
              <p className="text-gray-600">
                Combining AI precision with medical expertise.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="p-4 transition-colors bg-gray-50 rounded-2xl hover:bg-blue-50"
                >
                  <div className="mb-1 text-2xl font-bold text-gray-900">
                    {s.number}
                  </div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute flex items-center justify-center w-10 h-10 text-white bg-yellow-400 rounded-full shadow-md -top-6 -right-6"
          >
            ⭐
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            className="absolute flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full shadow-md -bottom-6 -left-6"
          >
            ✓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
