import Vue from "vue";
import Vuex from "vuex";
import { apiGet } from "./services/Api";
import filmsModule from "./store/modules/films";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiURL: "https://swapi.co/api/",
    characters: {
      count: null,
      results: []
    },
    characterDetails: {
      name: "",
      height: "",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
      homeworld: "",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "",
      edited: "",
      url: ""
    }
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setCharacter(state, payload) {
      state.characterDetails = payload;
    }
  },
  actions: {
    async getCharacters({ state, commit }, url = null) {
      try {
        let route = url
          ? `${state.apiURL}people/${url}`
          : `${state.apiURL}people/`;

        let characters = await apiGet(`${route}`);

        commit("setCharacters", characters.data);
      } catch (error) {
        commit("setCharacters", {
          count: null,
          results: []
        });
      }
    },
    async getCharacter({ state, commit }, id) {
      try {
        let character;

        character = await state.characters.results.find(people => {
          return people.url === `${state.apiURL}people/${id}/`;
        });
        if (!character) {
          character = await apiGet(`${state.apiURL}people/${id}/`);
          commit("setCharacter", character.data);
        } else {
          commit("setCharacter", character);
        }
      } catch (error) {
        console.error(error);
        commit("setCharacter", {
          name: "",
          height: "",
          mass: "",
          hair_color: "",
          skin_color: "",
          eye_color: "",
          birth_year: "",
          gender: "",
          homeworld: "",
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: "",
          edited: "",
          url: ""
        });
      }
    }
  },
  modules: {
    films: filmsModule
  }
});
