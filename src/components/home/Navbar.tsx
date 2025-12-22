import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUserPlus,
  FaChevronDown,
  FaStethoscope,
  FaSignOutAlt,
  FaCog,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  // تتبع التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق القوائم عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setProfileDropdown(false);
  }, [location]);

  // الروابط الرئيسية
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    {
      path: "/services",
      label: "Services",
      dropdown: [
        { path: "/services/ai-diagnosis", label: "AI Diagnosis" },
        { path: "/services/doctor-consultation", label: "Doctor Consultation" },
        { path: "/services/second-opinion", label: "Second Opinion" },
        { path: "/services/progress-tracking", label: "Progress Tracking" },
      ],
    },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[500] bg-white/95 backdrop-blur-md transition-all duration-500 ${
        isScrolled ? "shadow-2xl py-2" : "   "
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
{/* اللوجو */}
<Link to="/" className="flex items-center py-1 space-x-3 group">
  <img
    src="/logo.webp"
    alt="ThyroCareX Logo"
    className="object-contain w-12 transition-all duration-300 sm:w-14 md:w-14"
  />
  <div className="flex flex-col items-start leading-tight">
    {/* اسم البراند */}
    <span
      className="text-xl font-extrabold tracking-tight sm:text-xl"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: "#ffffff",
        WebkitTextStroke: "0.8px #4695a5",
        letterSpacing: "-0.5px",
      }}
    >
      THYRO
      <span
        style={{
          color: "#4695a5",
          WebkitTextStroke: "0.8px #4695a5",
        }}
      >
        CAREX
      </span>
    </span>

    {/* الجملة اللي تحت */}
    <span
      className="mt-1 italic font-semibold uppercase text-xs sm:text-[11px]"
      style={{
        color: "#4695a5",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "1px",
      }}
    >
      AI THYROID DIAGNOSIS
    </span>
  </div>
</Link>


          {/* الروابط الرئيسية - وسط الصفحة */}
          <div className="absolute hidden transform -translate-x-1/2 lg:flex left-1/2">
            <div className="flex items-center px-4 py-2 space-x-1 border border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.dropdown ? (
                    // رابط مع قائمة منسدلة
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(link.path)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          isActiveLink(link.path)
                            ? "text-primary bg-primary/10 shadow-sm"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            activeDropdown === link.path ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      {/* القائمة المنسدلة */}
                      {activeDropdown === link.path && (
                        <div className="absolute left-0 w-64 py-3 mt-2 bg-white border border-gray-100 shadow-2xl top-full rounded-2xl backdrop-blur-md">
                          {link.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="flex items-center px-4 py-3 text-gray-700 transition-all duration-300 hover:text-primary hover:bg-primary/10 group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="w-2 h-2 mr-3 transition-colors duration-300 rounded-full bg-primary/20 group-hover:bg-primary"></div>
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // رابط عادي
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActiveLink(link.path)
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {isActiveLink(link.path) && (
                        <div className="absolute bottom-0 w-6 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-primary"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* أزرار المستخدم */}
          <div className="items-center hidden space-x-3 lg:flex">
            {isLoggedIn ? (
              <>
                {/* Add Patient Button */}
                <Link
                  to="/add-patient"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-primary   text-white font-medium rounded-xl  transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  <FaStethoscope className="w-4 h-4" />
                  <span>Add Patient</span>
                </Link>

                {/* Profile section when logged in */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center px-4 py-2 space-x-3 transition-all duration-300 rounded-xl hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-primary">
                      <FaUser className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                        profileDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdown && (
                    <div className="absolute right-0 w-56 py-2 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl backdrop-blur-md">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-gray-700 transition-all duration-300 hover:text-primary hover:bg-primary/10"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <FaUserCircle className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/add-patient"
                        className="flex items-center px-4 py-3 text-gray-700 transition-all duration-300 hover:text-primary hover:bg-primary/10"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <FaStethoscope className="w-4 h-4 mr-3" />
                        Add Patient
                      </Link>
                      <Link
                        to="/patients"
                        className="flex items-center px-4 py-3 text-gray-700 transition-all duration-300 hover:text-primary hover:bg-primary/10"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <FaUsers className="w-4 h-4 mr-3" />
                        All Patients
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-3 text-gray-700 transition-all duration-300 hover:text-primary hover:bg-primary/10"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <FaCog className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 transition-all duration-300 hover:text-red-600 hover:bg-red-50"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Login/Register buttons when not logged in
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-6 py-2.5 text-gray-700 hover:text-primary font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-primary"
                >
                  <FaUser className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  <FaUserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>

          {/* زر القائمة للشاشات الصغيرة */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-12 h-12 text-gray-700 transition-all duration-300 bg-gray-100 hover:bg-gray-200 rounded-xl hover:scale-105"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للشاشات الصغيرة */}
        {isOpen && (
          <div className="absolute left-0 right-0 border-t border-gray-200 shadow-2xl lg:hidden top-full bg-white/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.path ? null : link.path
                          )
                        }
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActiveLink(link.path)
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            activeDropdown === link.path ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === link.path && (
                        <div className="p-2 ml-4 space-y-1 bg-gray-50 rounded-xl">
                          {link.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="flex items-center px-4 py-2.5 text-gray-600 hover:text-primary rounded-lg hover:bg-white transition-all duration-300"
                              onClick={() => {
                                setIsOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary/30 rounded-full mr-3"></div>
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActiveLink(link.path)
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 hover:text-primary hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* أزرار المستخدم للجوال */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                {isLoggedIn && (
                  <Link
                    to="/add-patient"
                    className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaStethoscope className="w-4 h-4 mr-2" />
                    Add Patient
                  </Link>
                )}
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-3 font-medium text-gray-700 transition-all duration-300 border border-gray-300 rounded-xl hover:border-primary hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-primary to-primaryHover text-white font-medium rounded-xl hover:from-primaryHover hover:to-primary transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="w-4 h-4 mr-2" />
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
