import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, User, Calendar, Activity, Plus,
  LayoutDashboard, Download, Phone, AlertCircle,
  CircleCheck, Loader2, RefreshCcw, UserPlus, Trash2, 
  ChevronRight, ShieldAlert, ShieldCheck, Microscope, 
  Stethoscope, Clock, CheckCircle2, XCircle, SearchX, Brain,
  AlertTriangle, Heart, Activity as ActivityIcon, TrendingUp,
  FileText, Copy, Check, Smartphone, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import patientService from '../../services/patientService';
import toast from 'react-hot-toast';

// --- Delete Confirmation Modal ---
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, patientName, isDeleting }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6"><Trash2 size={32} /></div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Delete Patient?</h3>
          <p className="text-gray-500 font-medium mb-8">Delete <span className="font-bold text-gray-900">{patientName}</span>? This is irreversible.</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all">Cancel</button>
            <button onClick={onConfirm} disabled={isDeleting} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 shadow-lg transition-all">{isDeleting ? <Loader2 className="animate-spin" size={16}/> : 'Delete Now'}</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Patient Code Badge (for doctor to share with patient) ---
const PatientCodeBadge = ({ patientID }) => {
  const [copied, setCopied] = useState(false);
  const code = `TC-${String(patientID).padStart(5, '0')}`;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(String(patientID)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={e => e.preventDefault()}
      className="flex items-center gap-2 mt-2.5"
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-xl shadow-lg shadow-violet-500/20">
        <Smartphone size={11} className="opacity-80" />
        <span className="font-black text-[10px] uppercase tracking-[0.15em]">Syrux Code</span>
        <span className="font-black text-[13px] tracking-tight ml-1 font-mono">{code}</span>
      </div>
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
          copied
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
            : 'bg-white border border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50'
        }`}
        title="Copy Patient ID for Syrux app"
      >
        {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
      </button>
    </div>
  );
};

const PatientsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, patient: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPatients = async () => {
    if (!user?.DoctorId) return;
    setLoading(true);
    try {
      const res = await patientService.getMyPatients(user.DoctorId);
      if (res.succeeded) {
        // Sort newest first
        const sorted = (res.data || []).sort((a, b) => b.patientID - a.patientID);
        setPatients(sorted);
      }
    } catch (err) {
      toast.error('Sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, [user?.DoctorId]);

  const handleDelete = async () => {
    if (!deleteModal.patient) return;
    setIsDeleting(true);
    try {
      const res = await patientService.deletePatient(deleteModal.patient.patientID);
      if (res.succeeded) {
        toast.success('Patient Removed');
        setPatients(prev => prev.filter(p => p.patientID !== deleteModal.patient.patientID));
        setDeleteModal({ isOpen: false, patient: null });
      }
    } catch (err) { toast.error('Error deleting'); } finally { setIsDeleting(false); }
  };

  const getStatusConfig = (p) => {
    const status = (p.latestStatus || '').toLowerCase();
    const cancer = (p.cancerClassification || '').toLowerCase();
    const nextStep = (p.nextStep || '').toLowerCase();

    // --- PRIORITY 1: MALIGNANT (CRITICAL) ---
    if (cancer.includes('malignant') || status.includes('cancer') || status.includes('malignant')) {
      return { bg: 'bg-red-100/40 hover:bg-red-100/60', border: 'border-red-300', tag: 'Malignant', tagColor: 'bg-red-600', icon: <ShieldAlert className="text-red-600" size={18}/>, description: 'Malignancy Detected', textColor: 'text-red-900', subText: 'text-red-700/60' };
    }
    
    // --- PRIORITY 2: BENIGN (LOW RISK) ---
    if (cancer.includes('benign') || status.includes('benign')) {
      return { bg: 'bg-sky-100/40 hover:bg-sky-100/60', border: 'border-sky-300', tag: 'Benign', tagColor: 'bg-sky-600', icon: <Heart className="text-sky-600" size={18}/>, description: 'Benign Result', textColor: 'text-sky-900', subText: 'text-sky-700/60' };
    }

    // --- PRIORITY 3: PENDING SCAN (Only if not diagnosed yet) ---
    if (nextStep.includes('upload_ultrasound') || nextStep.includes('ultrasound')) {
      return { bg: 'bg-indigo-100/40 hover:bg-indigo-100/60', border: 'border-indigo-300', tag: 'Pending Scan', tagColor: 'bg-indigo-600', icon: <Clock className="text-indigo-600" size={18}/>, description: 'Awaiting Ultrasound', textColor: 'text-indigo-900', subText: 'text-indigo-700/60' };
    }

    // --- PRIORITY 4: HEALTHY (Normal) ---
    if (status.includes('normal')) {
      return { bg: 'bg-emerald-100/40 hover:bg-emerald-100/60', border: 'border-emerald-300', tag: 'Healthy', tagColor: 'bg-emerald-600', icon: <CheckCircle2 className="text-emerald-600" size={18}/>, description: 'Normal Status', textColor: 'text-emerald-900', subText: 'text-emerald-700/60' };
    }

    // --- DEFAULT: INITIAL ---
    return { bg: 'bg-white hover:bg-slate-50', border: 'border-gray-200', tag: 'Initial', tagColor: 'bg-slate-500', icon: <Stethoscope className="text-slate-400" size={18}/>, description: 'Pending Assessment', textColor: 'text-gray-900', subText: 'text-gray-400' };
  };

  const filtered = patients.filter(p => {
    const searchMatch = (p.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || String(p.phoneNumber || '').includes(searchTerm);
    if (filterStatus === 'All') return searchMatch;
    const config = getStatusConfig(p);
    return searchMatch && config.tag === filterStatus;
  });

  const initials = (name = '') => name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/40"><User size={28} /></div>
               <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Patient Registry</h1>
            </div>
            <p className="text-gray-400 font-bold ml-1 flex items-center gap-2"><ActivityIcon size={16} className="text-primary"/> Managing {patients.length} total medical profiles</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchPatients} className="p-4 bg-white border border-gray-100 text-gray-400 rounded-[24px] hover:text-primary transition-all"><RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>
            <button onClick={() => navigate('/add-patient')} className="flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-primary shadow-2xl shadow-gray-300 transition-all active:scale-95"><Plus size={20} /> New Patient</button>
          </div>
        </div>

        {/* Stats Section - TOP */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
             {[
               { label: 'Malignant', value: patients.filter(p => {
                 const config = getStatusConfig(p);
                 return config.tag === 'Malignant';
               }).length, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
               { label: 'Benign', value: patients.filter(p => {
                 const config = getStatusConfig(p);
                 return config.tag === 'Benign';
               }).length, icon: Heart, color: 'text-sky-500', bg: 'bg-sky-50' },
               { label: 'Awaiting Scan', value: patients.filter(p => {
                 const config = getStatusConfig(p);
                 return config.tag === 'Pending Scan';
               }).length, icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-50' },
               { label: 'Total Records', value: patients.length, icon: TrendingUp, color: 'text-gray-900', bg: 'bg-gray-50' }
             ].map((stat) => (
               <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
                  <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}><stat.icon size={24} /></div>
                  <div>
                     <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col xl:flex-row gap-6 mb-10">
           <div className="flex-1 bg-white rounded-[32px] p-2 shadow-sm border border-gray-100 flex items-center gap-4 px-8">
              <Search className="text-gray-200" size={24} />
              <input type="text" placeholder="Find patient profile..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none outline-none font-bold text-gray-700 py-4"/>
           </div>
           <div className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Malignant', 'Benign', 'Pending Scan', 'Healthy'].map((status) => (
                <button key={status} onClick={() => setFilterStatus(status)} className={`whitespace-nowrap px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-tighter transition-all ${filterStatus === status ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>{status}</button>
              ))}
           </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center bg-white rounded-[40px] border border-gray-100"><Loader2 className="w-12 h-12 text-primary animate-spin" /><p className="mt-6 text-gray-400 font-black uppercase text-[10px]">Neural Syncing...</p></div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
             {filtered.map(p => {
               const config = getStatusConfig(p);
               return (
                 <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={p.patientID} className={`${config.bg} rounded-[36px] p-8 border-2 ${config.border} transition-all duration-500 group relative overflow-hidden`}>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                       <div className="flex items-center gap-6 flex-1 w-full">
                          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-2xl font-black text-gray-900 shadow-sm flex-shrink-0">{initials(p.fullName)}</div>
                          <div>
                             <div className="flex items-center gap-4 flex-wrap">
                                <h3 className={`text-2xl font-black ${config.textColor} tracking-tight`}>{p.fullName}</h3>
                                <div className={`px-4 py-1.5 ${config.tagColor} text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg`}>{config.tag}</div>
                             </div>
                             <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-3 font-black text-[11px] uppercase tracking-wider">
                                <span className={`flex items-center gap-2 ${config.subText}`}><Phone size={14}/> {p.phoneNumber}</span>
                                <span className={`flex items-center gap-2 ${config.subText}`}><Calendar size={14}/> {p.age} YEARS</span>
                                <span className={`flex items-center gap-2 px-3 py-1 bg-white/50 rounded-lg ${config.textColor}`}><Brain size={14}/> {config.description}</span>
                              </div>
                              <PatientCodeBadge patientID={p.patientID} />
                           </div>
                        </div>
                       <div className="flex items-center gap-10 px-10 border-l border-white/40 hidden xl:flex">
                          <div className="text-center"><p className={`text-[10px] font-black uppercase mb-2 ${config.subText}`}>Function</p><p className={`text-lg font-black ${config.textColor} capitalize`}>{p.latestStatus || 'TBD'}</p></div>
                          <div className="text-center"><p className={`text-[10px] font-black uppercase mb-2 ${config.subText}`}>Confidence</p><p className={`text-xl font-black ${config.textColor}`}>{p.riskConfidence ? (p.riskConfidence <= 1 ? `${(p.riskConfidence * 100).toFixed(0)}%` : `${p.riskConfidence.toFixed(0)}%`) : 'â€”'}</p></div>
                       </div>
                       <div className="flex items-center gap-4 w-full lg:w-auto">
                          <Link to={`/patients/${p.patientID}/dashboard`} className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white border border-gray-100 rounded-[20px] text-gray-900 font-black uppercase tracking-widest text-[11px] hover:bg-gray-900 hover:text-white transition-all shadow-sm"><LayoutDashboard size={18} /> Dashboard</Link>
                          <button onClick={() => setDeleteModal({ isOpen: true, patient: p })} className="p-5 bg-white border border-gray-100 text-red-400 rounded-[20px] hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={20} /></button>
                       </div>
                    </div>
                 </motion.div>
               );
             })}
          </div>
        )}
      </div>
      <DeleteConfirmModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, patient: null })} onConfirm={handleDelete} patientName={deleteModal.patient?.fullName} isDeleting={isDeleting} />
    </div>
  );
};

export default PatientsList;


