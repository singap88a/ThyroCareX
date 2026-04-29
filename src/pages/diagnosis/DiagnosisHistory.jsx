import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { 
  History, 
  Calendar, 
  Activity, 
  ChevronRight, 
  FileText, 
  Search,
  Loader2,
  AlertCircle,
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Scan,
  FlaskConical,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import testService from '../../services/testService';

const DiagnosisHistory = ({ dashboardMode = false, onSelectTest = null }) => {
  const { id } = useParams(); // patientId
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await testService.getPatientTestHistory(id);
        if (res.succeeded) {
          setHistory(res.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch diagnosis history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  const filteredHistory = useMemo(() => {
    if (!searchTerm) return history;
    const lowerSearch = searchTerm.toLowerCase();
    return history.filter(item => {
      const dateStr = new Date(item.createdAt).toLocaleDateString();
      const riskLevel = (item.diagnosisResult?.riskLevel || '').toLowerCase();
      return dateStr.includes(lowerSearch) || riskLevel.includes(lowerSearch);
    });
  }, [history, searchTerm]);

  const riskBadge = (level = '') => {
    const l = level.toLowerCase();
    if (l.includes('high') || l.includes('malignant')) return 'bg-red-100 text-red-700 border-red-200';
    if (l.includes('low') || l.includes('benign')) return 'bg-green-100 text-green-700 border-green-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Fetching medical history...</p>
      </div>
    );
  }

  const handleTestClick = (item) => {
    setSelectedTest(item);
    if (onSelectTest) {
      // Small delay to let the selection state update or just call it immediately
      // If we are in dashboard mode, we want to SWITCH to the results view
      onSelectTest(item.id);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <History className="text-primary" /> Diagnosis History
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sytematic record of all AI-driven assessments</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Filter by date or result..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64"
          />
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-admin-dark-card border border-dashed border-gray-200 dark:border-admin-dark-border rounded-3xl p-16 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-admin-dark-hover rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="text-gray-300 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No history found</h3>
          <p className="text-gray-500 dark:text-gray-400">This patient hasn't had any AI diagnoses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* History List */}
          <div className="lg:col-span-5 space-y-4 max-h-[800px] overflow-y-auto pr-2">
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(idx, 10) * 0.05 }}
                onClick={() => handleTestClick(item)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  selectedTest?.id === item.id 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                    : 'bg-white dark:bg-admin-dark-card border-gray-100 dark:border-admin-dark-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${selectedTest?.id === item.id ? 'bg-white/20' : 'bg-primary/10'}`}>
                      <Calendar size={16} className={selectedTest?.id === item.id ? 'text-white' : 'text-primary'} />
                    </div>
                    <span className={`text-sm font-bold ${selectedTest?.id === item.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    selectedTest?.id === item.id 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : riskBadge(item.diagnosisResult?.riskLevel)
                  }`}>
                    {item.diagnosisResult?.riskLevel || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className={selectedTest?.id === item.id ? 'text-white/80' : 'text-gray-500'}>
                    Test ID: #{item.id}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.imagePath && <Scan size={14} className={selectedTest?.id === item.id ? 'text-white/80' : 'text-gray-400'} />}
                    {item.tsh && <FlaskConical size={14} className={selectedTest?.id === item.id ? 'text-white/80' : 'text-gray-400'} />}
                    <ChevronRight size={14} className={selectedTest?.id === item.id ? 'text-white' : 'text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all'} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Details View */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {selectedTest ? (
                <motion.div
                  key={selectedTest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-admin-dark-card border border-gray-100 dark:border-admin-dark-border rounded-3xl overflow-hidden shadow-sm sticky top-8"
                >
                  <div className="p-6 border-b border-gray-50 dark:border-admin-dark-border bg-gray-50/50 dark:bg-admin-dark-hover/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                        <Activity size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-wider">Detailed Assessment</h4>
                        <p className="text-xs text-gray-500">Ref ID: {selectedTest.id} • {new Date(selectedTest.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Clinical Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Brain size={12} /> Functional Status
                        </p>
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-200 capitalize">
                          {selectedTest.diagnosisResult?.functionalStatus || 'Not assessed'}
                        </p>
                      </div>
                      <div className="p-5 bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl border border-purple-100/50 dark:border-purple-900/20">
                        <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Target size={12} /> Risk Level
                        </p>
                        <p className="text-lg font-bold text-purple-900 dark:text-purple-200">
                          {selectedTest.diagnosisResult?.riskLevel || 'Unknown'}
                        </p>
                      </div>
                    </div>

                    {/* Labs Data */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                        <FlaskConical size={16} className="text-primary" /> Laboratory Metrics
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'TSH', value: selectedTest.tsh, unit: 'mIU/L' },
                          { label: 'T3', value: selectedTest.t3, unit: 'ng/dL' },
                          { label: 'TT4', value: selectedTest.tt4, unit: 'μg/dL' },
                          { label: 'FTI', value: selectedTest.fti, unit: '' },
                        ].map((lab, i) => (
                          <div key={i} className="p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl border border-gray-100 dark:border-admin-dark-border">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">{lab.label}</p>
                            <p className="text-sm font-black text-gray-900 dark:text-white">{lab.value || 'N/A'}</p>
                            {lab.value && <p className="text-[10px] text-gray-400">{lab.unit}</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-6 bg-gray-900 rounded-3xl text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Shield size={80} />
                      </div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">AI Recommendation</p>
                      <p className="text-sm leading-relaxed text-gray-300 italic mb-4">
                        "{selectedTest.diagnosisResult?.clinicalRecommendation || 'No recommendation available for this assessment.'}"
                      </p>
                      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                        <Clock size={12} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Next Step: {selectedTest.diagnosisResult?.nextStep || 'Follow-up as scheduled'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-admin-dark-card border-2 border-dashed border-gray-200 dark:border-admin-dark-border rounded-3xl p-12 text-center">
                  <Activity className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-400 font-medium">Select a diagnosis from the list to view full details</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;
