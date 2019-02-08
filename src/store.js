import Vue from "vue";
import Vuex from "vuex";
import { apiGet } from "./services/Api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiURL: "https://swapi.co/api/",
    films: [],
    characters: {
      count: null,
      results: []
    },
    characterDetail: {},
    filmDetail: {},
    species: [],
    planets: [],
    vehicle: []
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
  }
});
