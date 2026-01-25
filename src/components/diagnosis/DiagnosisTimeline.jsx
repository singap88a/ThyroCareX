import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  Activity, 
  AlertCircle, 
  CircleCheck, 
  Clock,
  Eye,
  GitCompare,
  FileText
} from 'lucide-react';

const DiagnosisTimeline = ({ 
  diagnoses = [], 
  onViewDiagnosis,
  onCompare,
  selectable = false
}) => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, id]);
    } else {
      // Replace first selected with new one
      setSelectedItems([selectedItems[1], id]);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      MALIGNANT: {
        color: 'bg-red-500',
        textColor: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        icon: AlertCircle,
        label: 'Malignant'
      },
      BENIGN: {
        color: 'bg-green-500',
        textColor: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        icon: CircleCheck,
        label: 'Benign'
      },
      SUSPICIOUS: {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: AlertCircle,
        label: 'Suspicious'
      },
      NORMAL: {
        color: 'bg-primary',
        textColor: 'text-primary',
        bgColor: 'bg-primary/10',
        icon: CircleCheck,
        label: 'Normal'
      }
    };
    return configs[status] || configs.NORMAL;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="relative">
      {/* Compare Button */}
      {selectable && selectedItems.length === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 p-4 mb-6 bg-gradient-to-r from-primary to-primaryHover rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <GitCompare className="w-5 h-5" />
              <span className="font-medium">2 diagnoses selected for comparison</span>
            </div>
            <button
              onClick={() => onCompare && onCompare(selectedItems)}
              className="px-4 py-2 font-medium text-primary bg-white rounded-xl hover:bg-gray-100 transition-colors"
            >
              Compare Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-gray-300 dark:from-primary dark:via-primary/30 dark:to-slate-700" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {diagnoses.map((diagnosis, index) => {
            const config = getStatusConfig(diagnosis.status);
            const StatusIcon = config.icon;
            const isExpanded = expandedId === diagnosis.id;
            const isSelected = selectedItems.includes(diagnosis.id);

            return (
              <motion.div
                key={diagnosis.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative pl-14 ${isSelected ? 'scale-[1.02]' : ''} transition-transform`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-4 top-6 w-5 h-5 rounded-full ${config.color} ring-4 ring-white dark:ring-slate-800 shadow-lg cursor-pointer z-10`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => selectable && handleSelect(diagnosis.id)}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-white rounded-full flex items-center justify-center"
                    >
                      <CircleCheck className={`w-4 h-4 ${config.textColor}`} />
                    </motion.div>
                  )}
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`bg-white dark:bg-slate-800 rounded-2xl border-2 ${
                    isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-gray-100 dark:border-slate-700'
                  } overflow-hidden transition-all duration-300`}
                  whileHover={{ y: -2 }}
                  layout
                >
                  {/* Card Header */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : diagnosis.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${config.bgColor}`}>
                          <StatusIcon className={`w-5 h-5 ${config.textColor}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                              {diagnosis.condition || config.label}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor}`}>
                              {diagnosis.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(diagnosis.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(diagnosis.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Confidence Badge */}
                        <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full">
                          <Activity className="w-3 h-3 text-primary" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {diagnosis.confidence}% confidence
                          </span>
                        </div>
                        
                        {/* Expand Icon */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="p-1"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-gray-100 dark:border-slate-700">
                          {/* Biomarkers Preview */}
                          {diagnosis.biomarkers && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                              {Object.entries(diagnosis.biomarkers).slice(0, 4).map(([key, data]) => (
                                <div 
                                  key={key}
                                  className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl"
                                >
                                  <p className="text-xs text-gray-500 uppercase">{key}</p>
                                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {typeof data === 'object' ? data.value : data}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Severity & Risk */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {diagnosis.severity && (
                              <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full">
                                Severity: {diagnosis.severity}
                              </span>
                            )}
                            {diagnosis.riskLevel && (
                              <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
                                Risk: {diagnosis.riskLevel}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => onViewDiagnosis && onViewDiagnosis(diagnosis.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Full Details
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                              <FileText className="w-4 h-4" />
                              Download Report
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Connection Label (for first item) */}
                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -left-1 top-14 text-xs text-gray-400 font-medium"
                  >
                    Latest
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTimeline;
