import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'http://localhost:8081' })

api.interceptors.request.use(
  (config) => {
    console.log(`Request interceptor : request intercepted`);
    console.log(`Request interceptor : requested url => ${config.url}`);
    if(localStorage.getItem("token")){
        config.headers.common["Authorization"]="Basic "+localStorage.getItem("token")
    }
    

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
Vue.prototype.$api = api
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api }