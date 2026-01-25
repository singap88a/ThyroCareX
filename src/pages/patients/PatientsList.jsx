import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MoreVertical,
  User,
  Calendar,
  Activity,
  ChevronRight,
  Plus,
  Eye,
  ArrowUpDown,
  Download,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  CircleCheck,
  XCircle,
  RefreshCcw,
  History,
  LayoutDashboard
} from 'lucide-react';

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Enhanced Mock Data
  const patients = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      age: 34, 
      lastVisit: "2024-03-10", 
      status: "Critical", 
      condition: "Hyperthyroidism", 
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      nextAppointment: "2024-03-20",
      visits: 12,
      priority: "High"
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      age: 45, 
      lastVisit: "2024-03-08", 
      status: "Stable", 
      condition: "Hypothyroidism", 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      email: "michael.c@example.com",
      phone: "+1 (555) 987-6543",
      nextAppointment: "2024-04-05",
      visits: 8,
      priority: "Medium"
    },
    { 
      id: 3, 
      name: "Emma Wilson", 
      age: 28, 
      lastVisit: "2024-03-05", 
      status: "Normal", 
      condition: "Routine Checkup", 
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      email: "emma.w@example.com",
      phone: "+1 (555) 456-7890",
      nextAppointment: "2024-06-15",
      visits: 4,
      priority: "Low"
    },
    { 
      id: 4, 
      name: "James Rodriguez", 
      age: 52, 
      lastVisit: "2024-02-28", 
      status: "Warning", 
      condition: "Nodule Detected", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      email: "james.r@example.com",
      phone: "+1 (555) 321-0987",
      nextAppointment: "2024-03-25",
      visits: 15,
      priority: "High"
    },
    { 
      id: 5, 
      name: "Lisa Park", 
      age: 41, 
      lastVisit: "2024-02-25", 
      status: "Stable", 
      condition: "Post-Surgery", 
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      email: "lisa.p@example.com",
      phone: "+1 (555) 765-4321",
      nextAppointment: "2024-04-10",
      visits: 6,
      priority: "Medium"
    },
    { 
      id: 6, 
      name: "Robert Kim", 
      age: 38, 
      lastVisit: "2024-03-01", 
      status: "Normal", 
      condition: "Follow-up", 
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      email: "robert.k@example.com",
      phone: "+1 (555) 234-5678",
      nextAppointment: "2024-05-12",
      visits: 7,
      priority: "Low"
    },
    { 
      id: 7, 
      name: "Maria Garcia", 
      age: 56, 
      lastVisit: "2024-02-20", 
      status: "Critical", 
      condition: "Thyroid Cancer", 
      img: "https://images.unsplash.com/photo-1551836026-d5c2c5af91f9?w=150&h=150&fit=crop",
      email: "maria.g@example.com",
      phone: "+1 (555) 876-5432",
      nextAppointment: "2024-03-15",
      visits: 20,
      priority: "High"
    },
    { 
      id: 8, 
      name: "David Miller", 
      age: 49, 
      lastVisit: "2024-02-18", 
      status: "Stable", 
      condition: "Medication Review", 
      img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop",
      email: "david.m@example.com",
      phone: "+1 (555) 345-6789",
      nextAppointment: "2024-04-22",
      visits: 9,
      priority: "Medium"
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Critical': return <AlertCircle className="w-4 h-4" />;
      case 'Warning': return <AlertCircle className="w-4 h-4" />;
      case 'Stable': return <CircleCheck className="w-4 h-4" />;
      case 'Normal': return <CircleCheck className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.direction === 'ascending') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen pt-20 pb-12 bg-admin-light-bg dark:bg-admin-dark-bg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-admin-light-text dark:text-admin-dark-text">Patient Management</h1>
            <p className="mt-1 text-admin-light-muted dark:text-admin-dark-muted">Manage and monitor your patients' health records</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-xl hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-light-muted dark:text-admin-dark-muted">Total Patients</p>
                <p className="mt-2 text-3xl font-bold text-admin-light-text dark:text-admin-dark-text">{patients.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 dark:text-green-400">↑ 12%</span>
              <span className="ml-2 text-admin-light-muted dark:text-admin-dark-muted">from last month</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-light-muted dark:text-admin-dark-muted">Critical Cases</p>
                <p className="mt-2 text-3xl font-bold text-admin-light-text dark:text-admin-dark-text">{patients.filter(p => p.status === 'Critical').length}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-red-600 dark:text-red-400">↑ 3%</span>
              <span className="ml-2 text-admin-light-muted dark:text-admin-dark-muted">requires attention</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-light-muted dark:text-admin-dark-muted">Avg. Visits</p>
                <p className="mt-2 text-3xl font-bold text-admin-light-text dark:text-admin-dark-text">
                  {(patients.reduce((acc, p) => acc + p.visits, 0) / patients.length).toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 dark:text-green-400">↓ 5%</span>
              <span className="ml-2 text-admin-light-muted dark:text-admin-dark-muted">from last month</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-light-muted dark:text-admin-dark-muted">Next 7 Days</p>
                <p className="mt-2 text-3xl font-bold text-admin-light-text dark:text-admin-dark-text">8</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-purple-600 dark:text-purple-400">3 new</span>
              <span className="ml-2 text-admin-light-muted dark:text-admin-dark-muted">appointments</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 mb-6 bg-white border shadow-sm border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 transform -translate-y-1/2 text-admin-light-muted dark:text-admin-dark-muted left-4 top-1/2" />
              <input
                type="text"
                placeholder="Search patients by name, email, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 transition-all border bg-admin-light-bg dark:bg-admin-dark-hover border-admin-light-border dark:border-admin-dark-border rounded-xl focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border bg-admin-light-bg dark:bg-admin-dark-hover border-admin-light-border dark:border-admin-dark-border text-admin-light-text dark:text-admin-dark-text rounded-xl focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Critical">Critical</option>
                <option value="Warning">Warning</option>
                <option value="Stable">Stable</option>
                <option value="Normal">Normal</option>
              </select>
              
              <button className="flex items-center px-4 py-3 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-xl hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-hidden bg-white border shadow-sm border-admin-light-border dark:bg-admin-dark-card dark:border-admin-dark-border rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-light-border dark:border-admin-dark-border">
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-light-text dark:hover:text-admin-dark-text"
                    >
                      Patient
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={() => handleSort('status')}
                      className="flex items-center text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-light-text dark:hover:text-admin-dark-text"
                    >
                      Status
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={() => handleSort('lastVisit')}
                      className="flex items-center text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-light-text dark:hover:text-admin-dark-text"
                    >
                      Last Visit
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted">Condition</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={() => handleSort('priority')}
                      className="flex items-center text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-light-text dark:hover:text-admin-dark-text"
                    >
                      Priority
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted">Contact</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold tracking-wider uppercase text-admin-light-muted dark:text-admin-dark-muted">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-light-border dark:divide-admin-dark-border">
                {filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="transition-colors hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={patient.img} 
                          alt={patient.name} 
                          className="object-cover w-10 h-10 mr-3 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-admin-light-text dark:text-admin-dark-text">
                            {patient.name}
                          </div>
                          <div className="text-sm text-admin-light-muted dark:text-admin-dark-muted">
                            {patient.age} years • {patient.visits} visits
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          patient.status === 'Warning' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          patient.status === 'Stable' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {getStatusIcon(patient.status)}
                          <span className="ml-1.5">{patient.status}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-admin-light-text dark:text-admin-dark-text">{patient.lastVisit}</div>
                      <div className="text-xs text-admin-light-muted dark:text-admin-dark-muted">
                        Next: {patient.nextAppointment}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-admin-light-text dark:text-admin-dark-text">{patient.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 mr-2 rounded-full ${getPriorityColor(patient.priority)}`}></div>
                        <span className="text-sm font-medium text-admin-light-text dark:text-admin-dark-text">
                          {patient.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-admin-light-muted dark:text-admin-dark-muted">
                          <Mail className="w-3 h-3 mr-2" />
                          {patient.email}
                        </div>
                        <div className="flex items-center text-sm text-admin-light-muted dark:text-admin-dark-muted">
                          <Phone className="w-3 h-3 mr-2" />
                          {patient.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Link 
                          to={`/patients/${patient.id}/dashboard`}
                          className="flex items-center gap-2 px-3 py-1.5 transition-all rounded-lg bg-admin-primary/10 text-admin-primary hover:bg-admin-primary hover:text-white font-medium text-sm"
                          title="View Patient Dashboard"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>

                        <button 
                          className="p-2 transition-colors rounded-lg text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-primary dark:hover:text-admin-primary hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover"
                          title="Send Message"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 transition-colors rounded-lg text-admin-light-muted dark:text-admin-dark-muted hover:text-admin-primary dark:hover:text-admin-primary hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover"
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-admin-light-border dark:border-admin-dark-border">
            <div className="text-sm text-admin-light-muted dark:text-admin-dark-muted">
              Showing <span className="font-medium text-admin-light-text dark:text-admin-dark-text">{filteredPatients.length}</span> of <span className="font-medium text-admin-light-text dark:text-admin-dark-text">{patients.length}</span> patients
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-lg hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border bg-admin-primary text-white rounded-lg hover:bg-admin-primary/90">
                1
              </button>
              <button className="px-3 py-1.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-lg hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover">
                2
              </button>
              <button className="px-3 py-1.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-lg hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover">
                3
              </button>
              <button className="px-3 py-1.5 text-sm font-medium transition-colors border border-admin-light-border dark:border-admin-dark-border text-admin-light-muted dark:text-admin-dark-muted rounded-lg hover:bg-admin-light-hover dark:hover:bg-admin-dark-hover">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;