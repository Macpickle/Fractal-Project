import axios from 'axios';

const ROOT_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  
// Axios request function, takes in an object with url, method, and data
function AxiosRequest({ url, method = "get", data = {} }) {
    return axios({
      method: method,
      url: `${ROOT_URL}${url}`,
      data: data,
    });
  }
  
export default AxiosRequest;
  