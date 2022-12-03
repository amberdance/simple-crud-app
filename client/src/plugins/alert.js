import Vue from "vue";
import { Notification } from "element-ui";

const notificationBase = (type, message, duration = 2000) => {
  Notification({
    type,
    message,
    position: "bottom-right",
    duration: duration,
  });
};

export const onSuccess = (message = "Успех", duration) =>
  notificationBase("success", message, duration);

export const onError = (message = "Произошла ошибка", duration = 2500) =>
  notificationBase("error", message, duration);

export const onWarning = (message, duration = 2500) =>
  notificationBase("warning", message, duration);

const alerts = () => {
  Vue.prototype.$onSuccess = (message = "Успех", duration) =>
    onSuccess(message, duration);

  Vue.prototype.$onError = (message = "Произошла ошибка", duration) =>
    onError(message, duration);

  Vue.prototype.$onWarning = (message, duration) =>
    onWarning(message, duration);
};

Vue.use(alerts);
