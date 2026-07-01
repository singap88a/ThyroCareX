import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, Activity, History, RefreshCcw,
  FileText, ChevronLeft, ChevronRight, Bell, LogOut,
  Scale, FileSearch, CircleCheck, Target, Calendar,
  Phone, MapPin, Weight, Ruler, Pill, AlertCircle,
  Loader2, Brain, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientDetails from './PatientDetails';
import ReDiagnosis from '../diagnosis/ReDiagnosis';
import DiagnosisComparison from '../diagnosis/DiagnosisComparison';
import DiagnosisHistory from '../diagnosis/DiagnosisHistory';
import Anatomy3DView from '../diagnosis/Anatomy3DView';
import PatientChat from '../../components/patients/PatientChat';
import PatientAiAgent from '../../components/patients/PatientAiAgent';
import patientService from '../../services/patientService';
import { useNotifications } from '../../contexts/NotificationContext';

/* ── Patient Info View (real data) ────────────────────── */
const PatientInfoView = ({ patient }) => {
  if (!patient) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const genderLabel = patient.gender === 0 || patient.gender === 'Male' ? 'Male' : 'Female';
  const regDate = patient.registrationAt
    ? new Date(patient.registrationAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';
  const bmi = patient.height && patient.weight
    ? (Number(patient.weight) / ((Number(patient.height) / 100) ** 2)).toFixed(1)
    : null;

  const infoCards = [
    { icon: User,     label: 'Full Name',    value: patient.fullName    || '—' },
    { icon: Calendar, label: 'Age',          value: patient.age ? `${patient.age} years` : '—' },
    { icon: Activity, label: 'Gender',       value: genderLabel },
    { icon: Phone,    label: 'Phone',        value: patient.phoneNumber  || '—' },
    { icon: MapPin,   label: 'Address',      value: patient.address      || '—' },
    { icon: Clock,    label: 'Registered',   value: regDate },
    { icon: Ruler,    label: 'Height',        value: patient.height ? `${patient.height} cm` : '—' },
    { icon: Weight,   label: 'Weight',        value: patient.weight ? `${patient.weight} kg` : '—' },
    { icon: Scale,    label: 'BMI',           value: bmi || '—' },
  ];

  return (
    <div className="p-8 space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-4">
      {/* Banner */}
      <div className="flex flex-col md:flex-row gap-6 p-8 bg-white border border-gray-100 shadow-sm dark:bg-admin-dark-card rounded-3xl dark:border-admin-dark-border">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primaryHover flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-xl shadow-primary/30">
          {(patient.fullName || 'P').charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{patient.fullName}</h2>
              <p className="text-primary font-bold flex items-center gap-2 mt-1">
                <User size={15} /> Patient ID: #{patient.patientID}
              </p>
            </div>
            <span className="self-start px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 dark:bg-green-900/20 rounded-xl">
              Active Patient
            </span>
          </div>
          {patient.email && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.email}</p>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoCards.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-white border border-gray-100 dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Medical History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-200">
            <FileText size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Medical History</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{patient.medicalHistory || '—'}</p>
        </div>
        <div className="bg-white border border-gray-100 dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-200">
            <Pill size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Current Medications</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{patient.currentMedications || '—'}</p>
        </div>
        <div className="bg-white border border-gray-100 dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-200">
            <AlertCircle size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Known Allergies</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{patient.knownAllergies || '—'}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main Dashboard ────────────────────────────────────── */
const PatientDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('info'); // default to patient info
  const [patient, setPatient] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const { getUnreadCountForPatient, markAllAsRead } = useNotifications();
  const patientUnreadCount = getUnreadCountForPatient(id);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = (params.get('view') || '').toLowerCase();
    const testIdParam = params.get('testId');
    if (testIdParam) {
      const n = parseInt(testIdParam, 10);
      if (!Number.isNaN(n)) setSelectedTestId(n);
    }
    if (view && ['info', 'results', 'anatomy', 'history', 'compare', 'rediagnose', 'ai_agent', 'chat'].includes(view)) {
      setActiveView(view);
    }
  }, [location.search]);

  const fetchPatient = async () => {
    try {
      const res = await patientService.getPatientById(id);
      if (res.succeeded) setPatient(res.data);
    } catch (err) {
      console.error('Failed to load patient', err);
    } finally {
      setLoadingPatient(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const menuItems = [
    { id: 'info',       label: 'Patient Info',        labelAr: 'معلومات المريض',     icon: User,         color: 'text-primary',     bg: 'bg-primary/10'     },
    { id: 'results',    label: 'Diagnosis Result',     labelAr: 'نتيجة التشخيص',     icon: Activity,     color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
    { id: 'anatomy',    label: '3D Anatomical Map',    labelAr: 'الخريطة التشريحية 3D', icon: Target,       color: 'text-indigo-500',  bg: 'bg-indigo-500/10'  },
    { id: 'history',    label: 'Diagnosis History',    labelAr: 'تاريخ التشخيص',     icon: History,      color: 'text-green-500',   bg: 'bg-green-500/10'   },
    { id: 'compare',    label: 'Diagnosis Comparison', labelAr: 'مقارنة التشخيص',    icon: Scale,        color: 'text-orange-500',  bg: 'bg-orange-500/10'  },
    { id: 'rediagnose', label: 'New Re-Diagnosis',     labelAr: 'إعادة التشخيص',     icon: RefreshCcw,   color: 'text-red-500',     bg: 'bg-red-500/10'     },
    { id: 'ai_agent',   label: 'AI Agent',             labelAr: 'اسأل الذكاء الاصطناعي', icon: Brain,        color: 'text-pink-500',    bg: 'bg-pink-500/10'    },
    { id: 'chat',       label: 'Contact Patient',      labelAr: 'التواصل مع المريض',  icon: Bell,         color: 'text-purple-500',  bg: 'bg-purple-500/10'  },
  ];

  const handleTestSelect = (testId) => {
    setSelectedTestId(testId);
    setActiveView('results');
  };

  const handleReDiagnosisComplete = (newTestId) => {
    setSelectedTestId(newTestId);
    setActiveView('results');
    fetchPatient(); // Refresh patient info too just in case
  };

  const renderContent = () => {
    switch (activeView) {
      case 'info':       return <PatientInfoView patient={patient} />;
      case 'results':    return <PatientDetails dashboardMode={true} testId={selectedTestId} />;
      case 'anatomy':    return <Anatomy3DView patientId={id} testId={selectedTestId} />;
      case 'history':    return <DiagnosisHistory dashboardMode={true} onSelectTest={handleTestSelect} />;
      case 'compare':    return <DiagnosisComparison dashboardMode={true} />;
      case 'rediagnose': return <ReDiagnosis dashboardMode={true} onComplete={handleReDiagnosisComplete} onPatientSave={fetchPatient} />;
      case 'ai_agent':   return <PatientAiAgent patientId={id} testId={selectedTestId} />;
      case 'chat':       return <PatientChat patientId={id} />;
      default:           return <PatientInfoView patient={patient} />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden text-gray-800 bg-gray-50/30 dark:bg-admin-dark-bg dark:text-gray-200">
      {/* Fixed Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col pt-20 bg-white border-r border-gray-200 shadow-lg dark:bg-admin-dark-card dark:border-admin-dark-border transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-[280px]'}`}>
        {/* Sidebar Header */}
        <div className="relative flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-admin-dark-border/50 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent">
          {!isSidebarCollapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center flex-1 gap-3">
              <div className="relative flex items-center gap-3 p-2.5 bg-white dark:bg-admin-dark-hover/80 rounded-xl shadow-sm border border-gray-100 dark:border-admin-dark-border/50 backdrop-blur-sm">
                {loadingPatient ? (
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryHover flex items-center justify-center text-white font-bold shadow">
                    {(patient?.fullName || 'P').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-sm font-bold leading-tight text-gray-900 truncate dark:text-white">
                    {loadingPatient ? 'Loading…' : (patient?.fullName || `Patient #${id}`)}
                  </p>
                  <p className="text-xs font-medium text-gray-500 truncate dark:text-gray-400 mt-0.5">
                    ID: #{id}
                  </p>
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

        {/* Navigation */}
        <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (item.id !== 'results') setSelectedTestId(null);
                  if (item.id === 'chat') markAllAsRead(id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group relative ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                }`}
              >
                <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-admin-dark-hover group-hover:bg-primary/10'
                }`}>
                  <item.icon className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} size={18} />
                </div>
                {!isSidebarCollapsed && (
                  <div className="flex flex-col items-start flex-1 overflow-hidden">
                    <span className={`text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>{item.label}</span>
                    <span className={`text-xs font-medium transition-colors ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{item.labelAr}</span>
                  </div>
                )}
                {item.id === 'chat' && patientUnreadCount > 0 && (
                  <span className={`absolute ${isSidebarCollapsed ? 'top-0 right-0' : 'right-4'} flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white`}>
                    {patientUnreadCount}
                  </span>
                )}
                {isActive && <div className="absolute right-0 w-1 h-8 -translate-y-1/2 rounded-l-full top-1/2 bg-white/30" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-admin-dark-border/50">
          <button
            onClick={() => navigate('/patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:text-white hover:bg-red-500 transition-all duration-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!isSidebarCollapsed && <span className="text-sm font-semibold">Back to Patients</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 h-[calc(100vh-80px)] overflow-y-auto bg-gray-50/30 dark:bg-admin-dark-bg/50 custom-scrollbar transition-all duration-300 ${isSidebarCollapsed ? 'ml-[80px]' : 'ml-[280px]'}`}>
        <header className="flex items-center justify-between h-20 px-8 border-b border-gray-100 bg-white dark:bg-admin-dark-card dark:border-admin-dark-border/50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
              {menuItems.find(m => m.id === activeView)?.label}
            </h2>
            <div className="w-px h-4 bg-gray-200 dark:bg-admin-dark-border" />
            <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              {loadingPatient ? `Patient #${id}` : (patient?.fullName || `Patient #${id}`)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-admin-dark-hover rounded-xl">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl pt-4 pb-12">
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
      </main>
    </div>
  );
};

export default PatientDashboard;
