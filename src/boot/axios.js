import Vue from 'vue'
import Axios from 'axios'

Vue.prototype.$axios = Axios

//LOCAL
//const Api = Axios.create({ baseURL: 'http://localhost:8081' })
//HEROKU
const Api = Axios.create({ baseURL: 'https://bpjstkbe.herokuapp.com' })

Api.interceptors.request.use(
  (config) => {
    //console.log(`Request interceptor : request intercepted`);
    //console.log(`Request interceptor : requested url => ${config.url}`);
    if(localStorage.getItem("token")){
        config.headers.common["Authorization"]="Basic "+localStorage.getItem("token")
    }
    

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//axios interceptor for response, logout if err status 401
 Api.interceptors.response.use( (response) => {
   //console.log("response interceptor: Authorized response")
  //console.log(response)
   return response.data;
 },(error) => {
   //console.log(response)
    //console.log(error.response)
    return Promise.reject({code:error.response.status,message:error.response.data.message,data:error.response.data});
 });

Vue.prototype.$api = Api
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { Axios, Api }