import api from './api';

const doctorService = {
  // Get Doctor Profile
  getProfile: async () => {
    const response = await api.get('/DoctorProfile/profile');
    return response.data;
  },

  // Update Doctor Profile
  updateProfile: async (formData) => {
    const response = await api.put('/DoctorProfile/Updateprofile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change Password
  changePassword: async (passwordData) => {
    // passwordData: { email, currentPassword, newPassword, confirmPassword }
    const response = await api.put('/ApplicationUser/ChangePassword', passwordData);
    return response.data;
  },
};

export default doctorService;
