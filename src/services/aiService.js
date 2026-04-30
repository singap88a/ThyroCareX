import api from './api';

const aiService = {
  chat: async (query, sessionId, chatHistory = [], image = null) => {
    const formData = new FormData();
    formData.append('Query', query);
    formData.append('SessionId', sessionId);
    formData.append('ChatHistory', JSON.stringify(chatHistory));
    
    if (image) {
      formData.append('Image', image);
    }

    const response = await api.post('/AiChat/Chat', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Existing AI functions can be moved here or kept in testService
};

export default aiService;
