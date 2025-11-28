import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';

const AILogsViewer = () => {
  const [filter, setFilter] = useState('all');

  const logs = [
    {
      id: 1,
      timestamp: '2024-11-27 14:32:15',
      doctor: 'Dr. Ahmed Hassan',
      imageType: 'Ultrasound',
      result: 'Thyroid Nodule Detected',
      confidence: 94.5,
      processingTime: '2.3s',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-11-27 14:28:42',
      doctor: 'Dr. Sarah Mohamed',
      imageType: 'CT Scan',
      result: 'Normal',
      confidence: 98.2,
      processingTime: '1.8s',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-11-27 14:15:33',
      doctor: 'Dr. Khaled Ali',
      imageType: 'MRI',
      result: 'Error: Image quality too low',
      confidence: 0,
      processingTime: '0.5s',
      status: 'error'
    },
    {
      id: 4,
      timestamp: '2024-11-27 13:45:12',
      doctor: 'Dr. Fatma Ibrahim',
      imageType: 'X-Ray',
      result: 'Suspicious - Manual Review Required',
      confidence: 76.8,
      processingTime: '3.1s',
      status: 'warning'
    }
  ];

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>
          AI Diagnosis Logs
        </h1>
        <p className="text-[15px]" style={{ color: 'var(--admin-text-muted)' }}>
          Monitor AI model performance and diagnosis history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Runs', value: '1,847', icon: Activity, color: '#4695a5' },
          { label: 'Success Rate', value: '98.5%', icon: CheckCircle, color: '#10b981' },
          { label: 'Avg Processing', value: '2.1s', icon: Clock, color: '#f59e0b' },
          { label: 'Errors Today', value: '3', icon: AlertCircle, color: '#ef4444' }
        ].map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 border rounded-2xl"
            style={{
              backgroundColor: 'var(--admin-card-bg)',
              borderColor: 'var(--admin-border)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <h3 className="data-table-title">Recent Logs ({filteredLogs.length})</h3>

          <div className="data-table-actions">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '0.625rem 1rem',
                background: 'var(--admin-dark-lighter)',
                border: '1px solid var(--admin-border)',
                borderRadius: '10px',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <table className="data-table">
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
              }}>Timestamp</th>
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
              }}>Image Type</th>
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
              }}>Result</th>
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
              }}>Confidence</th>
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
              }}>Processing Time</th>
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
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                  {log.timestamp}
                </td>
                <td style={{ color: 'var(--admin-text)' }}>{log.doctor}</td>
                <td>
                  <span className="px-3 py-1.5 rounded-lg text-sm" style={{
                    backgroundColor: 'var(--admin-dark-lighter)',
                    color: 'var(--admin-text)'
                  }}>
                    {log.imageType}
                  </span>
                </td>
                <td style={{ color: 'var(--admin-text)' }}>{log.result}</td>
                <td>
                  {log.confidence > 0 ? (
                    <span className="font-semibold" style={{
                      color: log.confidence > 90 ? '#10b981' :
                             log.confidence > 75 ? '#f59e0b' :
                             '#ef4444'
                    }}>
                      {log.confidence}%
                    </span>
                  ) : (
                    <span style={{ color: 'var(--admin-text-muted)' }}>N/A</span>
                  )}
                </td>
                <td style={{ color: 'var(--admin-text-muted)' }}>
                  {log.processingTime}
                </td>
                <td>
                  <span className="px-3 py-1.5 rounded-lg text-sm font-semibold capitalize" style={{
                    backgroundColor: log.status === 'success' ? '#10b98120' :
                                   log.status === 'warning' ? '#f59e0b20' :
                                   '#ef444420',
                    color: log.status === 'success' ? '#10b981' :
                           log.status === 'warning' ? '#f59e0b' :
                           '#ef4444'
                  }}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AILogsViewer;
