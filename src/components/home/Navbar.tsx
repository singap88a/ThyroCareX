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
  FaBell
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const { unreadCount, notifications, markAllAsRead } = useNotifications();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileDropdown(false);
    setNotifDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown-container")) {
        setProfileDropdown(false);
        setNotifDropdown(false);
      }
    };
    if (profileDropdown || notifDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdown, notifDropdown]);

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
          <Link to="/" className="z-10 flex items-center py-1 space-x-3 group">
            <img
              src="/logo.png"
              alt="Thyrax Logo"
              className="object-contain w-48 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-md"
            />
          </Link>

          {/* Center Links */}
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
                    <IconComponent className="w-4 h-4" />
                    <span className="whitespace-nowrap">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/add-patient"
                  className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25"
                >
                  <FaStethoscope className="w-4 h-4" />
                  <span>Add Patient</span>
                </Link>

                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50/80"
                  >
                    <div className="flex items-center justify-center rounded-full shadow-md w-9 h-9 bg-primary ring-2 ring-primary/20">
                      <FaUser className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden xl:block font-medium text-sm text-gray-700 max-w-[60px] truncate">
                      {getShortUserName()}
                    </span>
                  </button>

                  {profileDropdown && (
                    <div className="absolute right-0 w-64 mt-2 overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl border-gray-200/60 animate-in fade-in slide-in-from-top-2 z-50">
                      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary/5 to-transparent">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setProfileDropdown(false)}>
                          <FaUserCircle className="w-4 h-4 text-gray-400" />
                          <span>Profile</span>
                        </Link>
                        <Link to="/patients" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setProfileDropdown(false)}>
                          <FaUsers className="w-4 h-4 text-gray-400" />
                          <span>All Patients</span>
                        </Link>
                        <div className="my-1 border-t border-gray-100"></div>
                        <button onClick={() => { logout(); setProfileDropdown(false); }} className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50/50">
                          <FaSignOutAlt className="w-4 h-4 text-gray-400" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notification Bell - FAR RIGHT */}
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() => setNotifDropdown(!notifDropdown)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100/80 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <FaBell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white animate-bounce-in">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifDropdown && (
                    <div className="absolute right-0 w-80 mt-2 overflow-hidden border shadow-2xl bg-white rounded-2xl border-gray-200 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-sm font-black text-gray-900">Notifications</h3>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center">
                            <FaBell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 font-medium">No new messages</p>
                          </div>
                        ) : (
                          notifications
                            .filter(n => n.senderType === 'Patient')
                            .map((notif, idx) => (
                            <Link
                              key={idx}
                              to={`/patients/${notif.senderId}/dashboard?view=chat`}
                              className="flex items-start gap-3 px-3 py-3 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-sm transition-all duration-200"
                              onClick={() => {
                                setNotifDropdown(false);
                                markAllAsRead(notif.senderId); // Only mark this patient as read
                              }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-black flex-shrink-0 shadow-sm">
                                  {notif.patient?.fullName?.charAt(0) || notif.patient?.FullName?.charAt(0) || 'P'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <p className="text-xs font-black text-gray-900 truncate">
                                      {notif.patient?.fullName || notif.patient?.FullName || 'Patient'}
                                    </p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase ml-2 flex-shrink-0">
                                      {new Date(notif.sentAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </p>
                                  </div>
                                  <p className="text-xs text-gray-500 truncate mt-0.5">{notif.content}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <p className="text-[10px] text-gray-400 font-bold">
                                      {new Date(notif.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary" />}
                                  </div>
                                </div>
                            </Link>
                          ))
                        )}
                      </div>
                      <Link to="/patients" className="block py-3 text-center text-[10px] font-black text-primary uppercase tracking-widest hover:bg-gray-50 border-t border-gray-50" onClick={() => setNotifDropdown(false)}>
                        View All Patients
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-primary font-medium text-sm rounded-xl border border-gray-200/60">
                  <FaUser className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:shadow-lg">
                  <FaUserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </>
            )}

            <button onClick={toggleMenu} className="flex items-center justify-center w-10 h-10 text-gray-700 lg:hidden bg-gray-100/80 rounded-xl">
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t lg:hidden border-gray-200/60 bg-white/98 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm ${isActiveLink(link.path) ? "text-primary bg-primary/10" : "text-gray-700"}`} onClick={() => setIsOpen(false)}>
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
