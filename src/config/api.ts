import { AxiosError } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000' 

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    return {
      message: (typeof error.response.data === 'object' && error.response.data && 'message' in error.response.data) 
        ? String(error.response.data.message) 
        : 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    return {
      message: 'No response from server',
      status: 503
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500
  };
}; 