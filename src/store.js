import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import filmsModule from "./store/modules/films";
import peopleModule from "./store/modules/people";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    apiURL: "https://swapi.co/api/"
  },
  mutations: {},
  actions: {},
  modules: {
    films: filmsModule,
    people: peopleModule
  }
});
