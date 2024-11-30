import { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL && process.env.NODE_ENV === 'production') {
  console.error('NEXT_PUBLIC_API_BASE_URL is not defined in production environment');
}

export { API_BASE_URL };

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    
    if (status === 404) {
      return {
        message: 'The requested resource was not found',
        status
      };
    }
    
    if (status === 503) {
      return {
        message: 'Service temporarily unavailable',
        status
      };
    }

    return {
      message: (typeof error.response.data === 'object' && error.response.data && 'message' in error.response.data) 
        ? String(error.response.data.message) 
        : 'An error occurred while processing your request',
      status
    };
  }
  
  if (error.request) {
    return {
      message: 'Unable to connect to the server',
      status: 503
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    status: 500
  };
}; 