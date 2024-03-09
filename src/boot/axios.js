import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { i18n } from './i18n';
import { piniaActions } from 'src/stores/piniaActions';
import { piniaState } from 'src/stores/piniaState';
import { cfghttp } from 'src/utils/constants';

console.log(piniaActions())

const {decrementAjaxRequestsCnt, incrementAjaxRequestsCnt,clearUserSession} = piniaActions();
const {lang_code, user} = piniaState();

let $axios = axios;

export default boot(({ app, router }) => {


  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = cfghttp.BASE_URL;
  axios.defaults.timeout = cfghttp.BASE_TIMEOUT;

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      decrementAjaxRequestsCnt();
      // console.log(error.response.status)
      if (!error.response) {
        return Promise.reject({
          type: "warning",
          errorCode: -200,
          errorDescription: "",
          errorMessage: i18n.global.t("http.base_error"),
        });
      }
      if (!error.response.data) {
        return Promise.reject({
          type: "warning",
          errorCode: -200,
          errorDescription: "",
          errorMessage: i18n.global.t("http.base_error"),
        });
      }
      if (error.response.status === 401) {
        return Promise.reject({
          type: "warning",
          errorCode: 401,
          errorDescription: "",
          errorMessage: i18n.global.t("http.session_timeout"),
        });
      }
      if (error.response.status === 403) {
        clearUserSession();
        router.replace("/login");
        return Promise.reject({
          type: "warning",
          errorCode: error.response.data.ERROR.code,
          errorDescription: error.response.data.ERROR.description,
          errorMessage: error.response.data.ERROR.message,
        });
      }
      if (error.response.status === 404) {
        return Promise.reject({
          type: "warning",
          errorCode: error.response.status,
          errorDescription: i18n.global.t("modules.errormessages"),
          errorMessage: i18n.global.t("fp_captions.l_error_description"),
        });
      }
      return Promise.reject({
        type: "error",
        errorCode: error.response.data?.ERROR?.code,
        errorDescription: error.response.data?.ERROR?.description,
        errorMessage: error.response.data?.ERROR?.message,
      });
    }
  );
  axios.interceptors.request.use(
    function (request) {
      if (user !== null) {
        request.headers.Authorization = `Bearer ${user.token}`;
      }

      request.headers["Language"] = lang_code;
      incrementAjaxRequestsCnt();
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;

  $axios = axios;

});

export { $axios };
