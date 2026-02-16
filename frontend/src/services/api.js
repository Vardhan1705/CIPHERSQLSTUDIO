// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 second timeout
// });

// // Handle response errors
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error('API Error:', error.message);
    
//     // If backend is not running, provide mock response
//     if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
//       console.warn('Backend not running, using mock data');
//       // We'll handle this in individual service functions
//       throw new Error('Backend connection failed');
//     }
    
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// export default api;
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000
});

export default api;