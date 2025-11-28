import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, Trash2, Reply, Archive } from 'lucide-react';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      subject: 'Question about subscription upgrade',
      message: 'I would like to upgrade my plan to Pro. What are the steps?',
      date: '2024-11-27 10:30',
      read: false
    },
    {
      id: 2,
      name: 'Dr. Sarah Mohamed',
      email: 'sarah.m@email.com',
      subject: 'AI diagnosis accuracy concern',
      message: 'I noticed some inconsistency in the AI results. Can we discuss this?',
      date: '2024-11-26 15:45',
      read: true
    },
    {
      id: 3,
      name: 'Dr. Khaled Ali',
      email: 'khaled.ali@email.com',
      subject: 'Feature request',
      message: 'It would be great to have bulk upload functionality for multiple scans.',
      date: '2024-11-25 09:20',
      read: true
    }
  ]);

  const unreadCount = messages.filter(m => !m.read).length;

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
          Messages Inbox
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9375rem' }}>
          {unreadCount} unread messages
        </p>
      </motion.div>

      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">All Messages ({messages.length})</h3>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <motion.tr
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: !msg.read ? 'rgba(70, 149, 165, 0.05)' : 'transparent'
                }}
              >
                <td>
                  <div>
                    <div style={{ 
                      fontWeight: msg.read ? '500' : '700',
                      marginBottom: '0.125rem'
                    }}>
                      {msg.name}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                      {msg.email}
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: msg.read ? '400' : '600' }}>
                  {msg.subject}
                </td>
                <td style={{ 
                  maxWidth: '300px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'var(--admin-text-muted)'
                }}>
                  {msg.message}
                </td>
                <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
                  {msg.date}
                </td>
                <td>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    background: msg.read ? 'rgba(148, 163, 184, 0.1)' : 'rgba(70, 149, 165, 0.1)',
                    color: msg.read ? 'var(--admin-text-muted)' : 'var(--admin-primary)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {msg.read ? 'Read' : 'Unread'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn-secondary btn-sm"
                      style={{ padding: '0.5rem', minWidth: 'auto' }}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-secondary btn-sm"
                      style={{ padding: '0.5rem', minWidth: 'auto' }}
                      title="Reply"
                    >
                      <Reply size={16} />
                    </button>
                    <button
                      className="btn-secondary btn-sm"
                      style={{ padding: '0.5rem', minWidth: 'auto' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MessagesInbox;
