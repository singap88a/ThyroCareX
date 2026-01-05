import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  History, 
  RefreshCcw, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Bell,
  LogOut,
  Search,
  PieChart,
  BarChart3,
  Scale,
  FileSearch,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sub-components (we'll refactor these into separate files later if needed)
import PatientDetails from './PatientDetails';
import ReDiagnosis from '../diagnosis/ReDiagnosis';
import DiagnosisComparison from '../diagnosis/DiagnosisComparison';
import DiagnosisHistory from '../diagnosis/DiagnosisHistory';

const PatientDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('results'); // results, info, compare, history, comparison-results

  const menuItems = [
    { 
      id: 'results', 
      label: 'Diagnosis Result', 
      labelAr: 'نتيجة التشخيص', 
      icon: Activity,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      id: 'info', 
      label: 'Diagnosis Info', 
      labelAr: 'معلومات التشخيص', 
      icon: FileText,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      id: 'compare', 
      label: 'Diagnosis Comparison', 
      labelAr: 'مقارنة التشخيص', 
      icon: Scale,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    { 
      id: 'rediagnose', 
      label: 'New Re-Diagnosis', 
      labelAr: 'إعادة التشخيص الجديدة', 
      icon: RefreshCcw,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    { 
      id: 'history', 
      label: 'Diagnosis History', 
      labelAr: 'تاريخ التشخيص', 
      icon: History,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'results':
        return <PatientDetails dashboardMode={true} />;
      case 'info':
        return (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Personal Info', icon: User, items: ['Age: 34', 'Gender: Female', 'Blood Type: A+'] },
                { title: 'Diagnosis Summary', icon: Activity, items: ['Status: Benign', 'Confidence: 91.2%', 'Last Scan: 2024-09-20'] },
                { title: 'Imaging Data', icon: FileSearch, items: ['Ultrasound: Completed', 'CT Scan: Pending', 'MRI: N/A'] }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-admin-dark-card p-6 rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-sm"
                >
                  <div className="w-12 h-12 bg-admin-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <card.icon className="text-admin-primary w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-admin-primary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-admin-dark-card p-8 rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-sm">
              <h3 className="text-xl font-bold mb-6">Recent Medical Notes</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl border border-gray-100 dark:border-admin-dark-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">Dr. Sarah Thompson</span>
                      <span className="text-xs text-gray-400">Oct {10 + i}, 2024</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Patient shows significant improvement in thyroid hormone levels. Recommended continuing current medication dosage.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'compare':
        return <DiagnosisComparison dashboardMode={true} />;
      case 'rediagnose':
        return <ReDiagnosis dashboardMode={true} onComplete={() => setActiveView('compare')} />;
      case 'history':
        return <DiagnosisHistory dashboardMode={true} />;
      default:
        return <PatientDetails dashboardMode={true} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/30 dark:bg-admin-dark-bg overflow-hidden text-gray-800 dark:text-gray-200 ">
      {/* Fixed Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? '80px' : '280px' }}
        className="fixed inset-y-0 left-0 bg-white dark:bg-admin-dark-card border-r border-gray-100 dark:border-admin-dark-border flex flex-col z-30 shadow-sm pt-20"
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50 dark:border-admin-dark-border/50">
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-admin-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                <LayoutDashboard size={18} />
              </div>
              <span className="font-bold text-gray-800 dark:text-white tracking-tight">Portal</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-admin-dark-hover text-gray-400 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation - Slimmer Buttons */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-admin-primary text-white shadow-md shadow-admin-primary/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-admin-dark-hover'
                  }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-100/50 dark:bg-admin-dark-hover group-hover:bg-admin-primary/10'}`}>
                  <item.icon className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-admin-primary'} size={18} />
                </div>
                
                {!isSidebarCollapsed && (
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="font-bold text-xs tracking-wide">{item.label}</span>
                    <span className={`text-[9px] font-medium opacity-60 ${isActive ? 'text-white' : ''}`}>{item.labelAr}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-50 dark:border-admin-dark-border/50 space-y-3">
          <div className={`bg-gray-50 dark:bg-admin-dark-hover/50 rounded-xl p-2 flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-admin-primary/10 flex items-center justify-center text-admin-primary">
              <User size={16} />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-bold text-gray-800 dark:text-white truncate">Dr. Ahmed Ali</p>
                <p className="text-[9px] text-gray-400 truncate">Radiology</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => navigate('/patients')}
            className={`w-full flex items-center gap-3 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!isSidebarCollapsed && <span className="font-bold text-xs">Exit</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-[80px]' : 'ml-[280px]'}`}>
        <header className="h-20 bg-white/80 dark:bg-admin-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-admin-dark-border/50 px-8 flex items-center justify-between z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
              {menuItems.find(m => m.id === activeView)?.label}
            </h2>
            <div className="h-4 w-px bg-gray-200 dark:bg-admin-dark-border"></div>
            <span className="text-[11px] text-admin-primary font-bold bg-admin-primary/5 px-3 py-1 rounded-full border border-admin-primary/10">
              Patient ID: {id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl transition-colors">
              <Search size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-admin-dark-card"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50/30 dark:bg-admin-dark-bg/50 custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
