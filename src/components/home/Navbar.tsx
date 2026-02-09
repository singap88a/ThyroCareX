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
  FaHome,
  FaInfoCircle,
  FaComments,
  FaTag,
  FaEnvelope,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    setProfileDropdown(false);
  }, [location]);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown-container")) {
        setProfileDropdown(false);
      }
    };
    if (profileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdown]);

  // الروابط الرئيسية
  const navLinks = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/community", label: "Community", icon: FaComments },
    { path: "/pricing", label: "Pricing", icon: FaTag },
    { path: "/contact", label: "Contact", icon: FaEnvelope },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // تقصير اسم المستخدم - فقط الاسم الأول أو أول حرفين
  const getShortUserName = () => {
    const name = user?.firstName || user?.username || "User";
    if (name.length <= 4) return name;
    return `${name.substring(0, 4)}...`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] ${
        isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* اللوجو - احترافي ومكبر */}
          <Link
            to="/"
            className="z-10 flex items-center py-1 space-x-3 group"
          >
            <img
              src="/logo.png"
              alt="ThyroCareX Logo"
              className="object-contain  w-48 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-md"
            />
          </Link>

          {/* الروابط الرئيسية - تصميم احترافي جديد */}
          <div className="absolute hidden transform -translate-x-1/2 lg:flex left-1/2">
            <div className="flex items-center gap-0.5 px-2 py-2 border shadow-sm bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-xl rounded-2xl border-gray-200/60">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = isActiveLink(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm group ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm border-2 border-primary"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100/80 border-2 border-transparent"
                    }`}
                  >
                    <IconComponent
                      className="w-4 h-4"
                    />
                    <span className="whitespace-nowrap">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* أزرار المستخدم - تصميم احترافي */}
          <div className="flex items-center gap-3 lg:gap-4">
            {isLoggedIn ? (
              <>
                {/* Add Patient Button - تصميم أنيق */}
                <Link
                  to="/add-patient"
                  className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25"
                >
                  <FaStethoscope className="w-4 h-4" />
                  <span>Add Patient</span>
                </Link>

                {/* Profile Dropdown - تصميم احترافي */}
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50/80"
                  >
                    <div className="flex items-center justify-center rounded-full shadow-md w-9 h-9 bg-primary ring-2 ring-primary/20">
                      <FaUser className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden xl:block font-medium text-sm text-gray-700 max-w-[60px] truncate">
                      {getShortUserName()}
                    </span>
                    <FaChevronDown
                      className={`hidden xl:block w-3 h-3 text-gray-400 ${
                        profileDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdown && (
                    <div className="absolute right-0 w-64 mt-2 overflow-hidden duration-200 border shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl border-gray-200/60 animate-in fade-in slide-in-from-top-2">
                      {/* User Info Header */}
                      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary/5 to-transparent">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:text-primary hover:bg-primary/5"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaUserCircle className="w-4 h-4 text-gray-400" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/add-patient"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:text-primary hover:bg-primary/5"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaStethoscope className="w-4 h-4 text-gray-400" />
                          <span>Add Patient</span>
                        </Link>
                        <Link
                          to="/patients"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:text-primary hover:bg-primary/5"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaUsers className="w-4 h-4 text-gray-400" />
                          <span>All Patients</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:text-primary hover:bg-primary/5"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaCog className="w-4 h-4 text-gray-400" />
                          <span>Settings</span>
                        </Link>
                        <div className="my-1 border-t border-gray-100"></div>
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdown(false);
                          }}
                          className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:text-red-600 hover:bg-red-50/50"
                        >
                          <FaSignOutAlt className="w-4 h-4 text-gray-400" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Login/Register buttons - تصميم احترافي
              <>
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-primary font-medium text-sm rounded-xl hover:bg-gray-50/80 border border-gray-200/60 hover:border-primary/30"
                >
                  <FaUser className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25"
                >
                  <FaUserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 text-gray-700 lg:hidden bg-gray-100/80 hover:bg-gray-200/80 rounded-xl"
            >
              {isOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - تصميم احترافي */}
        {isOpen && (
          <div className="border-t lg:hidden border-gray-200/60 bg-white/98 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = isActiveLink(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50/80"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 space-y-2 border-t border-gray-200/60">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/add-patient"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-primary text-white font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaStethoscope className="w-4 h-4" />
                      <span>Add Patient</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3.5 text-gray-700 font-medium text-sm rounded-xl transition-all duration-200 hover:bg-gray-50/80"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUserCircle className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/patients"
                      className="flex items-center gap-3 px-4 py-3.5 text-gray-700 font-medium text-sm rounded-xl transition-all duration-200 hover:bg-gray-50/80"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUsers className="w-4 h-4" />
                      <span>All Patients</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3.5 text-red-600 font-medium text-sm rounded-xl hover:bg-red-50/80"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-gray-700 font-medium text-sm rounded-xl border border-gray-200/60 hover:border-primary/30 hover:bg-gray-50/80"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUser className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-primary text-white font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUserPlus className="w-4 h-4" />
                      <span>Get Started</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
