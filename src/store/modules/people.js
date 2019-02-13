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
    planets: [],
    species: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.data = payload;
    },
    setCharacter(state, payload) {
      state.characterDetails = payload;
    },
    setPlanets(state, payload) {
      state.planets.push(payload);
    },
    setSpecie(state, payload) {
      state.species.push(payload);
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
    getPlanet: async ({ state, commit, dispatch }) => {
      try {
        let planets = [];
        for (const people of state.data.results) {
          let existsPlanet = state.planets.find(currentPlanet => {
            return currentPlanet.url === people.homeworld;
          });
          let previousRequest = planets.find(currentPlanet => {
            return currentPlanet.url === people.homeworld;
          });
          if (!existsPlanet && !previousRequest) {
            let planet = await normalRequest().get(people.homeworld);
            planets.push(planet.data);
            commit("setPlanets", planet.data);
          }
        }
        dispatch("getSpecie");
      } catch (error) {
        console.error(
          `Somthing went wrong into people module line 106: ${error}`
        );
      }
    },
    getSpecie: async ({ state, commit }) => {
      try {
        let species = [];
        for (const people of state.data.results) {
          for (const peopleSpecie of people.species) {
            let existSpecie = state.species.find(currentSpecie => {
              return currentSpecie.url === peopleSpecie;
            });
            let previousRequest = species.find(currentSpecie => {
              return currentSpecie.url === peopleSpecie;
            });
            if (!existSpecie && !previousRequest) {
              let specie = await normalRequest().get(peopleSpecie);
              species.push(specie.data);
              commit("setSpecie", specie.data);
            }
          }
        }
      } catch (error) {
        console.error(
          `Somthing went wrong into people module line 106: ${error}`
        );
      }
    }
  },
  getters: {
    getPlanetByUrl: state => url => {
      let planet = state.planets.find(planet => planet.url === url);

      return planet ? planet.name : "N/A";
    },
    getSpecieByUrl: state => url => {
      let specie = state.species.find(specie => specie.url === url);

      return specie ? specie.name : "Unknown";
    },
    getPeople: state => {
      return state.data.results;
    }
  }
};
