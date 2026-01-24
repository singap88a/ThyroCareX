import api from './api';

const adminService = {
  // Get Pending Doctors
  getPendingDoctors: async () => {
    const response = await api.get('/AdminDoctor/Pending');
    return response.data;
  },

  // Approve Doctor
  approveDoctor: async (id) => {
    const response = await api.put(`/AdminDoctor/Approve/${id}`);
    return response.data;
  },

  // Reject Doctor
  rejectDoctor: async (id) => {
    const response = await api.put(`/AdminDoctor/Reject/${id}`);
    return response.data;
  },

  // Get All Doctors
  getAllDoctors: async () => {
    const response = await api.get('/AdminDoctor/DisplayAllDoctors');
    return response.data;
  },

  // Get Doctor by ID
  getDoctorById: async (id) => {
    const response = await api.get(`/AdminDoctor/${id}`);
    return response.data;
  },

  // Delete Doctor
  deleteDoctor: async (id) => {
    const response = await api.delete(`/AdminDoctor/DeleteDoctor/${id}`);
    return response.data;
  },
};

export default adminService;
