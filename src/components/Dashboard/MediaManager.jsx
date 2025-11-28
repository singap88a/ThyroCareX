import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Image, File, Trash2, MoreVertical, Grid, List, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const MediaManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme } = useTheme();

  // Sample media files
  const files = [
    { id: 1, name: 'banner-main.jpg', type: 'image', size: '2.4 MB', date: '2024-11-20' },
    { id: 2, name: 'logo-white.png', type: 'image', size: '156 KB', date: '2024-11-18' },
    { id: 3, name: 'medical-report-template.pdf', type: 'document', size: '1.2 MB', date: '2024-11-15' },
    { id: 4, name: 'doctor-profile-placeholder.jpg', type: 'image', size: '450 KB', date: '2024-11-10' },
    { id: 5, name: 'terms-of-service.pdf', type: 'document', size: '890 KB', date: '2024-11-05' },
    { id: 6, name: 'hero-background.png', type: 'image', size: '3.1 MB', date: '2024-11-01' },
  ];

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              Media Library
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-[15px]">
              Manage your uploaded files and assets
            </p>
          </div>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#4695a5] hover:text-white dark:hover:bg-[#4695a5] transition-all duration-300 shadow-lg hover:shadow-xl"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="data-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="data-table-header">
          <h3 className="data-table-title">All Files ({filteredFiles.length})</h3>
          
          <div className="data-table-actions">
            <div style={{ position: 'relative', width: '300px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--admin-text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 1rem 0.625rem 2.75rem',
                  background: 'var(--admin-dark-lighter)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', background: 'var(--admin-dark-lighter)', borderRadius: '8px', padding: '2px' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  background: viewMode === 'grid' ? 'var(--admin-primary)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--admin-text-muted)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  background: viewMode === 'list' ? 'var(--admin-primary)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : 'var(--admin-text-muted)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <List size={18} />
              </button>
            </div>

            <button className="btn btn-primary btn-sm">
              <Upload size={16} />
              Upload
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    background: 'var(--admin-dark-lighter)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--admin-border)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    height: '140px', 
                    background: 'var(--admin-glass)', 
                    borderRadius: '8px', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--admin-text-muted)'
                  }}>
                    {file.type === 'image' ? <Image size={48} /> : <File size={48} />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: 'var(--admin-text)', 
                        marginBottom: '0.25rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                        {file.size} • {file.date}
                      </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'var(--admin-dark-lighter)', 
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--admin-primary)'
                        }}>
                          {file.type === 'image' ? <Image size={20} /> : <File size={20} />}
                        </div>
                        <span style={{ fontWeight: '500' }}>{file.name}</span>
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{file.type}</td>
                    <td style={{ color: 'var(--admin-text-muted)' }}>{file.size}</td>
                    <td style={{ color: 'var(--admin-text-muted)' }}>{file.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-secondary btn-sm" style={{ padding: '0.5rem' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MediaManager;
