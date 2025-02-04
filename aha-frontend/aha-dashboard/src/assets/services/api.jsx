// src/services/api.js
const API_BASE_URL = 'http://localhost:5001';

export const healthApi = {
  async submitHealthData(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async storeEncryptedData(encryptedData) {
    try {
      const response = await fetch(`${API_BASE_URL}/store-health-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encryptedData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Storage Error:', error);
      throw error;
    }
  }
};