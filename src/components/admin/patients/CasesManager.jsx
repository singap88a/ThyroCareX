import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
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
          <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
          <input 
            type="text" 
            placeholder="Search by patient, doctor, or Case ID..." 
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-colors
              ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500'}`}
          />
        </div>
        <div className="flex items-center w-full gap-3 md:w-auto">
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

      {/* Cases Table */}
      <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Case ID</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Patient Name</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Doctor Name</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Result</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Confidence</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredCases.map(caseData => (
                <tr key={caseData.id} className={`hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>#{caseData.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseData.patientName}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dr. {caseData.doctorName}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseData.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      caseData.result === 'Normal' ? 'bg-emerald-100 text-emerald-800' :
                      caseData.result === 'Abnormal' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {caseData.result}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseData.confidence}%</td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewCase(caseData)}
                        className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-primary hover:bg-primary/20' : 'text-primary hover:bg-primary/10'}`}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCase(caseData.id)}
                        className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'}`}
                        title="Delete Case"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCases.length === 0 && (
        <div className="py-20 text-center">
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
