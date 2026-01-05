import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  History, 
  RefreshCcw, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  LogOut,
  Search,
  Scale,
  FileSearch
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
          <div className="p-8 space-y-8 duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                  className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-admin-dark-card rounded-3xl dark:border-admin-dark-border"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-2xl">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <div className="p-8 bg-white border border-gray-100 shadow-sm dark:bg-admin-dark-card rounded-3xl dark:border-admin-dark-border">
              <h3 className="mb-6 text-xl font-bold">Recent Medical Notes</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="p-4 border border-gray-100 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl dark:border-admin-dark-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold">Dr. Sarah Thompson</span>
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
    <div className="flex h-screen overflow-hidden text-gray-800 bg-gray-50/30 dark:bg-admin-dark-bg dark:text-gray-200 ">
      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col pt-20 bg-white border-r border-gray-200 shadow-lg dark:bg-admin-dark-card dark:border-admin-dark-border transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-[280px]'}`}
      >
        {/* Sidebar Header */}
        <div className="relative flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-admin-dark-border/50 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5">
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center flex-1 gap-3"
            >
              <div className="relative flex items-center gap-3 p-2.5 bg-white dark:bg-admin-dark-hover/80 rounded-xl shadow-sm border border-gray-100 dark:border-admin-dark-border/50 backdrop-blur-sm">
                <div className="relative flex items-center justify-center w-10 h-10 shadow-inner rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                  <User size={20} className="relative z-10" />
                  <div className="absolute inset-0 rounded-xl bg-primary/5"></div>
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-sm font-bold leading-tight text-gray-900 truncate dark:text-white">Dr. Ahmed Ali</p>
                  <p className="text-xs font-medium text-gray-500 truncate dark:text-gray-400 mt-0.5">Radiology Specialist</p>
                </div>
              </div>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="flex-shrink-0 p-2.5 text-gray-500 transition-all duration-200 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-gray-400 hover:text-primary hover:shadow-md active:scale-95"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation - Professional Buttons */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                  }`}
              >
                <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 dark:bg-admin-dark-hover group-hover:bg-primary/10'
                }`}>
                  <item.icon className={`transition-colors duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'
                  }`} size={18} />
                </div>
                
                {!isSidebarCollapsed && (
                  <div className="flex flex-col items-start flex-1 overflow-hidden">
                    <span className={`text-sm font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'
                    }`}>{item.label}</span>
                    <span className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                    }`}>{item.labelAr}</span>
                  </div>
                )}
                
                {isActive && (
                  <div className="absolute right-0 w-1 h-8 -translate-y-1/2 rounded-l-full top-1/2 bg-white/30"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 space-y-2 border-t border-gray-100 dark:border-admin-dark-border/50">

          <button 
            onClick={() => navigate('/patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:text-white hover:bg-red-500 dark:hover:bg-red-500/20 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!isSidebarCollapsed && <span className="text-sm font-semibold">Exit</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-[80px]' : 'ml-[280px]'}`}>
        <header className="sticky top-0 z-20 flex items-center justify-between h-20 px-8 border-b border-gray-100 bg-white/80 dark:bg-admin-dark-card/80 backdrop-blur-md dark:border-admin-dark-border/50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
              {menuItems.find(m => m.id === activeView)?.label}
            </h2>
            <div className="w-px h-4 bg-gray-200 dark:bg-admin-dark-border"></div>
            <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              Patient ID: {id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl">
              <Search size={18} />
            </button>
            <button className="relative p-2 text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-admin-dark-card"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto bg-gray-50/30 dark:bg-admin-dark-bg/50 custom-scrollbar">
          <div className="mx-auto max-w-7xl">
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
