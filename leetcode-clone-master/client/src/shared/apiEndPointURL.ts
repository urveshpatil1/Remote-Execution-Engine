const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API_URL = {
  baseUrl: baseURL || '',
  signIn: baseURL ? `${baseURL}/signin` : '',
  signUp: baseURL ? `${baseURL}/signup` : '',
  problemsList: baseURL ? `${baseURL}/problems` : '',
};
