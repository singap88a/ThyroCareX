import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CreditCard, Users, Plus, Edit } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import ChartCard from './ChartCard';

const SubscriptionsManager = () => {
  const plans = [
    { name: 'Free', price: 0, users: 159, color: '#94a3b8' },
    { name: 'Basic', price: 29, users: 45, color: '#10b981' },
    { name: 'Pro', price: 79, users: 28, color: '#f59e0b' },
    { name: 'Enterprise', price: 199, users: 12, color: '#ef4444' }
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 15200, 18900, 22100, 25800, 29400],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { 
          color: '#94a3b8',
          callback: (value) => '$' + value.toLocaleString()
        }
      }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--admin-text)',
          marginBottom: '0.5rem'
        }}>
          Subscriptions & Billing
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9375rem' }}>
          Manage subscription plans and revenue
        </p>
      </motion.div>

      {/* Revenue Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Monthly Revenue', value: '$29,400', trend: '+18%', icon: DollarSign },
          { label: 'Active Subscriptions', value: '244', trend: '+12%', icon: Users },
          { label: 'Avg. Revenue/User', value: '$120', trend: '+5%', icon: TrendingUp },
          { label: 'Payment Success', value: '99.2%', trend: '+0.3%', icon: CreditCard }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: 'var(--admin-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--admin-border)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--admin-success), #34d399)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <stat.icon size={24} />
              </div>
              <span style={{
                padding: '0.25rem 0.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--admin-success)',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                height: 'fit-content'
              }}>
                {stat.trend}
              </span>
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: 'var(--admin-text)',
              marginBottom: '0.25rem'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--admin-text-muted)'
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <ChartCard title="Revenue Trend (Last 6 Months)">
        <Line data={revenueData} options={chartOptions} />
      </ChartCard>

      {/* Plans Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--admin-text)'
          }}>
            Subscription Plans
          </h2>
          <button className="btn btn-primary btn-sm">
            <Plus size={16} />
            Add Plan
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                background: 'var(--admin-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--admin-border)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: plan.color
              }} />

              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--admin-text)',
                marginBottom: '0.5rem'
              }}>
                {plan.name}
              </div>

              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--admin-text)',
                marginBottom: '0.25rem'
              }}>
                ${plan.price}
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: 'var(--admin-text-muted)'
                }}>
                  /month
                </span>
              </div>

              <div style={{
                fontSize: '0.875rem',
                color: 'var(--admin-text-muted)',
                marginBottom: '1.5rem'
              }}>
                {plan.users} active users
              </div>

              <button className="btn btn-secondary" style={{ width: '100%' }}>
                <Edit size={16} />
                Edit Plan
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionsManager;
