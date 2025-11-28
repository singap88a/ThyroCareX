import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Download, Plus } from 'lucide-react';
import PlanCard from './PlanCard';
import BillingTable from './BillingTable';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const SubscriptionsManager = () => {
  const { isDarkMode } = useAdminTheme();

  // Mock Data
  const plans = [
    { 
      name: 'Free', 
      price: 0, 
      subscribers: 450, 
      revenue: 0, 
      features: ['5 AI Diagnoses/month', 'Basic Support', 'Standard Speed'] 
    },
    { 
      name: 'Pro', 
      price: 49, 
      subscribers: 320, 
      revenue: 15680, 
      features: ['Unlimited Diagnoses', 'Priority Support', 'High Speed Processing', 'Advanced Analytics'] 
    },
    { 
      name: 'Enterprise', 
      price: 199, 
      subscribers: 85, 
      revenue: 16915, 
      features: ['Unlimited Everything', '24/7 Dedicated Support', 'API Access', 'Custom Integration'] 
    },
  ];

  const transactions = [
    { id: 'INV-001', doctor: 'Dr. Sarah Smith', plan: 'Pro', amount: 49, date: '2023-10-24', method: 'Visa', status: 'paid' },
    { id: 'INV-002', doctor: 'Dr. John Doe', plan: 'Enterprise', amount: 199, date: '2023-10-23', method: 'PayPal', status: 'paid' },
    { id: 'INV-003', doctor: 'Dr. Emily Chen', plan: 'Pro', amount: 49, date: '2023-10-23', method: 'Mastercard', status: 'failed' },
    { id: 'INV-004', doctor: 'Dr. Michael Brown', plan: 'Pro', amount: 49, date: '2023-10-22', method: 'Visa', status: 'paid' },
    { id: 'INV-005', doctor: 'Dr. Ahmed Ali', plan: 'Pro', amount: 49, date: '2023-10-22', method: 'Vodafone Cash', status: 'pending' },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subscriptions & Billing
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage subscription plans, track revenue, and view billing history.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <Plus size={18} /> Create Plan
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border
            ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}
      >
        <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Revenue Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                  color: isDarkMode ? '#fff' : '#000'
                }} 
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} onEdit={() => {}} />
        ))}
      </div>

      {/* Transactions Table */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Transactions</h3>
        <BillingTable transactions={transactions} />
      </div>
    </div>
  );
};

export default SubscriptionsManager;
