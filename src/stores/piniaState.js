import { defineStore } from "pinia";

export const piniaState = defineStore("piniaState", {
  state: () => {
    return {
      appLocales: [
        { name: "Русский", code: "ru" },
        { name: "Узбек", code: "uk" },
        { name: "O`zbek", code: "uz" },
        { name: "English", code: "en" },
      ],
      user: null ,
      baseLeftDrawer: true,
      baseRightDrawer: false,
      curLocale:'',
      lang_code:'uz',
      path: null,
      loading: true,
      currentRouteName: '',
      currentRouteCategoryName: '',
      ajaxRequestsCnt: 0,
      userActions:[],
      globalError:undefined
    };
  },
  persist: true
});

