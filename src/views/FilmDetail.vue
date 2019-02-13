<template>
  <div class="film-detail">
    <h1 class="text-center">"{{ film.title }}" Details</h1>
    <b-row class="mt-5">
      <b-col cols="12" sm="6">
        <p class="text-justify">
          <span class="font-weight-bold">Episode:</span>
          {{ film.episode_id }}
        </p>
        <p class="text-justify">
          <span class="font-weight-bold">Director:</span>
          {{ film.director }}
        </p>
        <p class="text-justify">
          <span class="font-weight-bold">Producer:</span>
          {{ film.producer }}
        </p>
        <p class="text-justify">
          <span class="font-weight-bold">Release Date:</span>
          {{ film.release_date }}
        </p>
      </b-col>
      <b-col cols="12" sm="6">
        <p class="text-justify mb-0">
          <span class="font-weight-bold">Opening Crawl:</span>
        </p>
        <pre>
          {{ film.opening_crawl }}
        </pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6">
        <b-card-group deck class="mb-3">
          <cardCollapse title="people" :data="film.characters" details />
          <cardCollapse title="planets" :data="film.planets" />
        </b-card-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-card-group deck class="mb-3">
          <cardCollapse title="starships" :data="film.starships" />
          <cardCollapse title="vehicles" :data="film.vehicles" />
        </b-card-group>
      </b-col>
      <b-col cols="12" sm="6" md="3">
        <b-card-group deck class="mb-3">
          <cardCollapse title="species" :data="film.species" />
        </b-card-group>
      </b-col>
    </b-row>
    <ModalPeople
      :info="$store.state.people.characterDetails"
      @reset="resetModal"
    />
    <b-row>
      <b-col cols="12" class="mt-4 text-center">
        <b-btn varian="outline-primary" :to="{ name: 'films' }">
          Return to <font-awesome icon="film" /> Films
        </b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import cardCollapse from "@/components/CardCollapse";

export default {
  name: "filmDetails",
  components: {
    cardCollapse
  },
  data() {
    return {
      film: {
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
  computed: {},
  methods: {
    resetModal() {},
    async getFilm() {
      let id = this.$route.params.id;
      this.film = await this.$store.dispatch("getFilm", `${id}`);
    }
  },
  mounted() {
    this.getFilm();
  }
};
</script>
