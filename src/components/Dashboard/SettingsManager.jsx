import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Mail, CreditCard, Cpu } from 'lucide-react';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteName: 'ThyroCareX',
    siteEmail: 'admin@thyrocarex.com',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@thyrocarex.com',
    stripeKey: 'pk_test_...',
    aiModelVersion: 'v2.1.0',
    aiThreshold: '0.85'
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
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
          System Settings
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9375rem' }}>
          Configure system-wide settings and integrations
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gap: '1.5rem'
      }}>
        {/* General Settings */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="chart-card-header">
            <h3 className="chart-card-title">General Settings</h3>
          </div>
          <div style={{ padding: '1.5rem', display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Site Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({...settings, siteEmail: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Logo
              </label>
              <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={16} />
                Upload New Logo
              </button>
            </div>
          </div>
        </motion.div>

        {/* SMTP Settings */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="chart-card-header">
            <h3 className="chart-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={20} />
              SMTP Configuration
            </h3>
          </div>
          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                SMTP Host
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                SMTP Port
              </label>
              <input
                type="text"
                value={settings.smtpPort}
                onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                SMTP Username
              </label>
              <input
                type="text"
                value={settings.smtpUser}
                onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Payment Settings */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="chart-card-header">
            <h3 className="chart-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} />
              Payment Gateway
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Stripe Publishable Key
              </label>
              <input
                type="text"
                value={settings.stripeKey}
                onChange={(e) => setSettings({...settings, stripeKey: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* AI Model Settings */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-card-header">
            <h3 className="chart-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} />
              AI Model Configuration
            </h3>
          </div>
          <div style={{ padding: '1.5rem', display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Model Version
              </label>
              <input
                type="text"
                value={settings.aiModelVersion}
                onChange={(e) => setSettings({...settings, aiModelVersion: e.target.value})}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text-muted)',
                  fontSize: '0.9375rem',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Confidence Threshold
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.aiThreshold}
                onChange={(e) => setSettings({...settings, aiThreshold: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.9375rem'
                }}
              />
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.8125rem',
                color: 'var(--admin-text-muted)'
              }}>
                Minimum confidence score for AI predictions (0.0 - 1.0)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className="btn btn-primary"
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              fontSize: '1rem'
            }}
          >
            <Save size={20} />
            Save All Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsManager;
