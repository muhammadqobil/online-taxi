import { piniaState } from "src/stores/piniaState";
import { piniaActions } from "src/stores/piniaActions";
const {setLoading, setPath, setCurrentRouteName, setCurrentRouteCategoryName} = piniaActions()

export default ({ app, router, store, Vue }) => {
  router.beforeResolve((to, from, next) => {
    setLoading(true);
    next();
  });

  router.beforeEach((to, from, next) => {
    setLoading(true);

    if (piniaState().user === null) {
      if (to.path === "/login") {
        next();
        return;
      } else {
        setPath(to.path);
        next("/login");
        return;
      }
    }else if (to.fullPath === "/home" && piniaState().user) {
      next();
      return;
    }else if (to.fullPath === "/" && piniaState().user) {
      router.replace({ path: "/home" });
    }else if (to.path === "/login" && piniaState().user) {
      router.replace({ path: "/home" });
    } else {
      next();
    }
    // if (to.fullPath === "/home" && user) {
    //   next();
    //   return;
    // }
    // if (to.fullPath === "/" && user) {
    //   router.replace({ path: "/home" });
    // } else {
    //   next();
    // }

    // if (!to.meta) {
    //   alert(1)
    //   next();
    //   return;
    // }
    // if (!to.meta.action_id) {
    //   next();
    //   return;
    // }
  });

  router.afterEach((to, from) => {
    setCurrentRouteName(to.name ? to.name : "");
    setCurrentRouteCategoryName(
      to.matched[0] ? to.matched[0].name : ""
    );
    setTimeout(() => {
      setLoading(false);
    }, 0);
  });
  // router.onReady(() => {
  //   piniaActions().setLoading(true);
  // });
};
