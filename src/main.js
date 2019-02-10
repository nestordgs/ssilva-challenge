import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUsers,
  faFilm,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ModalPeople from "@/components/ModalPeopleDetail";

library.add(faHome);
library.add(faUsers);
library.add(faFilm);
library.add(faFilter);

Vue.component("font-awesome", FontAwesomeIcon);
Vue.component("ModalPeople", ModalPeople);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
