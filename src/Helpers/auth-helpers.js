import Axios from 'axios';
import store from 'redux/store'

const TOKEN_KEY = 'CORAFORM_TOKEN';
const BASE_URL = "http://localhost:8082/";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  let auth = JSON.parse(localStorage.getItem('persist:root'));
  console.log(auth)
  return localStorage.getItem(auth.token);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}


const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "Accept": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  }
})

axiosInstance.interceptors.request.use((config) => {
  const dataStorage = store.getState().auth
  let token =  dataStorage.token;
  token = token.replace(/['"]+/g, '')
  console.log(token, "token")
  if (token) {
    config.headers.Authorization = 'Bearer '+ token;
  }

  return config;
})

axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      deleteToken();
      window.location = '/';
    } else {
      return Promise.reject(error);
    }
  }
);

const axiosLogin = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "Accept": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  }
})

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function(config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = 'Bearer '+ token;
    }
  
    return config;
  });

  Axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = '/';
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export { axiosInstance, axiosLogin }