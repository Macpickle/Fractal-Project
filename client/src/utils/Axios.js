import axios from 'axios';

// Axios interceptor to add token to request headers, if token exists
// this will be added to each request, will change depending on how we handle auth logic
axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);
  
// Axios request function, takes in an object with url, method, and data
function AxiosRequest({ url, method = "get", data = {} }) {
    return axios({
      method: method,
      url: `http://localhost:8000${url}`,
      data: data,
    });
  }
  
export default AxiosRequest;
  