import "@babel/polyfill";
import "intersection-observer";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
// import "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
  // mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");
