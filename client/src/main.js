import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";

import "lodash";

import "@/providers/axiosServiceProvider";
import "@/styles/style.css";
import "@/plugins/prototypes";
import "@/plugins/element";
import "@/plugins/alert";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
