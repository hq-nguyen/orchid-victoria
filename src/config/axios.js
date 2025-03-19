import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_URL 
// || 'https://67bc0cf4ed4861e07b38fca1.mockapi.io/';

const fetchData = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

export default fetchData;