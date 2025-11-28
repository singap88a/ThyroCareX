import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin token/user
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        setAdminUser(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Failed to parse stored admin user', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login for now - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@thyrocarex.com' && password === 'admin123') {
          const user = {
            id: '1',
            name: 'Super Admin',
            email: 'admin@thyrocarex.com',
            role: 'Super Admin', // Super Admin, Support, Finance Admin
            avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=3b82f6&color=fff'
          };
          setAdminUser(user);
          localStorage.setItem('adminUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    adminUser,
    login,
    logout,
    loading,
    isAuthenticated: !!adminUser
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
