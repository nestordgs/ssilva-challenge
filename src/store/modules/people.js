import { apiGet, normalRequest } from "@/services/Api";

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
    },
    planets: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.data = payload;
    },
    setCharacter(state, payload) {
      state.characterDetails = payload;
    },
    setPlanets(state, payload) {
      state.planets = payload;
    }
  },
  actions: {
    async getCharacters({ state, commit, dispatch }, url = null) {
      try {
        let route = url ? `${state.apiURL}${url}` : `${state.apiURL}`;

        let characters = await apiGet(`${route}`);

        commit("setCharacters", characters.data);
        dispatch("getPlanet");
      } catch (error) {
        console.error(
          `Somthing went wrong into people module line 52: ${error}`
        );
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
        console.error(
          `Somthing went wrong into people module line 76: ${error}`
        );
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
    },
    getPlanet: async ({ state, commit }) => {
      try {
        let planets = [];
        for (const people of state.data.results) {
          let planet = await normalRequest().get(people.homeworld);
          planets.push(planet.data);
        }
        commit("setPlanets", planets);
      } catch (error) {
        console.error(
          `Somthing went wrong into people module line 106: ${error}`
        );
        commit("setPlanets", "planets");
      }
    }
  },
  getters: {
    getPlanetByUrl: state => url => {
      let planet = state.planets.find(planet => planet.url === url);

      return planet ? planet.name : "N/A";
    }
  }
};
