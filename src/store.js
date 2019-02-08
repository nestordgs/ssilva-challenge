import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { apiGet } from "./services/Api";
import filmsModule from "./store/modules/films";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    apiURL: "https://swapi.co/api/",
    characters: {
      count: null,
      results: []
    }
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    }
  },
  actions: {
    async getCharacters({ state, commit }, url = null) {
      try {
        let route = url
          ? `${state.apiURL}people/?${url}`
          : `${state.apiURL}people/`;

        let characters = await apiGet(`${route}`);

        commit("setCharacters", characters.data);
      } catch (error) {
        commit("setCharacters", {
          count: null,
          results: []
        });
      }
    }
  },
  modules: {
    films: filmsModule
  }
});
