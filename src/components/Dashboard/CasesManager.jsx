import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, Trash2, Download, Image as ImageIcon, Sun, Moon, FileText, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CasesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { theme, toggleTheme } = useTheme();

  // Sample data
  const cases = [
    {
      id: 1,
      patientName: 'Patient #1234',
      doctor: 'Dr. Ahmed Hassan',
      date: '2024-11-25',
      images: 3,
      aiResult: 'Thyroid Nodule Detected',
      confidence: 94.5,
      status: 'completed'
    },
    {
      id: 2,
      patientName: 'Patient #1235',
      doctor: 'Dr. Sarah Mohamed',
      date: '2024-11-26',
      images: 2,
      aiResult: 'Normal',
      confidence: 98.2,
      status: 'completed'
    },
    {
      id: 3,
      patientName: 'Patient #1236',
      doctor: 'Dr. Khaled Ali',
      date: '2024-11-27',
      images: 4,
      aiResult: 'Suspicious - Requires Review',
      confidence: 76.8,
      status: 'pending'
    },
    {
      id: 4,
      patientName: 'Patient #1237',
      doctor: 'Dr. Mona Ibrahim',
      date: '2024-11-28',
      images: 5,
      aiResult: 'Thyroid Nodule Detected',
      confidence: 88.3,
      status: 'pending'
    },
    {
      id: 5,
      patientName: 'Patient #1238',
      doctor: 'Dr. Ahmed Hassan',
      date: '2024-11-27',
      images: 2,
      aiResult: 'Normal',
      confidence: 96.7,
      status: 'completed'
    }
  ];

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.aiResult.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const stats = {
    total: cases.length,
    completed: cases.filter(c => c.status === 'completed').length,
    pending: cases.filter(c => c.status === 'pending').length,
    avgConfidence: (cases.reduce((sum, c) => sum + c.confidence, 0) / cases.length).toFixed(1)
  };

  return (
    <div className={`min-h-screen ${theme}`}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-[#4695a5] to-[#6366f1] bg-clip-text text-transparent">
              Cases Management
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400">
              View and manage patient diagnosis cases
            </p>
          </div>
          
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#4695a5] hover:text-white dark:hover:bg-[#4695a5] transition-all duration-300 shadow-lg hover:shadow-xl"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 transition-all bg-white border-2 border-blue-200 shadow-lg rounded-2xl dark:bg-slate-800 dark:border-blue-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl dark:bg-blue-900/50">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Cases</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 transition-all bg-white border-2 border-green-200 shadow-lg rounded-2xl dark:bg-slate-800 dark:border-green-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl dark:bg-green-900/50">
              <FileText className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Completed</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 transition-all bg-white border-2 border-yellow-200 shadow-lg rounded-2xl dark:bg-slate-800 dark:border-yellow-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-100 rounded-xl dark:bg-yellow-900/50">
              <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <Calendar className="text-yellow-600 dark:text-yellow-400" size={20} />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.pending}</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Pending Review</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 transition-all bg-white border-2 border-purple-200 shadow-lg rounded-2xl dark:bg-slate-800 dark:border-purple-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-100 rounded-xl dark:bg-purple-900/50">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <TrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.avgConfidence}%</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Avg Confidence</p>
        </motion.div>
      </motion.div>

      {/* Main Table Section */}
      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">All Cases ({filteredCases.length})</h3>
          
          <div className="data-table-actions">
            {/* Filter Buttons */}
            <div className="flex gap-2 mr-4">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                  filterStatus === 'all'
                    ? 'bg-[#4695a5] text-white shadow-lg border-[#4695a5]'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-[#4695a5] dark:hover:border-[#4695a5]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                  filterStatus === 'completed'
                    ? 'bg-green-500 text-white shadow-lg border-green-500'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 dark:hover:border-green-500'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                  filterStatus === 'pending'
                    ? 'bg-yellow-500 text-white shadow-lg border-yellow-500'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-500 dark:hover:border-yellow-500'
                }`}
              >
                Pending
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-500 dark:text-slate-400"
              />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4695a5] focus:border-[#4695a5] shadow-sm hover:shadow-md transition-all font-medium"
              />
            </div>

            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-sm"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Images</th>
                <th>AI Result</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredCases.map((caseItem, index) => (
                  <motion.tr
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <td className="font-semibold text-slate-800 dark:text-slate-100">{caseItem.patientName}</td>
                    <td className="text-slate-700 dark:text-slate-300">{caseItem.doctor}</td>
                    <td className="text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(caseItem.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold">
                        <ImageIcon size={14} />
                        {caseItem.images}
                      </span>
                    </td>
                    <td className="font-medium text-slate-700 dark:text-slate-300">{caseItem.aiResult}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden max-w-[100px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${caseItem.confidence}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full rounded-full ${
                              caseItem.confidence > 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                              caseItem.confidence > 75 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                              'bg-gradient-to-r from-red-500 to-red-600'
                            }`}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 min-w-[45px]">
                          {caseItem.confidence}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-block py-1.5 px-3 rounded-lg text-sm font-semibold capitalize ${
                        caseItem.status === 'completed'
                          ? 'bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                          : 'bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="min-w-0 p-2 btn-secondary btn-sm hover:bg-[#4695a5] hover:text-white hover:border-[#4695a5] transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="min-w-0 p-2 transition-all btn-secondary btn-sm hover:bg-red-500 hover:text-white hover:border-red-500"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800">
              <Search className="text-slate-400 dark:text-slate-600" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-700 dark:text-slate-300">No cases found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CasesManager;
