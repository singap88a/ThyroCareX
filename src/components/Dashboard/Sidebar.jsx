import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  CreditCard,
  Coins,
  FolderOpen,
  MessageSquare,
  Shield,
  Settings,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './AdminDashboard.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navSections = [
    {
      title: 'Main',
      items: [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' }
      ]
    },
    {
      title: 'Management',
      items: [
        { path: '/admin/doctors', icon: Users, label: 'Doctors', badge: '24' },
        { path: '/admin/cases', icon: FileText, label: 'Cases' },
        { path: '/admin/ai-logs', icon: Activity, label: 'AI Logs' }
      ]
    },
    {
      title: 'Billing',
      items: [
        { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
        { path: '/admin/credits', icon: Coins, label: 'Credits' }
      ]
    },
    {
      title: 'System',
      items: [
        { path: '/admin/media', icon: FolderOpen, label: 'Media' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Messages', badge: '5' },
        { path: '/admin/users', icon: Shield, label: 'Admin Users' },
        { path: '/admin/announcements', icon: Bell, label: 'Announcements' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' }
      ]
    }
  ];

  return (
    <motion.aside
      className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          T
        </div>
        {!collapsed && (
          <div className="sidebar-title">
            ThyroCare
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navSections.map((section, idx) => (
          <div key={idx} className="nav-section">
            {!collapsed && (
              <div className="nav-section-title">
                {section.title}
              </div>
            )}
            {section.items.map((item, itemIdx) => (
              <motion.div
                key={itemIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                className="nav-item"
              >
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <item.icon className="nav-icon" />
                  {!collapsed && (
                    <>
                      <span className="nav-text">{item.label}</span>
                      {item.badge && (
                        <span className="nav-badge">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-8 right-4 w-8 h-8 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-[#4695a5] hover:text-white transition-all duration-300 flex items-center justify-center"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
