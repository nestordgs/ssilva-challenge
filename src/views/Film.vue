<template>
  <div class="person">
    <h1 class="text-center">Films</h1>
    <b-row>
      <b-col cols="12">
        <FilterFilm :filter="filter" />
      </b-col>
      <b-col cols="12">
        <b-table
          responsive
          striped
          hover
          small
          :fields="fields"
          :items="filmsResult"
        >
          <template slot="actions" slot-scope="item">
            <b-button
              type="button"
              variant="primary"
              size="sm"
              :to="{ name: 'films.detail', params: { id: linkId(item.item) } }"
            >
              Details
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FilterFilm from "@/components/FilterFilm";
import * as moment from "moment";

export default {
  name: "films",
  components: {
    FilterFilm
  },
  data() {
    return {
      filter: {
        title: "",
        episode_id: [1, 7],
        director: null,
        release_date: {
          from: "1977-05-25",
          to: "2015-12-11"
        }
      },
      fields: [
        { sortable: "true", key: "title" },
        { sortable: "true", key: "episode_id", label: "Episode" },
        { sortable: "true", key: "director" },
        { sortable: "true", key: "release_date" },
        { key: "actions", label: " ", variant: "links", class: "text-right" }
      ],
      filmsDetail: {
        title: "",
        episode_id: null,
        opening_crawl: "",
        director: "",
        producer: "",
        release_date: "",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: "",
        edited: "",
        url: ""
      }
    };
  },
  computed: {
    filmsResult() {
      return this.multiFilter(this.$store.getters.getFilm);
    }
  },
  methods: {
    getFilms() {
      if (!this.filmsResult.length) {
        this.$store.dispatch("getFilms");
      }
    },
    info(item, button) {
      this.filmsDetail = this.filmsResult.find(film => film.url === item.url);
      console.log(button);
    },
    linkId(item) {
      let parts = item.url.split("/");
      let lastSegment = parts.pop() || parts.pop();

      return lastSegment;
    },
    multiFilter(array) {
      let filtros = this.filter;

      array = array.filter(item => {
        let pass = true;

        if (filtros.title) {
          if (!item.title.includes(filtros.title)) {
            pass = false;
          }
        }
        if (filtros.director) {
          if (!item.director.includes(filtros.director)) {
            pass = false;
          }
        }

        let episode_id = parseFloat(item.episode_id);
        let min = parseFloat(filtros.episode_id[0]),
          max = parseFloat(filtros.episode_id[1]);

        if (min < max) {
          if (!episode_id.between(min, max)) {
            pass = false;
          }
        }

        let release_date = {
          from: filtros.release_date.from,
          to: filtros.release_date.to
        };

        if (
          moment(release_date.from).isBefore(release_date.to) ||
          moment(release_date.from).isSame(release_date.to)
        ) {
          if (
            !moment(item.release_date).isBetween(
              release_date.from,
              release_date.to,
              null,
              "[]"
            )
          ) {
            pass = false;
          }
        }

        return pass;
      });
      return array;
    }
  },
  mounted() {
    this.getFilms();
  }
};
</script>
