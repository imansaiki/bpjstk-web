export const getToken= (state) => {
    return state.token
}
export const getUsername= (state) => {
    return state.username
}
export const getRole= (state) => {
    return state.role
}
export const getLoginTime= (state) => {
    return state.LoginTime
}
export const getName= (state) => {
    return state.name
}
export const isAuthenticated= (state) => {
    return !!state.token
}
export const isAdmin= (state) => {
    return state.role=="ROLE_ADMIN"
}
