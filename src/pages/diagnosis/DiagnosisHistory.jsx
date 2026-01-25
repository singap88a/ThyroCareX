import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Calendar,
  Activity,
  AlertCircle,
  CircleCheck,
  Download,
  Filter,
  Search,
  RefreshCcw,
  Clock,
  ChevronRight,
  GitCompare,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DiagnosisTimeline from '../../components/diagnosis/DiagnosisTimeline';
import ProgressIndicator from '../../components/diagnosis/ProgressIndicator';

const DiagnosisHistory = ({ dashboardMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({ from: '', to: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Mock patient and diagnosis history data
  const patientData = {
    id: id || "THY-2024-001234",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    totalDiagnoses: 5,
    firstDiagnosis: "2023-06-15",
    lastDiagnosis: "2024-09-20"
  };

  const diagnosisHistory = [
    {
      id: "diag-005",
      date: "2024-09-20",
      status: "BENIGN",
      condition: "Post-Treatment Recovery",
      confidence: 91.2,
      severity: "Mild",
      riskLevel: "Low",
      biomarkers: {
        tsh: { value: 2.1 },
        t4: { value: 8.5 },
        t3: { value: 150 },
        calcitonin: { value: 8 }
      },
      nodules: { total: 1, suspicious: 0 }
    },
    {
      id: "diag-004",
      date: "2024-06-15",
      status: "SUSPICIOUS",
      condition: "Monitoring Phase",
      confidence: 87.5,
      severity: "Mild",
      riskLevel: "Medium",
      biomarkers: {
        tsh: { value: 1.8 },
        t4: { value: 10.2 },
        t3: { value: 180 },
        calcitonin: { value: 12 }
      },
      nodules: { total: 2, suspicious: 1 }
    },
    {
      id: "diag-003",
      date: "2024-03-10",
      status: "MALIGNANT",
      condition: "Papillary Thyroid Carcinoma",
      confidence: 94.7,
      severity: "Moderate",
      riskLevel: "High",
      biomarkers: {
        tsh: { value: 0.15 },
        t4: { value: 18.9 },
        t3: { value: 325 },
        calcitonin: { value: 45 }
      },
      nodules: { total: 3, suspicious: 2 }
    },
    {
      id: "diag-002",
      date: "2023-12-05",
      status: "SUSPICIOUS",
      condition: "Nodule Detected - Further Testing Required",
      confidence: 78.3,
      severity: "Mild",
      riskLevel: "Medium",
      biomarkers: {
        tsh: { value: 0.35 },
        t4: { value: 14.2 },
        t3: { value: 245 },
        calcitonin: { value: 28 }
      },
      nodules: { total: 2, suspicious: 1 }
    },
    {
      id: "diag-001",
      date: "2023-06-15",
      status: "NORMAL",
      condition: "Initial Screening - Routine",
      confidence: 95.8,
      severity: "None",
      riskLevel: "Low",
      biomarkers: {
        tsh: { value: 2.5 },
        t4: { value: 7.8 },
        t3: { value: 120 },
        calcitonin: { value: 5 }
      },
      nodules: { total: 0, suspicious: 0 }
    }
  ];

  // Filter diagnoses
  const filteredHistory = diagnosisHistory.filter(diag => {
    const matchesSearch = diag.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diag.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || diag.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate overall progress
  const calculateProgress = () => {
    const latest = diagnosisHistory[0];
    const earliest = diagnosisHistory[diagnosisHistory.length - 1];
    
    if (latest.status === 'BENIGN' || latest.status === 'NORMAL') return 75;
    if (latest.status === 'SUSPICIOUS') return 25;
    if (latest.status === 'MALIGNANT') return -25;
    return 0;
  };

  const handleViewDiagnosis = (diagId) => {
    navigate(`/patients/${id}`);
  };

  const handleCompare = (selectedIds) => {
    navigate(`/patients/${id}/compare?dates=${selectedIds.join(',')}`);
  };

  const getStatusStats = () => {
    const stats = {
      total: diagnosisHistory.length,
      benign: diagnosisHistory.filter(d => d.status === 'BENIGN').length,
      malignant: diagnosisHistory.filter(d => d.status === 'MALIGNANT').length,
      suspicious: diagnosisHistory.filter(d => d.status === 'SUSPICIOUS').length,
      normal: diagnosisHistory.filter(d => d.status === 'NORMAL').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className={`min-h-screen ${dashboardMode ? '' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      {!dashboardMode && (
        /* Decorative Background */
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
                  <Clock className="w-8 h-8" />
                  Diagnosis History
                </h1>
                <p className="mt-2 text-gray-600">
                  Complete diagnosis timeline for patient records
                </p>
              </div>
              
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export All
                </button>
                <Link
                  to={`/patients/${id}/rediagnose`}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  New Diagnosis
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Patient Card */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={patientData.img}
                  alt={patientData.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-primary/20"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{patientData.name}</h2>
                  <p className="text-gray-500">{patientData.age} years • {patientData.gender}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Patient ID</span>
                  <span className="font-medium text-gray-800">{patientData.id}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">First Diagnosis</span>
                  <span className="font-medium text-gray-800">{patientData.firstDiagnosis}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Last Diagnosis</span>
                  <span className="font-medium text-gray-800">{patientData.lastDiagnosis}</span>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Overall Progress
              </h3>
              <ProgressIndicator progress={calculateProgress()} size="md" />
            </div>

            {/* Status Distribution */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Diagnosis Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Benign/Normal</span>
                  </div>
                  <span className="font-semibold text-gray-800">{stats.benign + stats.normal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Suspicious</span>
                  </div>
                  <span className="font-semibold text-gray-800">{stats.suspicious}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Malignant</span>
                  </div>
                  <span className="font-semibold text-gray-800">{stats.malignant}</span>
                </div>
              </div>
              
              {/* Visual Bar */}
              <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden flex">
                <div 
                  className="bg-green-500 transition-all"
                  style={{ width: `${((stats.benign + stats.normal) / stats.total) * 100}%` }}
                />
                <div 
                  className="bg-yellow-500 transition-all"
                  style={{ width: `${(stats.suspicious / stats.total) * 100}%` }}
                />
                <div 
                  className="bg-red-500 transition-all"
                  style={{ width: `${(stats.malignant / stats.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to={`/patients/${id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <span>View Patient Details</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
                <Link
                  to={`/patients/${id}/compare`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <GitCompare className="w-5 h-5 text-primary" />
                  <span>Compare Diagnoses</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Filters */}
            <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by condition or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="BENIGN">Benign</option>
                  <option value="MALIGNANT">Malignant</option>
                  <option value="SUSPICIOUS">Suspicious</option>
                  <option value="NORMAL">Normal</option>
                </select>

                {/* Date Filter */}
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedDates.from}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, from: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="date"
                    value={selectedDates.to}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, to: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredHistory.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{diagnosisHistory.length}</span> diagnoses
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <GitCompare className="w-4 h-4" />
                <span>Select 2 diagnoses to compare</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <DiagnosisTimeline
                diagnoses={filteredHistory}
                onViewDiagnosis={handleViewDiagnosis}
                onCompare={handleCompare}
                selectable={true}
              />
              
              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No diagnoses found matching your criteria</p>
                  <button
                    onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-xl">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Patient Progress Summary</h3>
                  <p className="text-white/80 mt-1">
                    Patient has shown significant improvement from initial MALIGNANT diagnosis in March 2024 
                    to current BENIGN status. Treatment appears to be effective with nodules reducing from 3 to 1.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
