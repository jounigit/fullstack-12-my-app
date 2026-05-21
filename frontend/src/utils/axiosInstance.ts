import axios, { AxiosError, type AxiosInstance} from 'axios';
import config from './config';
import toast from 'react-hot-toast';

const api: AxiosInstance = axios.create({
  baseURL: config.API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
}); 

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      const message =
        typeof (data as { message?: unknown })?.message === 'string'
          ? (data as { message?: string }).message
          : typeof (data as { error?: unknown })?.error === 'string'
            ? (data as { error?: string }).error
            : undefined;

      // Treat HTTP 400 as validation (even if `data.type` isn't present)
      if (status === 400) {
        console.error('Validation Error:', message || error.response.data);
        toast.error(
          'Validation Error: ' +
            (message || 'Please check your input and try again.')
        );
      }else if (status === 401) {
        toast.error('Unauthorized: Please log in to access this resource.');
      } else if (status === 403) {
        toast.error('Forbidden: You do not have permission to perform this action.');
      } else if (status === 404) {
        toast.error('Not Found: The requested resource could not be found.');
      } else if (status >= 500) {
        toast.error('Server Error: An unexpected error occurred. Please try again later.');
      } else {
        toast.error('Error: ' + (error.message || 'An error occurred. Please try again.'));
      }
    }else if (error.request) {
      toast.error('Network Error: Unable to reach the server. Please check your connection.');
    } else {
      toast.error('Error: ' + (error.message || 'An error occurred. Please try again.'));
    }

    return Promise.reject(error);
  }
);

export default api;