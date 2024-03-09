
import { defineStore } from "pinia";
import { piniaState } from "src/stores/piniaState";

export const piniaActions = defineStore("piniaActions", {
  actions: {
    setBaseLeftDrawer(value) {
      piniaState().baseLeftDrawer = value;
    },
    setBaseRightDrawer(value) {
      piniaState().baseRightDrawer = value;
    },
    setUserLangCode(code) {
      // if(piniaState().user){
      //   return;
      // }
      piniaState().lang_code = code;
    },
    setLoading(val){
      piniaState().loading = val;
    },
    setPath(val){
      piniaState().path = val
    },
    setCurrentRouteName(val){
      piniaState().currentRouteName = val
    },
    setCurrentRouteCategoryName(val){
      piniaState().currentRouteCategoryName = val
    },
    incrementAjaxRequestsCnt () {
      piniaState().ajaxRequestsCnt++;
    },
    decrementAjaxRequestsCnt(){
      piniaState().ajaxRequestsCnt--;
    },
    resetAjaxRequestsCnt(){
      piniaState().ajaxRequestsCnt = 0
    },
    clearUserSession(){
      piniaState().user = null;
      piniaState().path = null;
    },
    setUser(val){
      piniaState().user = val
    },
    setUserAals (val){
      if (val){
        piniaState().userActions.splice(0 , piniaState().userActions.length , ...val)
      }
    },
    setGlobalError(val) {
      piniaState().globalError = val;
    }
  },
});
