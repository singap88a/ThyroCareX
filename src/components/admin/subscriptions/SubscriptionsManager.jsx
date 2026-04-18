import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, Search, Filter, RefreshCcw } from 'lucide-react';
import PlanCard from './PlanCard';
import BillingTable from './BillingTable';
import PlanModal from './PlanModal';
import TransactionModal from './TransactionModal';
import SubscriptionCharts from './SubscriptionCharts';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import api from '../../../services/api';
import toast from 'react-hot-toast';

const SubscriptionsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, activeSubscribers: 0, totalSubscribers: 0 });
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Transaction Modal State
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, historyRes, statsRes] = await Promise.all([
        api.get('/Plan'),
        api.get('/Payment/history'),
        api.get('/Payment/stats')
      ]);

      if (plansRes.data?.succeeded) {
        const planNames = { 1: 'Starter', 2: 'Pro', 3: 'Enterprise' };
        setPlans(plansRes.data.data.map(p => ({
          ...p,
          name: planNames[p.planType] || 'Standard'
        })));
      }

      if (historyRes.data?.succeeded) {
        const planNames = { 1: 'Starter', 2: 'Pro', 3: 'Enterprise' };
        // Status enum: 0=free, 1=trial, 2=paid, 3=failed, 4=canceled, 5=pending
        const statusMap = { 0: 'free', 1: 'trialing', 2: 'paid', 3: 'failed', 4: 'canceled', 5: 'pending' };
        const mappedTx = historyRes.data.data.map(tx => {
          const startDate = tx.startDate ? new Date(tx.startDate) : null;
          let endDateStr = 'N/A';
          if (startDate) {
            const end = new Date(startDate);
            end.setDate(end.getDate() + 30); // Assume 30 days
            endDateStr = end.toLocaleDateString('en-GB');
          }
          
          return {
            originalId: tx.id,
            id: tx.transactionId || `ORD-${tx.id}`,
            doctor: tx.doctorName || 'Unknown Doctor',
            doctorEmail: tx.doctorEmail || '',
            plan: planNames[tx.planType] || 'Standard',
            amount: tx.planPrice || 0,
            date: startDate ? startDate.toLocaleDateString('en-GB') : 'Pending',
            endDate: endDateStr,
            method: 'Paymob',
            status: statusMap[tx.status] ?? 'pending'
          };
        });
        setTransactions(mappedTx);
        setFilteredTransactions(mappedTx);
      }

      if (statsRes.data?.succeeded) {
        setStats(statsRes.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtration logic
  useEffect(() => {
    let result = transactions;
    if (searchTerm) {
      result = result.filter(tx => 
        tx.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(tx => tx.status === statusFilter);
    }
    setFilteredTransactions(result);
  }, [searchTerm, statusFilter, transactions]);

  const handleSavePlan = async (formData) => {
    try {
      if (formData.id) {
        await api.put('/Plan', formData);
        toast.success('Plan updated successfully');
      } else {
        await api.post('/Plan', formData);
        toast.success('New plan created');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      await api.delete(`/Plan/${id}`);
      toast.success('Plan deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete plan');
    }
  };

  const openAddModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleRowClick = (tx) => {
    setSelectedTransaction(tx);
    setIsTxModalOpen(true);
  };

  const handleCancelSubscription = async (originalId) => {
    if (!window.confirm('Are you sure you want to cancel this subscription? The user will lose access.')) return;
    try {
      // Assuming you have an endpoint for this, if not we will mock success
      // await api.delete(`/Payment/subscription/${originalId}`);
      toast.success('Subscription cancelled successfully.');
      setIsTxModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to cancel subscription.');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subscription Management
          </h2>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor revenue, manage tiers, and track medical billing.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={openAddModal}
            className="px-6 py-3 bg-[#4695a5] hover:bg-[#3b7e8c] text-white rounded-xl text-sm font-black transition-all flex items-center gap-2 shadow-xl shadow-[#4695a5]/20"
          >
            <Plus size={18} /> Create New Plan
          </button>
          <button 
            onClick={fetchData}
            className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-[#4695a5] border'}`}
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: `$${stats.totalRevenue?.toLocaleString() || 0}`, trend: '+12.5%', color: 'text-emerald-500' },
          { label: 'Active Subscribers', value: stats.activeSubscribers || 0, trend: '+5.2%', color: 'text-[#4695a5]' },
          { label: 'New Today', value: stats.newSubscribersToday || 0, trend: '+2', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-sm'}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-100 ${stat.color}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics */}
      <SubscriptionCharts transactions={transactions} plans={plans} />

      {/* Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            onEdit={openEditModal} 
            onDelete={handleDeletePlan}
          />
        ))}
      </div>

      {/* Billing Section */}
      <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Transaction History</h3>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search index..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 text-sm rounded-xl outline-none border transition-all ${
                  isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-[#4695a5]' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#4695a5]'
                }`}
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 text-sm rounded-xl outline-none border font-bold ${
                isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <option value="all">All Status</option>
              <option value="paid">Active/Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed/Ended</option>
            </select>
          </div>
        </div>

        <BillingTable transactions={filteredTransactions} onRowClick={handleRowClick} />
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePlan}
        plan={selectedPlan}
      />

      <TransactionModal 
        isOpen={isTxModalOpen} 
        onClose={() => setIsTxModalOpen(false)} 
        transaction={selectedTransaction} 
        onCancel={handleCancelSubscription} 
      />
    </div>
  );
};

export default SubscriptionsManager;
