import store from "../store/index";
export const isAuthenticated = (to, from, next) => {

  if (store.getters.isAuthenticated) {
    if (
      to.name === "LoginPage"
    ) {
      console.log(
        "authorization route: authenticated, Login / Register only for unauthenticated"
      );
      next({
        name: "PerusahaanPage",
      });
    } else {
      console.log("authorization route: authenticated, route allowed");
      next();
    }
  } else {
    if (
      to.name === "LoginPage"
    ) {
      console.log("authorization route: not authenticated, route allowed");
      next();
    } else {
      console.log("authorization route: not authenticated, route not allowed");
      next({
        name: "LoginPage",
      });
    }
  }
};
export const isAdmin = (to, from, next) => {
  if (store.getters.isAdmin && store.getters.isAuthenticated) {
    console.log("authorization route: role match, route allowed");
    next();
  } else {
    console.log("authorization route: role does not match, only admin allowed");
    next({
      name: "LandingPage",
    });
  }
};