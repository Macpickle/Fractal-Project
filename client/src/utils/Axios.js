import axios from 'axios';


  
// Axios request function, takes in an object with url, method, and data
function AxiosRequest({ url, method = "get", data = {} }) {
    return axios({
      method: method,
      url: `http://localhost:8000${url}`,
      data: data,
    });
  }
  
export default AxiosRequest;
  