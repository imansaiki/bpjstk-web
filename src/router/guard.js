const isAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    if (
      to.name === "Login" ||
      to.name === "Register" ||
      to.name === "ResendEmail"
    ) {
      console.log(
        "authorization route: authenticated, Login / Register only for unauthenticated"
      );
      next({
        name: "LandingPage",
      });
    } else {
      console.log("authorization route: authenticated, route allowed");
      next();
    }
  } else {
    if (
      to.name === "Login" ||
      to.name === "LandingPage" ||
      to.name === "Register" ||
      to.name === "ResendEmail"
    ) {
      console.log("authorization route: not authenticated, route allowed");
      next();
    } else {
      console.log("authorization route: not authenticated, route not allowed");
      next({
        name: "LandingPage",
      });
    }
  }
};
const isAdmin = (to, from, next) => {
  if (localStorage.getItem("role")=="ROLE_ADMIN") {
    console.log("authorization route: role match, route allowed");
    next();
  } else {
    console.log("authorization route: role does not match, only admin allowed");
    next({
      name: "LandingPage",
    });
  }
};
export default {
  isAuthenticated,
  isAdmin,
};