import api from './api';

const patientService = {
  // Add a new patient — requires Doctor auth, sends as multipart/form-data
  addPatient: async (formData) => {
    const response = await api.post('/Patient/AddPatient', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // { succeeded, data: patientId, message }
  },

  // Get all patients belonging to a specific doctor
  getMyPatients: async (doctorId) => {
    const response = await api.get(`/Patient/DisplayPatientsByDoctor/${doctorId}`);
    return response.data; // { succeeded, data: [{ patientID, fullName, email, age, ... }] }
  },

  // Get a single patient by their ID
  getPatientById: async (id) => {
    const response = await api.get(`/Patient/DisplayPatientById/${id}`);
    return response.data; // { succeeded, data: { patientID, fullName, ... } }
  },

  // Update an existing patient's information
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/Patient/EditPatient/${id}`, patientData);
    return response.data; // { succeeded, message }
  },

  // Delete a patient and all their data
  deletePatient: async (id) => {
    const response = await api.delete(`/Patient/DeletePatient/${id}`);
    return response.data; // { succeeded, message }
  },
};

export default patientService;
