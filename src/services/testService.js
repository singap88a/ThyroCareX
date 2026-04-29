import api from './api';

const testService = {
  // Run XGBoost clinical assessment + agentic routing
  processClinical: async (clinicalData) => {
    // clinicalData must match ClinicalRequest snake_case JSON property names
    const response = await api.post('/TestsWithAI/ProcessClinical', clinicalData);
    return response.data; // { succeeded, data: { testId, status, clinical: {...} } }
  },

  // Run ONNX ultrasound segmentation + TI-RADS classification
  processImage: async (testId, imageFile) => {
    const formData = new FormData();
    formData.append('TestId', testId);
    formData.append('UltraSoundImage', imageFile);
    const response = await api.post('/TestsWithAI/ProcessImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // { succeeded, data: { status, classification, images, ... } }
  },

  // Get test history for a specific patient
  getPatientTestHistory: async (patientId) => {
    const response = await api.get(`/TestsWithAI/GetPatientTestHistory/${patientId}`);
    return response.data; // { succeeded, data: [ { id, diagnosisResult: {...}, createdAt, ... } ] }
  },
};

export default testService;
