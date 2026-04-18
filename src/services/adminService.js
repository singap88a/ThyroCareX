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

  // Community Management
  getAllPosts: async () => {
    const response = await api.get('/Community/Display-All-Posts');
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/Community/post/${id}`);
    return response.data;
  },

  getPostComments: async (postId) => {
    const response = await api.get(`/Community/PostId:${postId}/comments`);
    return response.data;
  },

  deleteComment: async (commentId) => {
    const response = await api.delete('/Community/DeleteComment', {
      params: { CommentId: commentId }
    });
    return response.data;
  },

  // Contact Messages
  getContactMessages: async () => {
    const response = await api.get('/Contact/List');
    return response.data;
  },

  toggleContactStatus: async (id) => {
    const response = await api.put(`/Contact/ToggleStatus/${id}`);
    return response.data;
  },

  deleteContactMessage: async (id) => {
    const response = await api.delete(`/Contact/Delete/${id}`);
    return response.data;
  },
};

export default adminService;
