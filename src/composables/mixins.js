import { i18n } from "src/boot/i18n";
import { $axios } from "src/boot/axios";
import { piniaActions } from "src/stores/piniaActions";
import { piniaState } from "src/stores/piniaState";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { getCurrentInstance } from "vue";

export default function useComp() {
  const $q = useQuasar();
  const $route = useRoute();
  let $dateutil = { formatDate: (x, s) => {} };
  const app = getCurrentInstance();

  console.log(i18n.global.t("system.pagination_text", [
    1,
    2,
    3,
  ]))

  if (app != null) {
    $dateutil = app.appContext.config.globalProperties.$dateutil;
  }

  function currentModule() {
    if ($route && $route.matched.length > 0) {
      return $route.matched[1];
    }
    return null;
  }

  function pagedGet(url, pagination, filter, config) {
    const p = url + tableFilterQuery(pagination) + tableFilterQuery(filter);
    return $axios.get(encodeURI(p), config);
  }

  function parsePaginationQuery(pagination) {
    let queryArray = [];

    if (!pagination) {
      return "";
    }
    if (pagination.sortBy) {
      queryArray.push("sortBy=" + pagination.sortBy);
    }
    if (pagination.descending !== undefined)
      queryArray.push("descending=" + pagination.descending);

    if (pagination.page) queryArray.push("page=" + pagination.page);
    if (pagination.rowsPerPage)
      queryArray.push("perPage=" + pagination.rowsPerPage);

    if (queryArray.length !== 0) return ";" + queryArray.join(";");
    else return "";
  }

  function tableFilterQuery(filter) {
    if (!filter) return "";
    let queryArray = [];
    Object.keys(filter).map((objectKey, index) => {
      const value = filter[objectKey];
      if (value === undefined || value === null || value.length === 0) return;
      queryArray.push(objectKey + "=" + value);
    });

    if (queryArray.length !== 0) return "?" + queryArray.join("&");
    else return "";
  }

  function formatPrice(value) {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function formatPriceForNull(value) {
    if (value !== null) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }

  function showError(error) {
    if (error.type == "warning") {
      $q.notify({
        caption: error.errorMessage + " [" + error.errorCode + "]",
        message: error.errorDescription,
        icon: "warning",
        color: "negative",
      });
    } else {
      piniaActions().setGlobalError(error);
    }
  }

  function showErrorToast(error) {
    $q.notify({
      position: "bottom-right",
      caption: error.errorMessage + " [" + error.errorCode + "]",
      message: error.errorDescription,
      icon: "warning",
      color: "dark",
    });
  }

  function showErrorNegative(error) {
    $q.notify({
      caption: error.errorMessage + " [" + error.errorCode + "]",
      message: error.errorDescription,
      icon: "warning",
      color: "negative",
    });
  }

  function showDefaultError() {
    showError(getDefaultError());
  }

  function getDefaultError() {
    return {
      errorCode: -201,
      errorMessage: "System error",
      errorDescription: "",
    };
  }

  function showInfo(message) {
    $q.notify({
      caption: "Info",
      message: message,
      icon: "info",
      color: "positive",
    });
  }

  function showWarnInfo(message) {
    $q.notify({
      caption: "Info",
      message: message,
      icon: "info",
      color: "amber",
    });
  }

  async function ask(title, message, callback) {
    $q.notify({
      caption: title,
      message: message,
      timeout: 0,
      icon: "mdi-comment-question-outline",
      color: "primary",
      position: "center",
      actions: [
        { label: i18n.global.t("system.No"), color: "white" },
        {
          label: i18n.global.t("system.Yes"),
          color: "yellow",
          handler: callback,
        },
      ],
    });
  }

  function confirmDialog(title, message, callback) {
    $q.dialog({
      title: title,
      message: message,
      persistent: true,
      ok: i18n.global.t("system.Ok"),
      cancel: i18n.global.t("system.Cancel"),
      class: "bg-primary text-white",
      color: "white",
    }).onOk(callback);
  }

  function paginationOption() {
    return [7, 10, 20, 25, 50, 100];
  }

  function paginationText(firstRowIndex, endRowIndex, totalRowsNumber) {
    console.log(firstRowIndex)
    console.log(endRowIndex)
    console.log(totalRowsNumber)
    console.log(i18n.global.t("system.pagination_text", [
      firstRowIndex,
      endRowIndex,
      totalRowsNumber,
    ]))

    return i18n.global.t("system.pagination_text", [
      firstRowIndex,
      endRowIndex,
      totalRowsNumber,
    ]);
  }

  function selectedRowsText(numberOfRows) {
    return i18n.global.t("system.selected_rows_text", [numberOfRows]);
  }

  function perPageText() {
    return i18n.global.t("system.per_page_text");
  }

  function noDataText() {
    return i18n.global.t("system.no_data");
  }

  function number_format(number, decimals, thousands_sep) {
    return number
      ? parseInt(number)
          .toFixed(decimals >= 0 ? decimals : 2)
          .toString()
          .replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            "$1" + (thousands_sep ? thousands_sep : " ")
          )
      : "0";
  }

  function passport_format(passport) {
    var retval;
    if (passport !== null) {
      if (passport.length === 9) {
        retval = passport.substring(0, 2) +' '+ passport.substring(2, 9);
      } else {
        retval = phone
      }
    } else {
      retval = " - "
    }
    return retval;
  }

  function number_format_old(number, decimals, dec_point, thousands_sep) {
    var i, j, kw, kd, km;

    if (isNaN((decimals = Math.abs(decimals)))) {
      decimals = 2;
    }
    if (dec_point == undefined) {
      dec_point = ".";
    }
    if (thousands_sep == undefined) {
      thousands_sep = " ";
    }

    i = parseInt((number = (+number || 0).toFixed(decimals))) + "";

    if ((j = i.length) > 3) {
      j = j % 3;
    } else {
      j = 0;
    }

    km = j ? i.substr(0, j) + thousands_sep : "";
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = decimals
      ? dec_point +
        Math.abs(number - i)
          .toFixed(decimals)
          .replace(/-/, 0)
          .slice(2)
      : "";

    return km + kw + kd;
  }

  function formatCardNumber(value) {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  }

  function num_format(num, dig, dec, sep) {
    if (num == null || num == undefined) {
      return;
    }
    num = "" + num;
    num = num.replace(",", ".");
    var x = new Array();
    var s = num < 0 ? "-" : "";
    num = Math.abs(num).toFixed(dig).split(".");
    var r = num[0].split("").reverse();
    for (var i = 1; i <= r.length; i++) {
      x.unshift(r[i - 1]);
      if (i % 3 == 0 && i != r.length) x.unshift(sep);
    }
    return s + x.join("") + (num[1] ? dec + num[1] : "");
  }

  function lpad(val, length, sep) {
    if (val === null || val === undefined) {
      return;
    }
    val = "" + val;
    if (length && length > val.length) {
      let l = length - val.length;
      let x = Array(l + 1).join(sep ? sep : "");
      val = x + "" + val;
    }
    return val;
  }

  function phone_format(phone) {
    var retval;
    if (!!phone) {
      if (phone.length === 9) {
        retval =
          "(" +
          phone.substring(0, 2) +
          ") " +
          phone.substring(2, 5) +
          "-" +
          phone.substring(5, 7) +
          "-" +
          phone.substring(7, 9);
      } else {
        retval = phone;
      }
    } else {
      retval = " - ";
    }
    return retval;
  }

  function datePickerOptions(date) {
    return date <= getCurrentDateForQDate();
  }

  function scrollTo(elId, headerOffset) {
    var element = document.getElementById(elId),
      bodyRect = document.body.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top;

    window.scrollTo({
      top: offset - headerOffset,
      behavior: "smooth",
    });
  }

  function formatBankAccount(value) {
    if (!value) {
      return "";
    }
    return value.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1 ");
  }

  function parseToJsonCert(certs) {
    var retval = [];
    var cert = {};
    for (let k in certs) {
      cert = certs[k];
      $set(cert, "certAlias", aliasParseToJson(cert.alias));
      retval.push(cert);
    }
    return retval;
  }

  function setLength(text, size) {
    if (!!text) {
      if (!!text && text.length > size) {
        return text.substring(0, size) + "...";
      } else {
        return text;
      }
    } else {
      return "";
    }
  }

  function parseToJsonCertNew(certs) {
    let result = [];
    if (certs) {
      certs.forEach((element) => {
        let el = {};
        let alias = {};
        for (let r in aliasParseToJson(element.alias)) {
          alias = aliasParseToJson(element.alias)[r];
          $set(el, r, alias);
        }
        $set(element, "el", el);
        result.push(element);
      });
    }

    return result;
  }

  function aliasParseToJson(alias) {
    var retval = {};
    var splittedStr;

    for (let k in alias.split(",")) {
      splittedStr = alias.split(",")[k];
      if (splittedStr.match(/cn=/g) !== null) {
        $set(retval, "cn", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/name=/g)) {
        $set(retval, "name", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/surname=/g)) {
        $set(retval, "surname", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/o=/g)) {
        $set(retval, "o", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/l=/g)) {
        $set(retval, "l", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/st=/g)) {
        $set(retval, "st", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/c=/g)) {
        $set(retval, "c", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/uid=/g)) {
        $set(retval, "uid", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/1.2.860.3.16.1.2=/g)) {
        $set(retval, "pinfl", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/t=/g)) {
        $set(retval, "t", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/serialnumber=/g)) {
        $set(retval, "serialnumber", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/validfrom=/g)) {
        $set(retval, "validfrom", splittedStr.split("=")[1]);
      }
      if (splittedStr.match(/validto=/g)) {
        $set(retval, "validto", splittedStr.split("=")[1]);
      }
    }

    return retval;
  }
  function getFirstDateOfMonth() {
    let curDate = new Date();
    return '01.' +
      (curDate.getMonth() + 1 < 10 ? '0' + (curDate.getMonth() + 1) : (curDate.getMonth() + 1)) +
      '.' + curDate.getFullYear();
  }
  function changeLang(prefix){
    switch (piniaState().lang_code) {
      case 'en':
        return prefix + 'En';
      case 'ru':
        return prefix + 'Ru';
      case 'uk':
        return prefix + 'Uk';
      default:
        return prefix + 'Uz';
    }
  }

  return {
    $dateutil,
    currentModule,
    pagedGet,
    parsePaginationQuery,
    tableFilterQuery,
    formatPrice,
    formatPriceForNull,
    showError,
    showErrorToast,
    showErrorNegative,
    showDefaultError,
    getDefaultError,
    showInfo,
    showWarnInfo,
    ask,
    confirmDialog,
    paginationOption,
    paginationText,
    selectedRowsText,
    perPageText,
    noDataText,
    number_format,
    number_format_old,
    formatCardNumber,
    num_format,
    lpad,
    phone_format,
    datePickerOptions,
    scrollTo,
    formatBankAccount,
    parseToJsonCert,
    setLength,
    parseToJsonCertNew,
    aliasParseToJson,
    passport_format,
    getFirstDateOfMonth,
    changeLang
  };
}
