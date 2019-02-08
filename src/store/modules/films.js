import { apiGet } from "../../services/Api";

export default {
  state: {
    apiURL: "https://swapi.co/api/films/",
    data: {
      count: null,
      results: []
    }
  },
  mutations: {
    setFilms(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async getFilms({ state, commit }, url = null) {
      try {
        let route = url ? `${state.apiURL}?${url}` : `${state.apiURL}`;

        let films = await apiGet(route);

        commit("setFilms", films.data);
      } catch (error) {
        console.error(`Something went wrong into films module: ${error}`);
        commit("setFilms", {
          count: null,
          results: []
        });
      }
    }
  }
};
