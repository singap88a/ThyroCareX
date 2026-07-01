import api from './api';
import { BASE_URL } from '../config.js';

const aiService = {
  // Send a message to the AI Agent for a specific patient session
  agentChat: async (sessionId, userMessage, patientId) => {
    const response = await api.post('/AiChat/AgentChat', {
      session_id: sessionId,
      user_message: userMessage,
      patient_id: patientId
    });
    return response.data; // { status, query, response, tools_used }
  },

  getPatientSessions: async (patientId) => {
    try {
      const response = await api.get(`/AiChat/Sessions/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get patient sessions:', error);
      throw error;
    }
  },

  getSessionMessages: async (sessionId) => {
    try {
      const response = await api.get(`/AiChat/Messages/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get session messages:', error);
      throw error;
    }
  },

  getGeneralSessions: async () => {
    try {
      const response = await api.get('/AiChat/GeneralSessions');
      return response.data;
    } catch (error) {
      console.error('Failed to get general sessions:', error);
      throw error;
    }
  },

  getGeneralSessionMessages: async (sessionId) => {
    try {
      const response = await api.get(`/AiChat/GeneralMessages/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get general session messages:', error);
      throw error;
    }
  },

  // Stream a chat message to the general AI chat
  chatStream: async (userMessage, sessionId, signal, onChunk, onError, onComplete) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || `${BASE_URL}/api`;
      
      let token = '';
      const userStr = localStorage.getItem('thyrax_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          token = user.token || '';
        } catch (e) {}
      }

      const response = await fetch(`${API_URL}/AiChat/Chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_message: userMessage,
          session_id: sessionId
        }),
        signal: signal
      });

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              break;
            }
            if (dataStr) {
              try {
                const data = JSON.parse(dataStr);
                if (data.token) {
                  onChunk(data.token);
                } else if (data.status === 'error') {
                  throw new Error(data.message);
                }
              } catch (e) {
                // ignore JSON parse error for incomplete chunks or actual errors
                if (e.message && e.message !== 'Unexpected end of JSON input') {
                   throw e;
                }
              }
            }
          }
        }
      }
      onComplete();
    } catch (err) {
      onError(err);
    }
  }
};

export default aiService;
