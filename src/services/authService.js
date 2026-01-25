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
};

export default authService;
