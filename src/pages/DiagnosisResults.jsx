import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight, 
  Download, 
  Share2, 
  FileText
} from 'lucide-react';

const DiagnosisResults = () => {
  const location = useLocation();
  const patientData = location.state?.patientData || {};
  
  // Mock analysis data
  const analysis = {
    condition: "Hyperthyroidism",
    severity: "Moderate",
    confidence: 94.5,
    affectedArea: "Right Lobe",
    summary: "The analysis indicates elevated T3 and T4 levels with suppressed TSH, consistent with primary hyperthyroidism.",
    recommendations: [
      { type: "avoid", text: "High-iodine foods (seaweed, iodized salt)" },
      { type: "avoid", text: "Excessive caffeine and stimulants" },
      { type: "do", text: "Schedule a thyroid uptake scan" },
      { type: "do", text: "Monitor heart rate daily" },
    ],
    metrics: {
      tsh: { value: patientData.tsh || 0.1, status: "Low", range: "0.4 - 4.0" },
      t3: { value: patientData.t3 || 180, status: "High", range: "80 - 200" },
      t4: { value: patientData.t4 || 14.5, status: "High", range: "4.5 - 12.0" }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl p-8 mx-auto space-y-8 lg:p-12">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/add-patient" className="flex items-center space-x-2 text-gray-400 transition-colors hover:text-white">
            <div className="p-2 border rounded-full bg-white/5 backdrop-blur-sm border-white/10">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </div>
            <span>Back to Input</span>
          </Link>

          <div className="flex space-x-3">
            <button className="p-3 text-blue-400 transition-all border rounded-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 text-green-400 transition-all border rounded-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Diagnosis Report
              </h1>
              <p className="mt-2 text-gray-400">
                Patient: <span className="font-medium text-white">{patientData.fullName || "Unknown"}</span> • ID: #THY-{Math.floor(Math.random()*10000)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-4xl font-bold text-green-400">{analysis.confidence}%</div>
              <div className="text-xs tracking-wider text-gray-500 uppercase">Confidence Score</div>
            </div>
          </div>
        </motion.div>

        {/* 3D Model Placeholder */}
        <div className="bg-gradient-to-br from-gray-900 to-[#0f172a] rounded-3xl p-12 border border-white/10">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="mb-4 text-6xl">🦋</div>
              <h3 className="mb-2 text-xl font-semibold text-white">3D Thyroid Model</h3>
              <p className="text-gray-400">Interactive 3D visualization will appear here</p>
              <p className="mt-2 text-sm text-gray-500">Affected Area: {analysis.affectedArea}</p>
            </div>
          </div>
        </div>

        {/* Main Result Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 border rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20"
        >
          <div className="flex items-center mb-4 space-x-4">
            <div className="p-3 text-blue-400 rounded-xl bg-blue-500/20">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{analysis.condition}</h2>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  analysis.severity === 'High' ? 'bg-red-500/20 text-red-400' : 
                  analysis.severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {analysis.severity} Severity
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">{analysis.affectedArea}</span>
              </div>
            </div>
          </div>
          <p className="leading-relaxed text-gray-300">
            {analysis.summary}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(analysis.metrics).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              className="p-4 transition-colors border rounded-2xl bg-white/5 border-white/5 hover:bg-white/10"
            >
              <div className="mb-1 text-xs tracking-wider text-gray-400 uppercase">{key.toUpperCase()}</div>
              <div className="mb-1 text-2xl font-bold text-white">{data.value}</div>
              <div className={`text-xs font-medium ${
                data.status === 'Normal' ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="flex items-center mb-4 text-lg font-semibold text-white">
            <FileText className="w-5 h-5 mr-2 text-purple-400" />
            AI Recommendations
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="mb-2 text-sm font-medium tracking-wider text-red-400 uppercase">Avoid</div>
              {analysis.recommendations.filter(r => r.type === 'avoid').map((rec, i) => (
                <div key={i} className="flex items-start p-3 space-x-3 border rounded-xl bg-red-500/5 border-red-500/10">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm text-gray-300">{rec.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="mb-2 text-sm font-medium tracking-wider text-green-400 uppercase">Recommended</div>
              {analysis.recommendations.filter(r => r.type === 'do').map((rec, i) => (
                <div key={i} className="flex items-start p-3 space-x-3 border rounded-xl bg-green-500/5 border-green-500/10">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm text-gray-300">{rec.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex pt-4 space-x-4">
          <button className="flex-1 py-4 font-semibold text-white transition-all transform shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-blue-900/20 hover:-translate-y-1">
            Generate Full PDF Report
          </button>
          <button className="flex-1 py-4 font-semibold text-white transition-all border rounded-xl bg-white/5 border-white/10 hover:bg-white/10">
            Schedule Consultation
          </button>
        </div>

      </div>
    </div>
  );
};

export default DiagnosisResults;
