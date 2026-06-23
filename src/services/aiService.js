import { BASE_URL } from '../config.js';

const API_URL = import.meta.env.VITE_API_URL || `${BASE_URL}/api`;

const aiService = {
  chatStream: async (query, sessionId, signal, onChunk, onError, onComplete) => {
    try {
      const user = localStorage.getItem('thyrax_user');
      let token = '';
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed.token) token = parsed.token;
      }

      const response = await fetch(`${API_URL}/AiChat/Chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ user_message: query, session_id: sessionId }),
        signal: signal
      });

      if (!response.ok) {
        if (response.status === 403) throw new Error("403");
        if (response.status === 401) throw new Error("401");
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      // We might receive chunks that are split in the middle of a JSON string.
      // So we accumulate the buffer and split by newlines.
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // The last element is either empty string (if ends with \n) or incomplete line
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data:')) {
            try {
              const dataStr = trimmed.substring(5).trim();
              if (dataStr) {
                const dataObj = JSON.parse(dataStr);
                if (dataObj.status === 'streaming') {
                  onChunk(dataObj.chunk);
                } else if (dataObj.status === 'success') {
                  // Complete
                } else if (dataObj.status === 'error') {
                  onError(new Error(dataObj.message || 'AI Error'));
                }
              }
            } catch (e) {
              console.warn('Failed to parse SSE line:', trimmed, e);
            }
          }
        }
      }
      onComplete();
    } catch (error) {
      onError(error);
    }
  }
};

export default aiService;
