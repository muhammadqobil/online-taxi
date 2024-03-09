import { boot } from "quasar/wrappers";
import { date } from "quasar";

export default boot(({ app }) => {
  // something to do
  const originalFormatDate = date.formatDate;

  date.formatDate = function (xdate, pattern) {
    if (!xdate) return "";
    return originalFormatDate(xdate, pattern);
  };

  app.config.globalProperties.$dateutil = date;
});

export { date };
