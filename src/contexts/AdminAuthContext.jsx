import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const { user, login: contextLogin, logout: contextLogout, loading: authLoading } = useAuth();
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (user && user.role === 'Admin') {
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    }
  }, [user, authLoading]);

  const login = async (email, password) => {
    const result = await contextLogin(email, password);
    if (result.success && result.role === 'Admin') {
       return { success: true };
    } else if (result.success && result.role !== 'Admin') {
       // Logged in but not admin
       contextLogout();
       return { success: false, message: 'Access Denied: Admin privileges required.' };
    } else {
       return { success: false, message: result.message };
    }
  };

  const logout = () => {
    contextLogout();
    setAdminUser(null);
  };

  const value = {
    adminUser,
    login,
    logout,
    loading: loading || authLoading,
    isAuthenticated: !!adminUser
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
