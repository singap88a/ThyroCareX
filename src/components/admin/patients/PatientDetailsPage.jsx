import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Mail, MapPin, Calendar, Phone, 
  Activity, FileText, Weight, Ruler, AlertCircle, 
  Clipboard, Trash2, CalendarDays, ExternalLink,
  ChevronRight, Brain, Shield, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';
import ThyroidDiagnosisView from '../../diagnosis/ThyroidDiagnosisView';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useAdminTheme();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const response = await adminService.getPatientById(id);
        if (response && response.succeeded && response.data) {
          setPatient(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch patient details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      try {
        const response = await adminService.deletePatient(id);
        if (response && response.succeeded) {
          navigate('/admin/patients');
        }
      } catch (error) {
        console.error("Failed to delete patient", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading patient profile...
          </p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-20">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Patient not found</h2>
        <button 
          onClick={() => navigate('/admin/patients')}
          className="mt-4 text-blue-500 hover:underline flex items-center justify-center mx-auto"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className={`p-2 rounded-xl transition-all ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600 shadow-sm'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Patient Profile
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ID: {patient.patientID} • Registered on {new Date(patient.registrationAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all font-medium"
        >
          <Trash2 size={18} />
          <span>Delete Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className={`p-8 rounded-3xl overflow-hidden relative ${
            isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100 shadow-xl shadow-blue-500/5'
          } border`}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-blue-500/20">
                {patient.fullName.charAt(0)}
              </div>
              <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {patient.fullName}
              </h2>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {patient.gender === 0 ? 'Male' : 'Female'} • {patient.age} years old
              </p>

              <div className="w-full space-y-4 text-left">
                <InfoItem icon={<Mail size={18}/>} label="Email" value={patient.email} isDarkMode={isDarkMode} />
                <InfoItem icon={<Phone size={18}/>} label="Phone" value={patient.phoneNumber} isDarkMode={isDarkMode} />
                <InfoItem icon={<MapPin size={18}/>} label="Address" value={patient.address || 'N/A'} isDarkMode={isDarkMode} />
                <InfoItem icon={<CalendarDays size={18}/>} label="Date of Birth" value={new Date(patient.dateOfBirth).toLocaleDateString()} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>

          {/* Vitals Card */}
          <div className={`p-8 rounded-3xl ${
            isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100 shadow-xl shadow-blue-500/5'
          } border`}>
            <h3 className={`text-lg font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <Activity size={20} className="mr-2 text-blue-500" />
              Patient Vitals
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                <div className="flex items-center space-x-2 text-blue-500 mb-1">
                  <Ruler size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Height</span>
                </div>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{patient.height} cm</p>
              </div>
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
                <div className="flex items-center space-x-2 text-indigo-500 mb-1">
                  <Weight size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Weight</span>
                </div>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{patient.weight} kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info & Tests */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs */}
          <div className={`flex p-1.5 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {['overview', 'history', 'tests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? (isDarkMode ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-blue-600 shadow-sm')
                    : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedTestId ? (
              <motion.div
                key="detailed-result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setSelectedTestId(null)}
                    className={`flex items-center gap-2 text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    <ArrowLeft size={16} /> Back to Test List
                  </button>
                </div>
                <ThyroidDiagnosisView patientId={id} testId={selectedTestId} dashboardMode={true} />
              </motion.div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className={`p-8 rounded-3xl ${
                      isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100 shadow-xl shadow-blue-500/5'
                    } border`}>
                      <h3 className={`text-lg font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <Clipboard size={20} className="mr-2 text-blue-500" />
                        Medical Summary
                      </h3>
                      <div className="space-y-6">
                        <SummaryItem 
                          title="Medical History" 
                          content={patient.medicalHistory || 'No prior medical history recorded.'} 
                          icon={<FileText className="text-blue-500" size={18} />}
                          isDarkMode={isDarkMode}
                        />
                        <SummaryItem 
                          title="Current Medications" 
                          content={patient.currentMedications || 'None'} 
                          icon={<Activity className="text-green-500" size={18} />}
                          isDarkMode={isDarkMode}
                        />
                        <SummaryItem 
                          title="Known Allergies" 
                          content={patient.knownAllergies || 'None'} 
                          icon={<AlertCircle className="text-red-500" size={18} />}
                          isDarkMode={isDarkMode}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-8 rounded-3xl ${
                      isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100 shadow-xl shadow-blue-500/5'
                    } border`}
                  >
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      Full chronological medical history of visits and consultations will appear here.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'tests' && (
                  <motion.div
                    key="tests"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {patient.tests && patient.tests.length > 0 ? (
                      patient.tests.map((test, index) => (
                        <TestCard 
                          key={test.testId} 
                          test={test} 
                          isDarkMode={isDarkMode} 
                          index={index} 
                          onClick={() => setSelectedTestId(test.testId)}
                        />
                      ))
                    ) : (
                      <div className={`p-12 text-center rounded-3xl border-2 border-dashed ${
                        isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'
                      }`}>
                        No tests or scans found for this patient.
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, isDarkMode }) => (
  <div className="flex items-start space-x-3">
    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {label}
      </p>
      <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        {value || 'N/A'}
      </p>
    </div>
  </div>
);

const SummaryItem = ({ title, content, icon, isDarkMode }) => (
  <div className={`p-5 rounded-2xl border ${
    isDarkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'
  }`}>
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <h4 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{title}</h4>
    </div>
    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      {content}
    </p>
  </div>
);

const TestCard = ({ test, isDarkMode, index, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className={`p-6 rounded-3xl border transition-all hover:scale-[1.01] cursor-pointer ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:bg-gray-800' 
        : 'bg-white border-gray-100 shadow-lg shadow-blue-500/5 hover:border-blue-200'
    }`}
  >
    <div className="flex flex-col md:flex-row gap-6">
      {/* Test Image */}
      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-200 relative group">
        {test.imagePath ? (
          <img 
            src={test.imagePath.startsWith('http') ? test.imagePath : `https://thyrocarex.runasp.net/${test.imagePath}`} 
            alt="Scan" 
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Activity size={32} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ExternalLink size={20} className="text-white" />
        </div>
      </div>

      {/* Test Details */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Thyroid Ultrasound Analysis
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Performed on {new Date(test.createdAt).toLocaleString()}
            </p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            test.classification === 'Malignant' 
              ? 'bg-red-500/10 text-red-500' 
              : test.classification === 'Benign'
              ? 'bg-green-500/10 text-green-500'
              : 'bg-blue-500/10 text-blue-500'
          }`}>
            {test.classification || 'Uncertain'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TestBadge icon={<Shield size={14}/>} label="Bethesda" value={test.bethesdaLabel || 'N/A'} color="purple" isDarkMode={isDarkMode} />
          <TestBadge icon={<Brain size={14}/>} label="Confidence" value={test.confidence ? `${(test.confidence * 100).toFixed(1)}%` : 'N/A'} color="blue" isDarkMode={isDarkMode} />
          <TestBadge icon={<Activity size={14}/>} label="Result" value={test.diagnosisResult || 'N/A'} color="indigo" isDarkMode={isDarkMode} />
          <TestBadge icon={<ChevronRight size={14}/>} label="Next Step" value={test.nextStep || 'N/A'} color="orange" isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  </motion.div>
);

const TestBadge = ({ icon, label, value, color, isDarkMode }) => {
  const colors = {
    blue: isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
    purple: isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600',
    indigo: isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600',
    orange: isDarkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600',
  };

  return (
    <div className={`p-3 rounded-2xl ${colors[color]}`}>
      <div className="flex items-center space-x-1.5 mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">{label}</span>
      </div>
      <p className="text-sm font-bold truncate">{value}</p>
    </div>
  );
};

export default PatientDetailsPage;
