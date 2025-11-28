import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, 
  FileText, 
  Trash2, 
  Search, 
  Filter, 
  HardDrive, 
  Cloud,
  MoreVertical,
  Eye
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const MediaManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const [files, setFiles] = useState([
    { id: 1, name: 'patient_scan_001.jpg', type: 'image', size: '2.4 MB', date: '2023-10-24', url: 'https://via.placeholder.com/300' },
    { id: 2, name: 'medical_report_A23.pdf', type: 'document', size: '1.1 MB', date: '2023-10-23' },
    { id: 3, name: 'xray_chest_v2.png', type: 'image', size: '3.8 MB', date: '2023-10-22', url: 'https://via.placeholder.com/300' },
    { id: 4, name: 'lab_results_full.pdf', type: 'document', size: '0.5 MB', date: '2023-10-21' },
    { id: 5, name: 'mri_brain_scan.jpg', type: 'image', size: '5.2 MB', date: '2023-10-20', url: 'https://via.placeholder.com/300' },
    { id: 6, name: 'prescription_009.pdf', type: 'document', size: '0.2 MB', date: '2023-10-19' },
  ]);

  const filteredFiles = files.filter(file => {
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this file permanently?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Media Manager
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage uploaded X-rays, reports, and other media files.
          </p>
        </div>
        <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-red-500/20">
          <Trash2 size={18} /> Clean Up Old Files
        </button>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <HardDrive size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Storage</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>1 TB</p>
          </div>
        </div>
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
            <Cloud size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Used Space</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>458 GB (45%)</p>
          </div>
        </div>
        <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
            <FileText size={24} />
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Files</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>12,450</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={20} className="text-gray-400" />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-4 py-2 rounded-lg border outline-none cursor-pointer
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>
        </div>
      </div>

      {/* Files Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <AnimatePresence>
          {filteredFiles.map((file) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={file.id}
              className={`group relative rounded-xl border overflow-hidden transition-all hover:shadow-lg
                ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border hover:border-blue-500/50' : 'bg-white border-gray-100 hover:border-blue-200'}`}
            >
              {/* Preview */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <FileText size={48} className="text-gray-400" />
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(file.id)}
                    className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className={`text-sm font-medium truncate mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {file.name}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MediaManager;
