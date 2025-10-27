"use client";
import { motion } from "framer-motion";
import { FaRocket, FaBrain, FaAward, FaGlobe, FaUsers } from "react-icons/fa";

const AboutTimeline = () => {
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to transform thyroid cancer diagnosis.",
      icon: <FaRocket className="w-6 h-6" />,
    },
    {
      year: "2021",
      title: "AI Model Development",
      description: "Trained initial AI models on 50,000+ thyroid scans.",
      icon: <FaBrain className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "FDA Approval",
      description: "Received FDA clearance for our diagnostic platform.",
      icon: <FaAward className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Launched services in 25+ countries worldwide.",
      icon: <FaGlobe className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "50K Patients Served",
      description: "Reached milestone of serving 50,000 patients globally.",
      icon: <FaUsers className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        {/* ==== Header ==== */}
        <div className="relative mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-5 py-2 mb-6 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
          >
            🩺 Our Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl"
          >
            Milestones of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            From humble beginnings to a globally trusted AI diagnostic platform —
            here’s how ThyroCareX evolved through innovation and dedication.
          </motion.p>
        </div>

        {/* ==== Timeline ==== */}
        <div className="relative">
          {/* الخط العمودي */}
          <div className="absolute w-1 h-full transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {/* العناصر */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* المحتوى */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12"
                  }`}
                >
                  <div className="relative z-10 p-6 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 text-blue-600 bg-blue-100 shadow-md rounded-xl">
                        {milestone.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-blue-600">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

 {/* النقطة المتوهجة (منتصفة بالضبط) */}
<motion.div
  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
  transition={{ repeat: Infinity, duration: 2 }}
  className="absolute z-20 w-8 h-8 border-4 border-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600"
  style={{ left: "48.7%", transform: "translateX(calc(-50% + 2px))" }}
></motion.div>

{/* تأثير توهج خارجي */}
<motion.div
  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] }}
  transition={{ repeat: Infinity, duration: 2 }}
  className="absolute z-10 rounded-full w-14 h-14 bg-blue-400/30 blur-md"
  style={{ left: "48.7%", transform: "translateX(calc(-50% + 2px))" }}
></motion.div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
