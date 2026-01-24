import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { parseJwt } from '../utils/jwt';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('thyrocarex_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          // Check if token is expired (optional improvement)
           const decoded = parseJwt(userData.token);
           if (decoded && decoded.exp * 1000 > Date.now()) {
             // Map claims again similarly to login
             const mappedUser = {
                ...userData,
                ...decoded,
                id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                username: decoded['UserName'],
                email: decoded['Email'],
                role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                DoctorId: decoded['DoctorId'] 
             };
             setUser(mappedUser);
             setIsLoggedIn(true);
           } else {
             // Token expired
             logout();
           }
        } catch (error) {
          console.error("Auth check failed", error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      // Response data is the token string directly: "eyJ..." or object { data: "token" } depending on api.js wrapper.
      // Based on provided Curl response: { ..., data: "tokenString" }
      
      if (response && response.succeeded && response.data) {
        const token = response.data;
        const decoded = parseJwt(token);
        
        // Extract meaningful fields from claims
        // The claims might have long URL keys, so we map them
        const userData = {
          token,
          id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          username: decoded['UserName'],
          email: decoded['Email'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          ...decoded
        };

        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('thyrocarex_user', JSON.stringify({ token })); // Store minimal data
        return { success: true, role: userData.role };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
        console.error("Login error context", error);
        return { 
          success: false, 
          message: error.response?.data?.message || 'An error occurred during login' 
        };
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('thyrocarex_user');
    window.location.href = '/login'; // Force redirect
  };
  
  const register = async (formData) => {
      // Passthrough to service, but useful to have in context if we want to auto-login later
      return await authService.registerDoctor(formData);
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
