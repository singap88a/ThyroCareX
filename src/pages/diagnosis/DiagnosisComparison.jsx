import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Calendar, Activity, AlertCircle, CircleCheck,
  TrendingUp, TrendingDown, Download, Share2, Printer, Clock,
  Brain, ChevronRight, BarChart3, FileText, Stethoscope,
  RefreshCcw, ArrowRightLeft, History, Loader2, Target,
  Zap, FlaskConical, MoveRight, Shield
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import testService from '../../services/testService';
import patientService from '../../services/patientService';

const DiagnosisComparison = ({ dashboardMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [historyRes, patientRes] = await Promise.all([
        testService.getPatientTestHistory(id),
        patientService.getPatientById(id)
      ]);
      if (historyRes.succeeded) setHistory(historyRes.data || []);
      if (patientRes.succeeded) setPatient(patientRes.data);
    } catch (err) {
      console.error('Failed to fetch comparison data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(i => i !== itemId));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems([selectedItems[1], itemId]);
    }
  };

  const handleStartComparison = async () => {
    if (selectedItems.length === 2) {
      setComparing(true);
      try {
        const res = await testService.compareTests(selectedItems[0], selectedItems[1]);
        if (res.succeeded) {
          setComparisonResult(res.data);
          setViewMode('detail');
        }
      } catch (err) {
        console.error('Comparison failed', err);
      } finally {
        setComparing(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Preparing analytical comparison...</p>
      </div>
    );
  }

  // Sort history by date to ensure proper "earlier" vs "later"
  const sortedHistory = [...history].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const test1 = history.find(t => t.id === selectedItems[0]);
  const test2 = history.find(t => t.id === selectedItems[1]);

  // Determine chronological order
  const earlierTest = (test1 && test2) ? (new Date(test1.createdAt) < new Date(test2.createdAt) ? test1 : test2) : test1;
  const laterTest = (test1 && test2) ? (new Date(test1.createdAt) < new Date(test2.createdAt) ? test2 : test1) : test2;

  const d1 = comparisonResult?.before;
  const d2 = comparisonResult?.after;
  const summary = comparisonResult?.summary;

  const getStatusColor = (status = '') => {
    const s = (status || '').toUpperCase();
    if (s.includes('MALIGNANT') || s.includes('HIGH') || s.includes('WORSENING')) return 'bg-red-500';
    if (s.includes('BENIGN') || s.includes('LOW') || s.includes('IMPROVING')) return 'bg-green-500';
    if (s.includes('STABLE')) return 'bg-blue-500';
    return 'bg-blue-500';
  };

  const getTrendCardStyles = (trend) => {
    if (trend === 'Improving') return 'bg-green-500/10 border-green-500/30 text-green-900 dark:text-green-100';
    if (trend === 'Worsening') return 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-100';
    return 'bg-white/5 border-white/10 text-white';
  };

  // Removed local calculateTrend in favor of backend summary

  return (
    <div className={`min-h-screen ${dashboardMode ? '' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-admin-dark-bg dark:to-admin-dark-bg'}`}>
      <div className={`relative max-w-7xl mx-auto sm:px-6 lg:px-8 ${dashboardMode ? 'px-0 py-0' : 'px-4 py-8'}`}>
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-4">
                <div className="p-3 bg-primary rounded-2xl text-white">
                  <ArrowRightLeft size={32} />
                </div>
                Deep Analytics Comparison
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">Compare multi-session AI diagnostic data and biomarker trends</p>
            </div>
            {viewMode === 'detail' ? (
              <button onClick={() => setViewMode('list')} className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all">
                <ArrowLeft size={18} /> BACK TO TIMELINE
              </button>
            ) : (
              <Link to={`/patients/${id}/dashboard`} className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all">
                <ArrowLeft size={18} /> PATIENT DASHBOARD
              </Link>
            )}
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-admin-dark-card p-8 rounded-[32px] border border-gray-100 dark:border-admin-dark-border shadow-xl shadow-gray-200/50 dark:shadow-none gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary text-3xl font-black">
                  {patient?.fullName?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black dark:text-white">{patient?.fullName}</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                    {history.length} DIAGNOSTIC SESSIONS AVAILABLE
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={handleStartComparison} 
                  disabled={selectedItems.length < 2 || comparing} 
                  className={`px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
                    selectedItems.length === 2 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {comparing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap size={20} />}
                  {comparing ? 'ANALYZING...' : `ANALYZE COMPARISON (${selectedItems.length}/2)`}
                </button>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Select exactly two records to compare</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {history.map((test, idx) => {
                const isSelected = selectedItems.includes(test.id);
                return (
                  <motion.div 
                    key={test.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleItemSelect(test.id)}
                    className={`p-8 bg-white dark:bg-admin-dark-card border-4 rounded-[40px] cursor-pointer transition-all relative overflow-hidden group ${
                      isSelected 
                      ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/20' 
                      : 'border-transparent hover:border-primary/30 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full">
                        <CircleCheck size={20} />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-admin-dark-hover text-primary group-hover:bg-primary group-hover:text-white'}`}>
                        <FileText size={24} />
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest ${getStatusColor(test.diagnosisResult?.riskLevel || test.diagnosisResult?.classificationLabel)}`}>
                        {test.diagnosisResult?.riskLevel || test.diagnosisResult?.classificationLabel || 'ASSESSED'}
                      </div>
                    </div>
                    <h3 className="text-xl font-black dark:text-white mb-1">Session #{test.id}</h3>
                    <p className="text-sm font-bold text-gray-400 mb-6">{new Date(test.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    
                    <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-admin-dark-border">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-400 uppercase tracking-widest">TSH Level</span>
                        <span className="font-black dark:text-white">{test.tsh || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-400 uppercase tracking-widest">Confidence</span>
                        <span className="font-black text-primary">{test.diagnosisResult?.confidence || 0}%</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail View */
          <div className="space-y-10 animate-in fade-in duration-1000">
            {/* Top Overview Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-admin-dark-card p-6 rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Interval</p>
                  <p className="font-black dark:text-white">
                    {Math.ceil(Math.abs(new Date(d2?.date) - new Date(d1?.date)) / (1000 * 60 * 60 * 24))} Days Apart
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-admin-dark-card p-6 rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Objective</p>
                  <p className="font-black dark:text-white">Longitudinal Monitoring</p>
                </div>
              </div>
              <div className="bg-white dark:bg-admin-dark-card p-6 rounded-3xl border border-gray-100 dark:border-admin-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data Integrity</p>
                  <p className="font-black dark:text-white">Verified AI Analysis</p>
                </div>
              </div>
            </div>

            {/* Side by Side Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {[d1, d2].map((data, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: idx === 0 ? -40 : 40 }} animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-admin-dark-card border-2 border-gray-100 dark:border-admin-dark-border rounded-[48px] p-10 shadow-xl shadow-gray-200/40 dark:shadow-none hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${idx === 0 ? 'bg-slate-400 shadow-slate-200' : 'bg-primary shadow-primary/30'}`}>
                        {idx === 0 ? 'A' : 'B'}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-0.5">
                          {idx === 0 ? 'HISTORICAL BASELINE' : 'RECENT ASSESSMENT'}
                        </span>
                        <h4 className="text-2xl font-black dark:text-white">Session Record</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-primary">{new Date(data?.date).toLocaleDateString('en-GB')}</p>
                      <p className="text-xs font-bold text-gray-400">{new Date(data?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-admin-dark-hover p-6 md:p-8 rounded-[32px] mb-10 border border-slate-100 dark:border-admin-dark-border relative overflow-hidden">
                    {/* Subtle color accent line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getStatusColor(data?.result || data?.riskLevel)}`} />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 pl-2">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                          <Brain size={14} className="text-primary" /> AI Classification
                        </p>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white capitalize break-words leading-tight">
                          {Array.from(new Set((data?.result || '').split(',').map(s => s.trim()))).filter(Boolean).join(' / ') || 'Unknown'}
                        </h2>
                      </div>
                      <div className="bg-white dark:bg-admin-dark-card px-5 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-admin-dark-border text-center min-w-[120px]">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Confidence</p>
                        <p className="text-2xl font-black text-primary">
                          {data?.confidence <= 1 ? (data?.confidence * 100).toFixed(1) : Number(data?.confidence || 0).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                        <FlaskConical size={20} className="text-primary" /> Biomarker Profile
                      </h4>
                      <span className="text-[10px] font-black text-gray-400">UNIT: CLINICAL STD</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'TSH', val: data?.tsh, unit: 'mIU/L' },
                        { label: 'T3', val: data?.t3, unit: 'ng/dL' },
                        { label: 'TT4', val: data?.tt4, unit: 'μg/dL' },
                        { label: 'FTI', val: data?.fti, unit: 'Index' },
                      ].map((lab, i) => (
                        <div key={i} className="p-5 bg-slate-50 dark:bg-admin-dark-hover rounded-3xl border border-slate-100 dark:border-admin-dark-border group hover:bg-white dark:hover:bg-admin-dark-card hover:shadow-md transition-all">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{lab.label}</p>
                          <div className="flex items-baseline gap-1">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{lab.val}</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">{lab.unit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Differential Trend Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-12 bg-slate-900 dark:bg-admin-dark-card rounded-[56px] text-white shadow-2xl relative overflow-hidden border border-white/5"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <BarChart3 size={300} />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <Zap size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tight">AI Differential Trend Analysis</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Cross-session longitudinal study & variance analysis</p>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Overall Shift</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold opacity-60">{d1?.result}</span>
                      <MoveRight size={16} className="text-primary" />
                      <span className="text-lg font-black">{d2?.result}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${getStatusColor(summary?.overallTrend)} text-white`}>
                          {summary?.overallTrend} | {summary?.overallTrendAr}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Lab Trends with Delta calculation */}
                  {[
                    { label: 'TSH Trend', v1: d1?.tsh, v2: d2?.tsh, low: 0.4, high: 4.0, unit: 'mIU/L' },
                    { label: 'T3 Trend', v1: d1?.t3, v2: d2?.t3, low: 80, high: 200, unit: 'ng/dL' },
                    { label: 'TT4 Trend', v1: d1?.tt4, v2: d2?.tt4, low: 5.1, high: 14.1, unit: 'μg/dL' }
                  ].map((trend, i) => {
                    const delta = (trend.v2 || 0) - (trend.v1 || 0);
                    const deltaPct = trend.v1 ? ((delta / trend.v1) * 100).toFixed(1) : '0';
                    const isImproving = trend.v1 > trend.high ? trend.v2 < trend.v1 : (trend.v1 < trend.low ? trend.v2 > trend.v1 : true);
                    
                    return (
                      <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-6">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{trend.label}</p>
                          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${delta >= 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
                            {delta >= 0 ? '+' : ''}{deltaPct}% Variance
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-between mb-6">
                          <div>
                            <p className="text-4xl font-black tracking-tighter">{trend.v2 || '—'}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">{trend.unit}</p>
                          </div>
                          <div className={`flex flex-col items-end gap-1 ${isImproving ? 'text-green-500' : 'text-orange-500'}`}>
                            {isImproving ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span className="text-[10px] font-black uppercase tracking-widest">{isImproving ? 'Stable/Impr.' : 'Variance'}</span>
                          </div>
                        </div>
                        
                        {/* Spark-line like indicator */}
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex items-center">
                          <div className="h-full bg-primary/20 w-full relative">
                            <motion.div 
                              initial={{ left: '50%' }}
                              animate={{ left: `${Math.max(0, Math.min(100, (trend.v2 / (trend.high * 1.5)) * 100))}%` }}
                              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" 
                            />
                          </div>
                        </div>
                        <div className="flex justify-between mt-3 text-[9px] font-black text-gray-600 uppercase">
                          <span>Min: {trend.low}</span>
                          <span>Max: {trend.high}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final Summary Card */}
                <div className={`mt-12 p-10 backdrop-blur-xl rounded-[40px] border relative overflow-hidden transition-all duration-500 ${getTrendCardStyles(summary?.overallTrend)}`}>
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Shield size={60} />
                   </div>
                   <div className="flex flex-col lg:flex-row gap-10 items-center">
                      <div className="flex-1 space-y-4 text-center lg:text-left">
                        <h4 className="text-2xl font-black flex items-center justify-center lg:justify-start gap-3">
                          <CircleCheck className="text-green-400" /> Progression Summary | ملخص تطور الحالة
                        </h4>
                        <div className="space-y-4">
                          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                            {summary?.message}
                          </p>
                          <p className="text-primary text-xl font-bold leading-relaxed max-w-3xl text-right [direction:rtl]">
                            {summary?.messageAr}
                          </p>
                          
                          {summary?.analysisDetailsAr && summary.analysisDetailsAr.length > 0 && (
                            <div className="mt-6 space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-right [direction:rtl]">Detailed Analysis | تحليل تفصيلي</p>
                              <ul className="space-y-2">
                                {summary.analysisDetailsAr.map((detail, idx) => (
                                  <li key={idx} className="flex items-center justify-start gap-3 text-sm font-bold text-right [direction:rtl]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                                {summary.analysisDetails && summary.analysisDetails.map((detail, idx) => (
                                  <li key={`en-${idx}`} className="flex items-center gap-3 text-xs opacity-60 font-medium italic">
                                    <ChevronRight size={12} className="text-primary" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4">
                             <span className={`px-4 py-2 rounded-xl font-black text-sm text-white ${getStatusColor(summary?.overallTrend)}`}>
                                {summary?.overallTrend} | {summary?.overallTrendAr}
                             </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <button 
                          onClick={() => window.print()}
                          className="px-8 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primaryHover transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 group"
                        >
                          <Printer size={20} className="group-hover:scale-110 transition-transform" /> GENERATE CLINICAL REPORT
                        </button>
                        <button className="px-8 py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                          <Share2 size={20} /> SHARE WITH ONCOLOGIST
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisComparison;
