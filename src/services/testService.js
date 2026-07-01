import api from './api';

const testService = {
  // Run XGBoost clinical assessment + agentic routing
  processClinical: async (clinicalData) => {
    // clinicalData must match ClinicalRequest snake_case JSON property names
    const response = await api.post('/TestsWithAI/ProcessClinical', clinicalData);
    return response.data; // { succeeded, data: { testId, status, clinical: {...} } }
  },

  // Run ONNX ultrasound segmentation + TI-RADS classification
  processImage: async (testId, imageFile, sessionId) => {
    const formData = new FormData();
    formData.append('TestId', testId);
    if (sessionId) formData.append('SessionId', sessionId);
    if (Array.isArray(imageFile)) {
      imageFile.forEach(file => formData.append('UltraSoundImages', file));
    } else {
      formData.append('UltraSoundImages', imageFile);
    }
    const response = await api.post('/TestsWithAI/ProcessImage', formData);
    return response.data; // { succeeded, data: { status, classification, images, ... } }
  },

  // Run FNAC Bethesda Cytopathology classification
  processFnac: async (testId, imageFile, sessionId) => {
    const formData = new FormData();
    formData.append('TestId', testId);
    if (sessionId) formData.append('SessionId', sessionId);
    if (Array.isArray(imageFile)) {
      imageFile.forEach(file => formData.append('FnacImages', file));
    } else {
      formData.append('FnacImages', imageFile);
    }
    const response = await api.post('/TestsWithAI/ProcessFnac', formData);
    return response.data; // { succeeded, data: [{ bethesda_category, ... }] }
  },

  // Get test history for a specific patient
  getPatientTestHistory: async (patientId) => {
    const response = await api.get(`/TestsWithAI/GetPatientTestHistory/${patientId}`);
    return response.data; // { succeeded, data: [ { id, diagnosisResult: {...}, createdAt, ... } ] }
  },

  // Validate ultrasound image immediately
  validateImage: async (imageFiles) => {
    const formData = new FormData();
    if (Array.isArray(imageFiles)) {
      imageFiles.forEach(file => formData.append('ImageFiles', file));
    } else {
      formData.append('ImageFiles', imageFiles);
    }
    const response = await api.post('/TestsWithAI/ValidateImage', formData);
    return response.data; // { succeeded, data: [{ filename, is_ultrasound, confidence, reason, status }], message: string }
  },
  // Compare two diagnostic tests
  compareTests: async (testId1, testId2) => {
    const response = await api.get(`/TestsWithAI/CompareTests/${testId1}/${testId2}`);
    return response.data; // { succeeded, data: { before: {...}, after: {...}, summary: {...} } }
  },
};

export default testService;
