import axios from 'axios';
const API_URL =  import.meta.env.VITE_BASE_URL 
// || 'http://localhost:3000' 

// const fetchData = async (endpoint, options = {}) => {
//     try {
//       const response = await fetch(`${apiUrl}${endpoint}`, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers,
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   };

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const fetchData = async (endpoint, options = {}) => {
  try {
    let response;
    
    if (options.method === 'GET' || !options.method) {
      response = await api.get(endpoint);
    } else if (options.method === 'POST') {
      response = await api.post(endpoint, options.body ? JSON.parse(options.body) : {});
    } else if (options.method === 'PUT') {
      response = await api.put(endpoint, options.body ? JSON.parse(options.body) : {});
    } else if (options.method === 'DELETE') {
      response = await api.delete(endpoint);
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default fetchData;
