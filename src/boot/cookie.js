import {Cookies} from "quasar";
import {configs} from "src/utils/constants";


const $cookie = {
  setGnkToken: function (token) {
    Cookies.set("gnk_token", token);
  },
  getGnkToken: function () {
    return Cookies.get("gnk_token");
  },
  removeGnkToken: function () {
    return Cookies.remove("gnk_token");
  },
  setUserLogin: function (userLogin) {
    Cookies.set("user_name", userLogin);
  },
  getUserLogin: function () {
    return Cookies.get("user_name");
  },
  isHasUserLogin: function () {
    return Cookies.has('user_name');
  },

  clearUserLogin: function () {
    Cookies.remove("user_name");
  },

  getFilterStackPayment:function () {
    return Cookies.get('filter_stack_payment')
  },

  getPenyaFilter:function () {
    return Cookies.get('filter_penya')
  },
  getStackAktsFilter:function () {
    return Cookies.get('filter_stack_akts')
  },
  getSubjectFilters:function(){
    return Cookies.get('filter_subjects')
  },

  getInspectorReportFilters:function(){
    return Cookies.get('filter_inspector_reports')
  },
  getSubjectReportsYearly:function(){
    return Cookies.get('filter_subject_reports_yearly')
  },
  setBranchsPLans:function(filter){
    Cookies.set('filter_branchs_plans',JSON.stringify(filter),{expires:configs.cookie_expire_period})
  },
  getBranchsPLans:function(){
    return Cookies.get('filter_branchs_plans')
  },
  getPaymentsAll:function(){
    return Cookies.get('filter_payments_all')
  },
  getOffenseListFilter:function(){
    return Cookies.get('filter_offence_list')
  },
  getOffensePaymentFilter:function(){
    return Cookies.get('filter_offence_payment')
  },
  getPeopleFacts:function(){
    return Cookies.get('filter_people_fact')
  },

  setCookie:function(cookie_name, cookie_object){
    Cookies.set(cookie_name,JSON.stringify(cookie_object),{expires:configs.cookie_expire_period})
  },

};

export default $cookie







