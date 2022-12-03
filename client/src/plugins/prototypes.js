import Vue from "vue";
import { httpServiceProvider } from "@/providers/httpServiceProvider";

Plugin.install = (Vue) => {
  Vue.prototype.$http = httpServiceProvider;
};

Vue.use(Plugin);
