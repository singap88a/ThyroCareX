import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaSearch, FaShieldAlt, FaUserMd, FaClock, FaHeartbeat } from 'react-icons/fa';

const faqs = [
  {
    question: 'How does the AI diagnosis work?',
    answer: 'Our AI uses advanced machine learning algorithms trained on thousands of thyroid scans to analyze medical data and provide accurate diagnosis recommendations.',
    icon: <FaHeartbeat className="w-5 h-5" />
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes, we use HIPAA-compliant encryption and security measures to protect all patient data. Your privacy is our top priority.',
    icon: <FaShieldAlt className="w-5 h-5" />
  },
  {
    question: 'Can I talk to a doctor directly?',
    answer: 'Absolutely. Our premium plans include direct consultation with certified endocrinologists and thyroid specialists.',
    icon: <FaUserMd className="w-5 h-5" />
  },
  {
    question: 'How long does it take to get results?',
    answer: 'Most analyses are completed within 15-30 minutes. Urgent cases are prioritized for faster processing.',
    icon: <FaClock className="w-5 h-5" />
  },
  {
    question: 'Do you accept insurance?',
    answer: 'We work with most major insurance providers. Contact our support team to check coverage for your specific plan.',
    icon: <FaSearch className="w-5 h-5" />
  },
  {
    question: 'What makes ThyroCareX different?',
    answer: 'We combine AI precision with human expertise, offering a seamless integration of technology and medical care for comprehensive thyroid health management.',
    icon: <FaHeartbeat className="w-5 h-5" />
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section className="py-20 bg-gradient-to-b ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-primary/20 bg-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">
              Questions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-600">
            Find answers to common questions about ThyroCareX AI diagnosis and services.
          </p>
        </div>

        {/* Two Column FAQ Grid */}
        <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnFaqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-start w-full gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50 rounded-2xl"
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-lg text-primary bg-primary/10">
                    {faq.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="pr-8 mb-2 text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="pr-4 leading-relaxed text-gray-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-primary">
                    {openIndex === index ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnFaqs.map((faq, index) => {
              const adjustedIndex = index + leftColumnFaqs.length;
              return (
                <div
                  key={adjustedIndex}
                  className="transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(adjustedIndex)}
                    className="flex items-start w-full gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50 rounded-2xl"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-lg text-primary bg-primary/10">
                      {faq.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="pr-8 mb-2 text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <AnimatePresence>
                        {openIndex === adjustedIndex && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="pr-4 leading-relaxed text-gray-600">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-primary">
                      {openIndex === adjustedIndex ? (
                        <FaChevronUp className="w-4 h-4" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

 
      </div>
    </section>
  );
};

export default FAQ;