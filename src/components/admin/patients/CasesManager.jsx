import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CaseCard from './CaseCard';
import CaseDetails from './CaseDetails';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const CasesManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock Data
  const [cases, setCases] = useState([
    { id: 'C001', patientName: 'John Smith', doctorName: 'Sarah Smith', date: '2023-10-24', result: 'Normal', confidence: 98, image: 'https://prod-images-static.radiopaedia.org/images/51536838/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg', notes: 'Patient shows no signs of abnormalities. Regular checkup recommended in 6 months.' },
    { id: 'C002', patientName: 'Emily Davis', doctorName: 'Ahmed Ali', date: '2023-10-23', result: 'Abnormal', confidence: 87, image: 'https://prod-images-static.radiopaedia.org/images/1568265/8b8f8e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg', notes: 'Detected potential nodule in the left lobe. Biopsy recommended.' },
    { id: 'C003', patientName: 'Michael Brown', doctorName: 'Sarah Smith', date: '2023-10-22', result: 'Normal', confidence: 95, image: 'https://prod-images-static.radiopaedia.org/images/2345678/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg', notes: 'Clear scan. No issues found.' },
    { id: 'C004', patientName: 'Jessica Wilson', doctorName: 'John Doe', date: '2023-10-21', result: 'Uncertain', confidence: 65, image: 'https://prod-images-static.radiopaedia.org/images/3456789/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg', notes: 'Image quality is low. Requested re-scan.' },
    { id: 'C005', patientName: 'David Lee', doctorName: 'Emily Chen', date: '2023-10-20', result: 'Abnormal', confidence: 92, image: 'https://prod-images-static.radiopaedia.org/images/4567890/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg', notes: 'High probability of malignancy. Urgent referral.' },
  ]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterResult(e.target.value);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterResult === 'all' || c.result === filterResult;
    return matchesSearch && matchesFilter;
  });

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
    setIsDetailsOpen(true);
  };

  const handleDeleteCase = (id) => {
    if (window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      setCases(cases.filter(c => c.id !== id));
      setIsDetailsOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Patients & Cases
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          View and manage patient diagnoses and AI analysis results.
        </p>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by patient, doctor, or Case ID..." 
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={20} className="text-gray-400" />
          <select 
            value={filterResult}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-lg border outline-none cursor-pointer
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <option value="all">All Results</option>
            <option value="Normal">Normal</option>
            <option value="Abnormal">Abnormal</option>
            <option value="Uncertain">Uncertain</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCases.map(caseData => (
            <CaseCard 
              key={caseData.id} 
              caseData={caseData} 
              onView={handleViewCase} 
              onDelete={handleDeleteCase} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCases.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No cases found matching your criteria.</p>
        </div>
      )}

      {/* Details Modal */}
      <CaseDetails 
        caseData={selectedCase} 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        onDelete={handleDeleteCase}
      />
    </div>
  );
};

export default CasesManager;
