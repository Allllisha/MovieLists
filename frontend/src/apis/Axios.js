import axios from "axios";
export  const api = axios.create({
  baseURL: `${process.env.REACT_APP_TEST}`,
})

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    
    return error.messages;
  }
);





