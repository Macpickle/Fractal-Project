import axios from 'axios';
const URL = "http://localhost:8000";

// intercepts each api call with a header, this is for authentication
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {config.headers.Authorization = token}
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
      url: URL + url,
      data: data,
    });
}

export default AxiosRequest;