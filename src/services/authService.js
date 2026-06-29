import api from './api';

const authService = {
  // Login for both Doctor and Admin
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    const response = await api.post('/Authentication/sign-in', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Register a new Doctor
  registerDoctor: async (formData) => {
    // formData should be a FormData object properly appended with fields and file
    const response = await api.post('/Authentication/register-doctor', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/Authentication/forgot-password', { email });
    return response.data;
  },

  verifyOTP: async (email, otp) => {
    const response = await api.post('/Authentication/verify-otp', { email, otp });
    return response.data;
  },

  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post('/Authentication/reset-password', { email, otp, newPassword });
    return response.data;
  },
};

export default authService;
