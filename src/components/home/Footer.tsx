import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-gray-900 bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-primary"></div>
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Section - Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/logo_edit.png" alt="Thyrax Logo" className="w-40 rounded-xl" />
     
              </div>

              <p className="max-w-md text-lg leading-relaxed text-gray-600">
                Revolutionizing thyroid cancer diagnosis through cutting-edge AI technology.
                We're committed to making accurate, accessible healthcare available to everyone, everywhere.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <FaShieldAlt className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <FaHeart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-700">Patient First</span>
                </div>
              </div>
            </div>

            {/* Right Section - Links Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h4 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Pricing', path: '/pricing' },
                    { name: 'Community', path: '/community' },
                    { name: 'Contact', path: '/contact' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 text-gray-600 transition-all duration-300 hover:text-primary hover:translate-x-2 group"
                      >
                        <div className="w-1 h-1 transition-colors duration-300 bg-gray-400 rounded-full group-hover:bg-primary"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Legal
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Privacy Policy', path: '/privacy' },
                    { name: 'Terms of Service', path: '/terms' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 text-gray-600 transition-all duration-300 hover:text-primary hover:translate-x-2 group"
                      >
                        <div className="w-1 h-1 transition-colors duration-300 bg-gray-400 rounded-full group-hover:bg-primary"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Follow Us
                </h4>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Stay connected with us</p>
                  <div className="flex gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-all duration-300 transform bg-white shadow-sm group w-14 h-14 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                      <FaFacebook size={24} className="text-gray-600 transition-colors duration-300 group-hover:text-primary" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-all duration-300 transform bg-white shadow-sm group w-14 h-14 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                      <FaTwitter size={24} className="text-gray-600 transition-colors duration-300 group-hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-all duration-300 transform bg-white shadow-sm group w-14 h-14 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                      <FaLinkedin size={24} className="text-gray-600 transition-colors duration-300 group-hover:text-blue-700" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-all duration-300 transform bg-white shadow-sm group w-14 h-14 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                      <FaInstagram size={24} className="text-gray-600 transition-colors duration-300 group-hover:text-pink-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Thyrax. Made with <FaHeart className="inline w-3 h-3 mx-1 text-red-500" />
              for better healthcare. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Developed by <a href="https://ahmedsingap.com/en" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-primaryHover transition-colors">Ahmed Singap</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;