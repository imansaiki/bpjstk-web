export const setToken = (state,payload) => {
    state.token = payload;
    localStorage.setItem("token",payload)
}
export const setName = (state,payload) => {
    state.name = payload;
    localStorage.setItem("name",payload)
}
export const setUsername = (state,payload) => {
    state.username = payload;
    localStorage.setItem("username",payload)
}
export const setRole = (state,payload) => {
    state.role = payload;
    localStorage.setItem("role",payload)
}
export const setLoginTime = (state,payload) => {
    state.loginTime = payload;
    localStorage.setItem("loginTime",payload)
}
export const setLoginData = (state,payload) => {
    console.log(payload)
    state.token = payload.token;
    state.name = payload.name;
    state.username = payload.username;
    state.role = payload.role;
    state.loginTime = payload.loginTime;
    localStorage.setItem("token",payload.token)
    localStorage.setItem("name",payload.name)
    localStorage.setItem("username",payload.username)
    localStorage.setItem("role",payload.role)
    localStorage.setItem("loginTime",payload.loginTime)
    
}
export const resetAll = (state) => {
    state.token = null;
    state.name = null;
    state.username = null;
    state.role = null;
    state.loginTime = null;
    localStorage.clear()
    
}