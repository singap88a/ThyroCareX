import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Calendar,
  Activity,
  AlertCircle,
  CircleCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share2,
  Printer,
  Clock,
  Brain,
  ChevronRight,
  BarChart3,
  PieChart,
  FileText,
  Stethoscope,
  Heart,
  Thermometer,
  Target,
  RefreshCcw,
  ArrowRightLeft,
  History
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import ComparisonCard from '../../components/diagnosis/ComparisonCard';
import ProgressIndicator, { ProgressBar } from '../../components/diagnosis/ProgressIndicator';

const DiagnosisComparison = ({ dashboardMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Mock list of comparisons
  const pastComparisons = [
    { id: 'comp-1', date: '2024-09-20', title: 'Post-Treatment Progress', statusChange: 'MALIGNANT → BENIGN', improvement: '+75%' },
    { id: 'comp-2', date: '2024-06-15', title: 'Mid-Treatment Review', statusChange: 'MALIGNANT → SUSPICIOUS', improvement: '+40%' },
    { id: 'comp-3', date: '2024-03-10', title: 'Initial Baseline', statusChange: 'MALIGNANT → MALIGNANT', improvement: '0%' }
  ];

  // Mock comparison data
  const comparisonData = {
    patient: {
      name: "Sarah Johnson",
      age: 34,
      id: id || "THY-2024-001234",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    previous: {
      date: "2024-03-10",
      status: "MALIGNANT",
      condition: "Papillary Thyroid Carcinoma",
      confidence: 94.7,
      severity: "Moderate",
      riskLevel: "High",
      biomarkers: {
        tsh: { value: 0.15, normalRange: "0.4-4.0", unit: "mIU/L" },
        t4: { value: 18.9, normalRange: "4.5-12.0", unit: "μg/dL" },
        t3: { value: 325, normalRange: "80-200", unit: "ng/dL" },
        calcitonin: { value: 45, normalRange: "0-10", unit: "pg/mL" },
        thyroglobulin: { value: 380, normalRange: "0-40", unit: "ng/mL" }
      },
      nodules: {
        total: 3,
        suspicious: 2,
        largestSize: "2.8 cm"
      }
    },
    current: {
      date: "2024-09-20",
      status: "BENIGN",
      condition: "Post-Treatment Recovery",
      confidence: 91.2,
      severity: "Mild",
      riskLevel: "Low",
      biomarkers: {
        tsh: { value: 2.1, normalRange: "0.4-4.0", unit: "mIU/L" },
        t4: { value: 8.5, normalRange: "4.5-12.0", unit: "μg/dL" },
        t3: { value: 150, normalRange: "80-200", unit: "ng/dL" },
        calcitonin: { value: 8, normalRange: "0-10", unit: "pg/mL" },
        thyroglobulin: { value: 35, normalRange: "0-40", unit: "ng/mL" }
      },
      nodules: {
        total: 1,
        suspicious: 0,
        largestSize: "0.8 cm"
      }
    },
    overallProgress: 75 // -100 to 100
  };

  const getStatusConfig = (status) => {
    const configs = {
      MALIGNANT: {
        bg: 'bg-gradient-to-r from-red-500 to-red-600',
        text: 'text-red-600',
        lightBg: 'bg-red-100',
        icon: AlertCircle
      },
      BENIGN: {
        bg: 'bg-gradient-to-r from-green-500 to-green-600',
        text: 'text-green-600',
        lightBg: 'bg-green-100',
        icon: CircleCheck
      },
      SUSPICIOUS: {
        bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        text: 'text-yellow-600',
        lightBg: 'bg-yellow-100',
        icon: AlertCircle
      }
    };
    return configs[status] || configs.BENIGN;
  };

  const prevConfig = getStatusConfig(comparisonData.previous.status);
  const currConfig = getStatusConfig(comparisonData.current.status);
  const PrevIcon = prevConfig.icon;
  const CurrIcon = currConfig.icon;

  // Calculate days between diagnoses
  const daysBetween = Math.floor(
    (new Date(comparisonData.current.date) - new Date(comparisonData.previous.date)) / 
    (1000 * 60 * 60 * 24)
  );

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'biomarkers', label: 'Biomarkers', icon: Activity },
    { id: 'nodules', label: 'Nodules', icon: Target },
    { id: 'recommendations', label: 'Recommendations', icon: Stethoscope }
  ];
  
  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      // Replace oldest selection
      setSelectedItems([selectedItems[1], itemId]);
    }
  };

  const handleStartComparison = () => {
    if (selectedItems.length === 2) {
      setIsCompareMode(true);
      setViewMode('detail');
    }
  };

  return (
    <div className={`min-h-screen ${dashboardMode ? '' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      {!dashboardMode && (
        /* Decorative Background */
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className={`relative max-w-7xl mx-auto sm:px-6 lg:px-8 ${dashboardMode ? 'px-0 py-0' : 'px-4 py-8'}`}>
        {/* Header */}
        {!dashboardMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center mb-4 text-gray-600 transition-colors hover:text-gray-900 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                  <ArrowRightLeft className="w-8 h-8" />
                  Diagnosis Comparison
                </h1>
                {viewMode === 'detail' && (
                  <p className="mt-2 text-gray-600">
                    {isCompareMode && selectedItems.length === 2 ? (
                      <>
                        Comparing diagnoses from 
                        <span className="font-black mx-1 text-primary">{pastComparisons.find(p => p.id === selectedItems[0])?.date}</span>
                        and 
                        <span className="font-black mx-1 text-primary">{pastComparisons.find(p => p.id === selectedItems[1])?.date}</span>
                      </>
                    ) : (
                      `Comparing diagnoses from ${comparisonData.previous.date} to ${comparisonData.current.date}`
                    )}
                    <span className="ml-2 px-2 py-0.5 text-sm bg-primary/10 text-primary rounded-full">
                      {isCompareMode && selectedItems.length === 2 ? 
                        Math.abs(Math.floor((new Date(pastComparisons.find(p => p.id === selectedItems[1])?.date) - new Date(pastComparisons.find(p => p.id === selectedItems[0])?.date)) / (1000 * 60 * 60 * 24))) :
                        daysBetween
                      } days apart
                    </span>
                  </p>
                )}
                {viewMode === 'list' && (
                  <p className="mt-2 text-gray-600">
                    Select a previous comparison to view detailed analytical results
                  </p>
                )}
              </div>
              
              {viewMode === 'detail' && (
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {viewMode === 'list' ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Previous Diagnosis Points
              </h2>
              
              <AnimatePresence>
                {selectedItems.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-4 p-2 bg-primary/10 rounded-2xl border border-primary/20"
                  >
                    <span className="text-sm font-bold text-primary pl-2">
                      {selectedItems.length} selected
                    </span>
                    <button
                      onClick={handleStartComparison}
                      disabled={selectedItems.length !== 2}
                      className={`px-6 py-2 rounded-xl font-bold transition-all ${
                        selectedItems.length === 2 
                          ? 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-95' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Compare Selected
                    </button>
                    <button 
                      onClick={() => setSelectedItems([])}
                      className="text-xs font-bold text-gray-500 hover:text-red-500 pr-2"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastComparisons.map((comp, i) => {
                const isSelected = selectedItems.includes(comp.id);
                return (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleItemSelect(comp.id)}
                    className={`bg-white p-6 rounded-3xl border-2 transition-all group relative cursor-pointer ${
                      isSelected 
                        ? 'border-primary shadow-xl shadow-primary/10 bg-primary/5' 
                        : 'border-transparent shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Selection Indicator */}
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary border-primary' : 'border-gray-200 bg-white group-hover:border-primary/50'
                    }`}>
                      {isSelected && <CircleCheck size={14} className="text-white" />}
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl transition-colors ${
                        isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                      }`}>
                        <ArrowRightLeft size={24} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{comp.improvement} improvement</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-1">{comp.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{comp.date}</p>
                    
                    <div className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${
                      isSelected ? 'bg-white' : 'bg-gray-50'
                    }`}>
                      <span className="text-xs text-gray-400">Status Change</span>
                      <span className="text-xs font-bold text-gray-700">{comp.statusChange}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail View */
          <>
            {dashboardMode && (
              <button 
                onClick={() => setViewMode('list')}
                className="mb-6 flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <ArrowLeft size={16} />
                Back to Comparison List
              </button>
            )}

        {/* Patient Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between p-4 mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <img
              src={comparisonData.patient.img}
              alt={comparisonData.patient.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary/20"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{comparisonData.patient.name}</h2>
              <p className="text-gray-500">{comparisonData.patient.age} years • ID: {comparisonData.patient.id}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link
              to={`/patients/${id}/history`}
              className="flex items-center gap-2 text-primary hover:underline"
            >
              View All History
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to={`/patients/${id}/rediagnose`}
              className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              New Re-Diagnosis
            </Link>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Progress Indicator */}
            <div className="flex justify-center">
              <ProgressIndicator progress={comparisonData.overallProgress} size="xl" />
            </div>

            {/* Status Transition */}
            <div className="flex items-center justify-center gap-4">
              {/* Previous Status */}
              <div className={`p-4 rounded-2xl ${prevConfig.lightBg} text-center`}>
                <PrevIcon className={`w-8 h-8 ${prevConfig.text} mx-auto mb-2`} />
                <p className="text-sm text-gray-500">Previous</p>
                <p className={`text-xl font-bold ${prevConfig.text}`}>
                  {comparisonData.previous.status}
                </p>
                <p className="text-sm text-gray-600 mt-1">{comparisonData.previous.date}</p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="p-3 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>

              {/* Current Status */}
              <div className={`p-4 rounded-2xl ${currConfig.lightBg} text-center`}>
                <CurrIcon className={`w-8 h-8 ${currConfig.text} mx-auto mb-2`} />
                <p className="text-sm text-gray-500">Current</p>
                <p className={`text-xl font-bold ${currConfig.text}`}>
                  {comparisonData.current.status}
                </p>
                <p className="text-sm text-gray-600 mt-1">{comparisonData.current.date}</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Condition</span>
                <span className="font-semibold text-gray-800 text-right text-sm">
                  {comparisonData.current.condition}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Risk Level</span>
                <span className={`font-semibold ${
                  comparisonData.current.riskLevel === 'Low' ? 'text-green-600' :
                  comparisonData.current.riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {comparisonData.previous.riskLevel} → {comparisonData.current.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Severity</span>
                <span className={`font-semibold ${
                  comparisonData.current.severity === 'Mild' ? 'text-green-600' :
                  comparisonData.current.severity === 'Moderate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {comparisonData.previous.severity} → {comparisonData.current.severity}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-8 p-2 bg-white border border-gray-200 rounded-2xl shadow-sm"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all flex-1 justify-center ${
                  activeSection === section.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {section.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Side by Side Summary Cards */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-800">Previous Diagnosis</h3>
                <span className="text-sm text-gray-500">{comparisonData.previous.date}</span>
              </div>
              
              <div className={`p-4 rounded-xl ${prevConfig.bg} text-white mb-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Status</p>
                    <p className="text-2xl font-bold">{comparisonData.previous.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">Confidence</p>
                    <p className="text-2xl font-bold">{comparisonData.previous.confidence}%</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition</span>
                  <span className="font-medium text-gray-800">{comparisonData.previous.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Severity</span>
                  <span className="font-medium text-gray-800">{comparisonData.previous.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level</span>
                  <span className="font-medium text-red-600">{comparisonData.previous.riskLevel}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-800">Current Diagnosis</h3>
                <span className="text-sm text-gray-500">{comparisonData.current.date}</span>
                <span className="ml-auto text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Latest</span>
              </div>
              
              <div className={`p-4 rounded-xl ${currConfig.bg} text-white mb-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Status</p>
                    <p className="text-2xl font-bold">{comparisonData.current.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">Confidence</p>
                    <p className="text-2xl font-bold">{comparisonData.current.confidence}%</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition</span>
                  <span className="font-medium text-gray-800">{comparisonData.current.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Severity</span>
                  <span className="font-medium text-gray-800">{comparisonData.current.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level</span>
                  <span className="font-medium text-green-600">{comparisonData.current.riskLevel}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Days Since Last', value: daysBetween, suffix: '', icon: Calendar, color: 'text-primary' },
                { label: 'Confidence Change', value: (comparisonData.current.confidence - comparisonData.previous.confidence).toFixed(1), suffix: '%', icon: Brain, color: 'text-purple-600' },
                { label: 'Nodules Reduced', value: comparisonData.previous.nodules.total - comparisonData.current.nodules.total, suffix: '', icon: Target, color: 'text-green-600' },
                { label: 'Overall Progress', value: comparisonData.overallProgress, suffix: '%', icon: TrendingUp, color: 'text-primary' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-4 bg-white border border-gray-200 rounded-2xl"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value > 0 && stat.label !== 'Days Since Last' ? '+' : ''}{stat.value}{stat.suffix}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'biomarkers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                Thyroid Function Tests Comparison
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(comparisonData.previous.biomarkers).map(([key, prevData]) => {
                  const currData = comparisonData.current.biomarkers[key];
                  return (
                    <ComparisonCard
                      key={key}
                      title={key.toUpperCase()}
                      oldValue={prevData.value}
                      newValue={currData.value}
                      unit={prevData.unit}
                      normalRange={prevData.normalRange}
                      icon={Activity}
                    />
                  );
                })}
              </div>
            </div>

            {/* Progress Bars Summary */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Biomarker Progress Summary</h3>
              <div className="space-y-4">
                {Object.entries(comparisonData.previous.biomarkers).map(([key, prevData]) => {
                  const currData = comparisonData.current.biomarkers[key];
                  const [min, max] = prevData.normalRange.split('-').map(Number);
                  const midpoint = (min + max) / 2;
                  
                  const prevDist = Math.abs(prevData.value - midpoint);
                  const currDist = Math.abs(currData.value - midpoint);
                  const improvement = ((prevDist - currDist) / prevDist * 100).toFixed(0);
                  
                  return (
                    <ProgressBar
                      key={key}
                      label={key.toUpperCase()}
                      progress={parseInt(improvement)}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'nodules' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Nodule Counts */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Nodule Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total Nodules</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-400">
                        {comparisonData.previous.nodules.total}
                      </span>
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      <span className="text-xl font-bold text-green-600">
                        {comparisonData.current.nodules.total}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {comparisonData.previous.nodules.total - comparisonData.current.nodules.total} nodule(s) resolved
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Suspicious Nodules</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-red-400">
                        {comparisonData.previous.nodules.suspicious}
                      </span>
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      <span className="text-xl font-bold text-green-600">
                        {comparisonData.current.nodules.suspicious}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {comparisonData.current.nodules.suspicious === 0 ? 'No suspicious nodules detected!' : `${comparisonData.previous.nodules.suspicious - comparisonData.current.nodules.suspicious} cleared`}
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Largest Nodule Size</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-400">
                        {comparisonData.previous.nodules.largestSize}
                      </span>
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      <span className="text-xl font-bold text-green-600">
                        {comparisonData.current.nodules.largestSize}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      Size reduced by {(parseFloat(comparisonData.previous.nodules.largestSize) - parseFloat(comparisonData.current.nodules.largestSize)).toFixed(1)} cm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Comparison */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Visual Comparison</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <p className="text-sm text-gray-500 mb-2">Previous ({comparisonData.previous.date})</p>
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-red-700">
                        {comparisonData.previous.nodules.total}
                      </span>
                    </div>
                    {comparisonData.previous.nodules.suspicious > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-red-600 mt-2">
                    {comparisonData.previous.nodules.suspicious} suspicious
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <p className="text-sm text-gray-500 mb-2">Current ({comparisonData.current.date})</p>
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-green-700">
                        {comparisonData.current.nodules.total}
                      </span>
                    </div>
                    {comparisonData.current.nodules.suspicious === 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CircleCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    {comparisonData.current.nodules.suspicious} suspicious
                  </p>
                </div>
              </div>

              <div className="p-4 bg-green-100 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <CircleCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Excellent Progress!</p>
                    <p className="text-sm text-green-700">
                      The nodule count has decreased significantly, indicating positive response to treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-primary" />
                Updated Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    type: 'Continue Treatment',
                    title: 'Maintain Current Medication',
                    description: 'Continue with levothyroxine as prescribed',
                    urgency: 'Routine',
                    icon: '💊',
                    color: 'blue'
                  },
                  {
                    type: 'Follow-up',
                    title: 'Schedule Next Scan',
                    description: 'Ultrasound follow-up in 6 months',
                    urgency: 'Scheduled',
                    icon: '📅',
                    color: 'green'
                  },
                  {
                    type: 'Lifestyle',
                    title: 'Diet & Exercise',
                    description: 'Maintain iodine-balanced diet and regular exercise',
                    urgency: 'Ongoing',
                    icon: '🥗',
                    color: 'purple'
                  },
                  {
                    type: 'Monitoring',
                    title: 'Blood Tests',
                    description: 'Regular TSH monitoring every 3 months',
                    urgency: 'Quarterly',
                    icon: '🩸',
                    color: 'red'
                  }
                ].map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{rec.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 uppercase">{rec.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full bg-${rec.color}-100 text-${rec.color}-600`}>
                            {rec.urgency}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mt-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Doctor's Notes */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Add Clinical Notes
              </h3>
              <textarea
                placeholder="Add your observations about the patient's progress..."
                className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex justify-end mt-4">
                <button className="px-6 py-2 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors">
                  Save Notes
                </button>
              </div>
            </div>
          </motion.div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default DiagnosisComparison;
