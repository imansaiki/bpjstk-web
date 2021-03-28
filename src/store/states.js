export default function () {
  return {
    token:localStorage.getItem("token") || null,
    username:localStorage.getItem("username")||null,
    role:localStorage.getItem("role")|| null,
    loginTime:localStorage.getItem("loginTime")||null,
    name:localStorage.getItem("name")||null
  }
}