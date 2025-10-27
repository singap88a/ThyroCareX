import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHeart, FaShieldAlt, FaStethoscope, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section - Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaStethoscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ThyroCareX
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Revolutionizing thyroid cancer diagnosis through cutting-edge AI technology. 
                We're committed to making accurate, accessible healthcare available to everyone, everywhere.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <FaShieldAlt className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <FaHeart className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">Patient First</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            {/* Right Section - Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {['Home', 'About Us', 'Services', 'Pricing', 'Contact', 'Blog'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Our Services
                </h4>
                <ul className="space-y-3">
                  {['AI Diagnosis', 'Doctor Consultation', 'Second Opinion', 'Progress Tracking', 'Emergency Support', 'Research Access'].map((service) => (
                    <li key={service}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Contact Us
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">123 Medical Innovation Drive</p>
                      <p className="text-gray-300 text-sm">Healthcare City, HC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="w-4 h-4 text-green-400" />
                    <a href="tel:+15551234567" className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                      (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="w-4 h-4 text-purple-400" />
                    <a href="mailto:info@thyrocarex.com" className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                      info@thyrocarex.com
                    </a>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-6">
                  <p className="text-gray-300 text-sm mb-3">Stay updated with our newsletter</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} ThyroCareX. Made with <FaHeart className="w-3 h-3 text-red-400 inline mx-1" /> 
              for better healthcare. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;