import { useState } from 'react';
import { FaEnvelope, FaBell, FaShieldAlt, FaGift } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with:', email);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const benefits = [
    {
      icon: <FaBell className="w-5 h-5" />,
      text: "Latest AI healthcare innovations"
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      text: "Thyroid care advancements"
    },
    {
      icon: <FaGift className="w-5 h-5" />,
      text: "Exclusive offers & early access"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-72 h-72 opacity-10"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-white rounded-full w-96 h-96 opacity-10"></div>
      <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2 opacity-5"></div>
      
      <div className="relative max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center text-white">
          
          {/* Header */}
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-white rounded-full bg-opacity-20 backdrop-blur-sm">
            📰 STAY INFORMED
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Never Miss Important
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Health Updates
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-blue-100">
            Join 50,000+ healthcare professionals and patients who receive our exclusive 
            updates on thyroid care breakthroughs, AI innovations, and medical advancements.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-2 bg-white rounded-full bg-opacity-10 backdrop-blur-sm">
                <div className="text-yellow-300">
                  {benefit.icon}
                </div>
                <span className="text-sm font-medium text-white">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaEnvelope className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email address"
                    className="w-full py-4 pl-12 pr-4 text-lg text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center min-w-[160px]"
                >
                  <FaBell className="w-5 h-5" />
                  Subscribe
                </button>
              </div>
              
              {/* Privacy Note */}
              <p className="mt-4 text-sm text-center text-blue-200">
                🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
              </p>
            </form>
          ) : (
            /* Success Message */
            <div className="max-w-md p-8 mx-auto bg-white border border-white bg-opacity-20 rounded-2xl backdrop-blur-sm border-opacity-30">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Welcome Aboard! 🎉</h3>
              <p className="text-blue-100">
                Thank you for subscribing! We've sent a confirmation email with exclusive content.
              </p>
            </div>
          )}

 
        </div>
      </div>
    </section>
  );
};

export default Newsletter;