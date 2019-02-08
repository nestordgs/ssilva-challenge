<template>
  <div class="person">
    <h1>Films</h1>
    <b-row>
      <b-col>
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
              @click.stop="info(item.item, $event.target)"
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
export default {
  name: "films",
  data() {
    return {
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
      return this.$store.state.films.data.results;
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
    }
  },
  mounted() {
    this.getFilms();
  }
};
</script>
