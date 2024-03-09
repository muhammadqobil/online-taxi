import * as modulesCategories from 'src/router/categories'

import { defineStore } from "pinia";
import { piniaState } from "src/stores/piniaState";

export const piniaGetters = defineStore("piniaGetters", {
  getters: {
    getBaseLeftDrawer() {
      return piniaState().baseLeftDrawer;
    },
    getBaseRightDrawer() {
      return piniaState().baseRightDrawer;
    },
    getCurLocale() {
      return piniaState().curLocale;
    },
    getLocaleByCode(code) {
      return piniaState().appLocales.find((locale) => locale.code === code);
    },
    getCurrentRouteName() {
      return piniaState().currentRouteName;
    },
    getUserCategories() {
      const modulesCategoriesArr = Object.keys(modulesCategories).map(key => {
        let deepCloneMC = JSON.parse(JSON.stringify(modulesCategories[key]));

        return deepCloneMC;
      });
      // if(piniaState().user.roles[0].name === 'ROLE_SUPER_ADMIN' || piniaState().user.roles[0].name === 'ROLE_ADMIN'){
      //   return modulesCategoriesArr
      // }else {
      // }
      return modulesCategoriesArr
    },
    // getRoutes() {
    //
    //   const modulesCategoriesArr = JSON.parse(JSON.stringify(Object.values(routes_main)));
    //
    //   const categoriesFilteredArr = modulesCategoriesArr.filter(
    //     (e) =>
    //       (e.children &&
    //         e.children.filter(
    //           (el1) =>
    //             // state.userActions.some(
    //             //   (ua) =>
    //             //     ua.app_actions_id === el1.meta.action_id && ua.access_state === 1
    //             // )
    //             true
    //         ).length > 0) ||
    //       e.meta.is_q_item
    //   );
    //
    //   return categoriesFilteredArr;
    // },
    // getColorsInx() {
    //   return piniaState().colorsInx;
    // },
    getUser() {
      return piniaState().user;
    },
    getCurrentRouteCategoryName() {
      return piniaState().currentRouteCategoryName;
    },
    getPath(){
      return piniaState().path;
    },
    // getIsDarkMode() {
    //   return piniaState().isDarkMode;
    // },

    // getLastCategoryId() {
    //   return piniaState().last_category_id;
    // },
    isHaveError() {
      return !!piniaState().globalError && piniaState().globalError.type != "warning";
    },
    getGlobalError() {
      return piniaState().globalError;
    }
  },
});
