import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

const CreditsManager = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      totalCredits: 5,
      usedCredits: 3,
      remainingCredits: 2,
      subscription: 'Free'
    },
    {
      id: 2,
      name: 'Dr. Sarah Mohamed',
      email: 'sarah.m@email.com',
      totalCredits: 50,
      usedCredits: 12,
      remainingCredits: 38,
      subscription: 'Basic'
    },
    {
      id: 3,
      name: 'Dr. Khaled Ali',
      email: 'khaled.ali@email.com',
      totalCredits: 200,
      usedCredits: 145,
      remainingCredits: 55,
      subscription: 'Pro'
    }
  ];

  const handleResetCredits = (doctorId) => {
    if (window.confirm('Are you sure you want to reset credits for this doctor?')) {
      console.log('Resetting credits for doctor:', doctorId);
      // API call here
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
          Credits Management
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9375rem' }}>
          Monitor and manage doctor diagnosis credits
        </p>
      </motion.div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Credits Issued', value: '255', icon: Coins, color: 'var(--admin-primary)' },
          { label: 'Credits Used', value: '160', icon: TrendingUp, color: 'var(--admin-success)' },
          { label: 'Credits Remaining', value: '95', icon: Coins, color: 'var(--admin-warning)' },
          { label: 'Near Limit', value: '8', icon: AlertTriangle, color: 'var(--admin-danger)' }
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
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: `${stat.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stat.color
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'var(--admin-text)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--admin-text-muted)'
              }}>
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Doctors Table */}
      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">Doctor Credits</h3>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Subscription</th>
              <th>Total Credits</th>
              <th>Used</th>
              <th>Remaining</th>
              <th>Usage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              const usagePercent = (doctor.usedCredits / doctor.totalCredits) * 100;
              return (
                <motion.tr
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.125rem' }}>
                        {doctor.name}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                        {doctor.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      padding: '0.375rem 0.75rem',
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: 'var(--admin-secondary)',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {doctor.subscription}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600' }}>{doctor.totalCredits}</td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{doctor.usedCredits}</td>
                  <td>
                    <span style={{
                      color: doctor.remainingCredits < 5 ? 'var(--admin-danger)' :
                             doctor.remainingCredits < 20 ? 'var(--admin-warning)' :
                             'var(--admin-success)',
                      fontWeight: '600'
                    }}>
                      {doctor.remainingCredits}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        flex: 1,
                        height: '8px',
                        background: 'var(--admin-dark-lighter)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        maxWidth: '120px'
                      }}>
                        <div style={{
                          width: `${usagePercent}%`,
                          height: '100%',
                          background: usagePercent > 80 ? 'var(--admin-danger)' :
                                     usagePercent > 60 ? 'var(--admin-warning)' :
                                     'var(--admin-success)',
                          borderRadius: '4px',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', minWidth: '45px' }}>
                        {Math.round(usagePercent)}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleResetCredits(doctor.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <RefreshCw size={14} />
                      Reset
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default CreditsManager;
