import api from './api';

const authService = {
  // Login for both Doctor and Admin
  login: async (email, password) => {
    const response = await api.post('/Authentication/sign-in', {
      Email: email,
      Password: password,
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
