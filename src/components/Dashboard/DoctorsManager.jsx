import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Ban,
  CheckCircle,
  Eye,
  RefreshCw,
  Download
} from 'lucide-react';
import './AdminDashboard.css';

const DoctorsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - replace with API call
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      country: 'Egypt',
      diagnoses: 145,
      subscription: 'Pro',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sarah Mohamed',
      email: 'sarah.m@email.com',
      country: 'UAE',
      diagnoses: 89,
      subscription: 'Basic',
      status: 'active',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Dr. Khaled Ali',
      email: 'khaled.ali@email.com',
      country: 'Saudi Arabia',
      diagnoses: 234,
      subscription: 'Enterprise',
      status: 'active',
      joinDate: '2023-11-10'
    },
    {
      id: 4,
      name: 'Dr. Fatma Ibrahim',
      email: 'fatma.i@email.com',
      country: 'Egypt',
      diagnoses: 12,
      subscription: 'Free',
      status: 'suspended',
      joinDate: '2024-10-05'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doctor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: 'var(--admin-text)' }}>
          Doctors Management
        </h1>
        <p className="text-[15px]" style={{ color: 'var(--admin-text-muted)' }}>
          Manage registered doctors and their accounts
        </p>
      </div>

      {/* Data Table */}
      <div className="chart-card">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6" style={{ borderBottom: '1px solid var(--admin-border)' }}>
          <h3 className="chart-card-title">All Doctors ({filteredDoctors.length})</h3>
          
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2"
                style={{ color: 'var(--admin-text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  paddingRight: '1rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  backgroundColor: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--admin-text)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                className="focus:ring-2 focus:ring-[#4695a5]"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.625rem',
                paddingBottom: '0.625rem',
                backgroundColor: 'var(--admin-dark-lighter)',
                border: '1px solid var(--admin-border)',
                borderRadius: '0.75rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              className="focus:ring-2 focus:ring-[#4695a5]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.625rem',
                paddingBottom: '0.625rem',
                background: 'linear-gradient(135deg, var(--admin-primary), var(--admin-secondary))',
                color: 'white',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className="hover:shadow-lg"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--admin-dark-lighter)' }}>
              <tr>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Doctor</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Country</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Diagnoses</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Subscription</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Status</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Join Date</th>
                <th style={{
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--admin-text-muted)'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <motion.tr
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="table-row"
                  style={{
                    borderBottom: '1px solid var(--admin-border)',
                    '--hover-bg': 'var(--admin-hover-bg)'
                  }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4695a5] to-[#6366f1] flex items-center justify-center text-white font-semibold text-sm">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5">
                          {doctor.name}
                        </div>
                        <div className="text-[13px] text-slate-500 dark:text-slate-400">
                          {doctor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-700 dark:text-slate-300">{doctor.country}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-[#4695a5]/10 text-[#4695a5] dark:bg-[#4695a5]/20 dark:text-[#5ab5c7] rounded-lg text-sm font-semibold">
                      {doctor.diagnoses}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      doctor.subscription === 'Enterprise' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      doctor.subscription === 'Pro' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                      doctor.subscription === 'Basic' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                      'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {doctor.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize ${
                      doctor.status === 'active' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400">
                    {new Date(doctor.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--admin-dark-lighter)',
                          color: 'var(--admin-text-muted)',
                          borderRadius: '0.5rem',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        className="hover:bg-[#4695a5] hover:text-white"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--admin-dark-lighter)',
                          color: 'var(--admin-text-muted)',
                          borderRadius: '0.5rem',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        className="hover:bg-[#4695a5] hover:text-white"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--admin-dark-lighter)',
                          color: 'var(--admin-text-muted)',
                          borderRadius: '0.5rem',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        className="hover:bg-[#4695a5] hover:text-white"
                        title={doctor.status === 'active' ? 'Suspend' : 'Activate'}
                      >
                        {doctor.status === 'active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorsManager;
