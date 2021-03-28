import { Api } from 'boot/axios'
export const login = (context,payload) => {
    return new Promise((resolve, reject) => {
        console.log(`login in process`);
        //console.log(`my username is : ${payload.username}`);
        //console.log(`my password is : ${payload.password}`);
        Api
          .post("/user/signin",payload)
          .then((response) => {
            context.commit("setLoginData", response.data.data);
            console.log("Login Confirmed");
            resolve(response)
          })
          .catch((err) => {
            //dosomething
            console.log("login failed");
            context.commit("resetAll");
            reject(err);
          });
      });
}