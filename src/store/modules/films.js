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
    },
    async getFilm({ state }, id) {
      try {
        let film;

        film = state.data.results.find(film => {
          return film.url === `${state.apiURL}${id}/`;
        });

        if (!film) {
          film = await apiGet(`${state.apiURL}${id}/`);
          return film.data;
        } else {
          return film;
        }
      } catch (error) {
        console.log("aqui");
      }
    }
  },
  getters: {
    getFilm: state => {
      return state.data.results;
    },
    getDirectors: state => {
      let directors = [{ value: null, text: "Selecte one Director" }];

      for (const film of state.data.results) {
        directors.push(film.director);
      }

      directors = [...new Set(directors)];

      return directors;
    },
    getFilmTitleByUrl: state => url => {
      let film = state.data.results.find(film => film.url === url);

      return film ? film.title : "Unknown";
    }
  }
};
