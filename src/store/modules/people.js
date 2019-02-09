import { apiGet } from "@/services/Api";

export default {
  state: {
    apiURL: "https://swapi.co/api/people/",
    data: {
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
      state.data = payload;
    },
    setCharacter(state, payload) {
      state.characterDetails = payload;
    }
  },
  actions: {
    async getCharacters({ state, commit }, url = null) {
      try {
        let route = url ? `${state.apiURL}${url}` : `${state.apiURL}`;

        let characters = await apiGet(`${route}`);

        commit("setCharacters", characters.data);
      } catch (error) {
        console.error(`Somthing went wrong into people module: ${error}`);
        commit("setCharacters", {
          count: null,
          results: []
        });
      }
    },
    async getCharacter({ state, commit }, id) {
      try {
        let character;

        character = await state.data.results.find(people => {
          return people.url === `${state.apiURL}${id}/`;
        });

        if (!character) {
          character = await apiGet(`${state.apiURL}${id}/`);
          commit("setCharacter", character.data);
        } else {
          commit("setCharacter", character);
        }
      } catch (error) {
        console.error(`Somthing went wrong into people module: ${error}`);
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
  }
};
