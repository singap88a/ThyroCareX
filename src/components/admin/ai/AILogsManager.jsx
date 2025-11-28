import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const AILogsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedLog, setExpandedLog] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock Data with more details
  const logs = [
    { 
      id: 'LOG-001', 
      time: '2023-10-24 10:30:45', 
      doctor: 'Dr. Sarah Smith', 
      type: 'Thyroid Scan', 
      result: 'Normal', 
      confidence: 98.5, 
      status: 'success', 
      duration: '1.2s',
      model: 'v2.1.0',
      inputSize: '1024x1024 px',
      parameters: 'Standard'
    },
    { 
      id: 'LOG-002', 
      time: '2023-10-24 10:28:12', 
      doctor: 'Dr. Ahmed Ali', 
      type: 'Chest X-Ray', 
      result: 'Abnormal', 
      confidence: 87.2, 
      status: 'success', 
      duration: '1.5s',
      model: 'v2.1.0',
      inputSize: '1024x1024 px',
      parameters: 'Enhanced'
    },
    { 
      id: 'LOG-003', 
      time: '2023-10-24 10:15:00', 
      doctor: 'Dr. John Doe', 
      type: 'MRI Brain', 
      result: 'Error', 
      confidence: 0, 
      status: 'error', 
      duration: '0.5s', 
      error: 'Image format not supported (DICOM required)',
      model: 'v2.0.5',
      inputSize: 'N/A',
      parameters: 'N/A'
    },
    { 
      id: 'LOG-004', 
      time: '2023-10-24 09:45:33', 
      doctor: 'Dr. Emily Chen', 
      type: 'Thyroid Scan', 
      result: 'Normal', 
      confidence: 99.1, 
      status: 'success', 
      duration: '1.1s',
      model: 'v2.1.0',
      inputSize: '1024x1024 px',
      parameters: 'Standard'
    },
    { 
      id: 'LOG-005', 
      time: '2023-10-24 09:30:21', 
      doctor: 'Dr. Michael Brown', 
      type: 'CT Scan', 
      result: 'Uncertain', 
      confidence: 65.4, 
      status: 'warning', 
      duration: '2.1s', 
      warning: 'Low confidence score detected',
      model: 'v2.1.0',
      inputSize: '1024x1024 px',
      parameters: 'Standard'
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'emerald';
      case 'warning': return 'amber';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'emerald';
    if (confidence >= 70) return 'amber';
    return 'red';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-admin-dark-text' : 'text-admin-light-text'}`}>
            AI Diagnosis Logs
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-admin-dark-muted' : 'text-admin-light-muted'}`}>
            Monitor AI model performance, execution times, and error reports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border
              ${isDarkMode 
                ? 'bg-admin-dark-card border-admin-dark-border text-admin-dark-text hover:bg-admin-dark-hover disabled:opacity-50' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50'}`}
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border
            ${isDarkMode 
              ? 'bg-admin-primary border-admin-primary text-white hover:bg-blue-600' 
              : 'bg-admin-primary border-admin-primary text-white hover:bg-blue-600'}`}>
            <Download size={18} /> Export Logs
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Activity, label: 'Total Runs', value: '1,245', color: 'blue', trend: '+12%' },
          { icon: CheckCircle, label: 'Success Rate', value: '98.2%', color: 'emerald', trend: '+2.1%' },
          { icon: Clock, label: 'Avg. Time', value: '1.4s', color: 'purple', trend: '-0.3s' },
          { icon: AlertTriangle, label: 'Errors', value: '12', color: 'red', trend: '-4' },
        ].map((stat, index) => (
          <div key={index} className={`p-4 rounded-xl border transition-all hover:scale-105
            ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-admin-dark-muted' : 'text-admin-light-muted'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-xl font-bold ${isDarkMode ? 'text-admin-dark-text' : 'text-admin-light-text'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full
                ${stat.trend.includes('+') || stat.trend.includes('-0.3s') || stat.trend.includes('-4')
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-red-500/10 text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search logs by ID, Doctor, or Type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode 
                ? 'bg-admin-dark-hover border-admin-dark-border text-admin-dark-text focus:border-admin-primary' 
                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-admin-primary'}`}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={20} className={isDarkMode ? 'text-admin-dark-muted' : 'text-admin-light-muted'} />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg border outline-none cursor-pointer transition-colors
              ${isDarkMode 
                ? 'bg-admin-dark-hover border-admin-dark-border text-admin-dark-text' 
                : 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <button className={`p-2 rounded-lg border transition-colors
            ${isDarkMode 
              ? 'bg-admin-dark-hover border-admin-dark-border text-admin-dark-text hover:bg-admin-dark-hover' 
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
            <BarChart3 size={20} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className={`rounded-xl border overflow-hidden transition-colors
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs uppercase tracking-wider border-b
                ${isDarkMode ? 'bg-admin-dark-hover text-admin-dark-muted border-admin-dark-border' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                <th className="p-4 font-medium">Log ID</th>
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Doctor</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Result</th>
                <th className="p-4 font-medium">Confidence</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-admin-dark-border' : 'divide-gray-100'}`}>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr 
                    onClick={() => toggleExpand(log.id)}
                    className={`cursor-pointer transition-all hover:scale-[1.01]
                      ${isDarkMode 
                        ? 'hover:bg-admin-dark-hover text-admin-dark-text' 
                        : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <td className="p-4 font-mono text-sm font-medium">{log.id}</td>
                    <td className="p-4 text-sm">{log.time}</td>
                    <td className="p-4 text-sm font-medium">{log.doctor}</td>
                    <td className="p-4 text-sm">{log.type}</td>
                    <td className="p-4 text-sm font-medium">{log.result}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-1.5 rounded-full overflow-hidden
                          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-full rounded-full bg-${getConfidenceColor(log.confidence)}-500`}
                            style={{ width: `${log.confidence}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium text-${getConfidenceColor(log.confidence)}-500`}>
                          {log.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-mono">{log.duration}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                        ${log.status === 'success' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : log.status === 'warning' 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className={`p-1 rounded-lg transition-colors
                        ${isDarkMode ? 'hover:bg-admin-dark-hover' : 'hover:bg-gray-100'}`}>
                        {expandedLog === log.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedLog === log.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan="9" className="p-0">
                          <div className={`p-6 border-t ${isDarkMode ? 'bg-admin-dark-hover border-admin-dark-border' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div>
                                <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 
                                  ${isDarkMode ? 'text-admin-dark-text' : 'text-gray-700'}`}>
                                  <Cpu size={16} /> Technical Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>Model Version:</span>
                                    <span className="font-mono font-medium">{log.model}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>Inference Time:</span>
                                    <span className="font-mono font-medium">{log.duration}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>Input Size:</span>
                                    <span className="font-mono font-medium">{log.inputSize}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>Parameters:</span>
                                    <span className="font-mono font-medium">{log.parameters}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 
                                  ${isDarkMode ? 'text-admin-dark-text' : 'text-gray-700'}`}>
                                  <Activity size={16} /> Performance Metrics
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>CPU Usage:</span>
                                    <span className="font-mono font-medium">42%</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>Memory:</span>
                                    <span className="font-mono font-medium">1.2 GB</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}>GPU Usage:</span>
                                    <span className="font-mono font-medium">68%</span>
                                  </div>
                                </div>
                              </div>

                              {log.status !== 'success' && (
                                <div className="md:col-span-2 lg:col-span-1">
                                  <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 
                                    ${log.status === 'error' ? 'text-red-500' : 'text-amber-500'}`}>
                                    <AlertTriangle size={16} /> 
                                    {log.status === 'error' ? 'Error Details' : 'Warning Message'}
                                  </h4>
                                  <div className={`p-4 rounded-lg text-sm font-mono border
                                    ${log.status === 'error' 
                                      ? (isDarkMode 
                                          ? 'bg-red-900/20 border-red-500/30 text-red-400' 
                                          : 'bg-red-50 border-red-200 text-red-600')
                                      : (isDarkMode 
                                          ? 'bg-amber-900/20 border-amber-500/30 text-amber-400' 
                                          : 'bg-amber-50 border-amber-200 text-amber-600')}`}>
                                    {log.error || log.warning}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className={`p-12 text-center ${isDarkMode ? 'text-admin-dark-muted' : 'text-gray-500'}`}>
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No logs found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILogsManager;