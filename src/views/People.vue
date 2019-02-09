<template>
  <div class="person">
    <h1>People</h1>
    <FormSearchPerson />
    <b-row class="mt-5">
      <b-col>
        <b-table
          responsive
          striped
          hover
          small
          :fields="fields"
          :items="charactersResult"
        >
          <template slot="homeworld">
            <b-button type="button" variant="info" size="sm">Planet</b-button>
          </template>
          <template slot="species">
            <b-button type="button" variant="info" size="sm">Specie</b-button>
          </template>
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
    <b-row>
      <b-col cols="12" class="mx-auto d-flex flex-row justify-content-between">
        <div>
          <b-button
            variant="link"
            v-show="$store.state.characters.previous"
            @click="getCharacterPaginate($store.state.characters.previous)"
          >
            Previous Page
          </b-button>
        </div>
        <div>
          <b-button
            variant="link"
            v-show="$store.state.characters.next"
            @click="getCharacterPaginate($store.state.characters.next)"
          >
            Next Page
          </b-button>
        </div>
      </b-col>
    </b-row>
    <ModalPeople :info="peopleDetail" @reset="resetModal" />
  </div>
</template>

<script>
import FormSearchPerson from "@/components/FormSearchPerson";

export default {
  name: "people",
  components: {
    FormSearchPerson
  },
  data() {
    return {
      fields: [
        { sortable: "true", key: "name" },
        { sortable: "true", key: "species" },
        { sortable: "true", key: "homeworld", label: "Planet" },
        { sortable: "true", key: "gender" },
        { sortable: "true", key: "birth_year", label: "Birthday Year" },
        { key: "actions", label: " ", variant: "links", class: "text-right" }
      ],
      people: [],
      peopleDetail: {
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
      filterRequest: ""
    };
  },
  computed: {
    charactersResult() {
      return this.$store.state.characters.results;
    }
  },
  methods: {
    getcharacters() {
      if (!this.charactersResult.length) {
        this.$store.dispatch("getCharacters");
      }
    },
    getCharacterPaginate(url) {
      let explodeUrl = url.split("?");
      this.$store.dispatch("getCharacters", `?${explodeUrl[1]}`);
    },
    resetModal() {
      this.peopleDetail = {
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
      };
    },
    info(item, button) {
      this.peopleDetail = this.charactersResult.find(
        character => character.url === item.url
      );
      this.$root.$emit("bv::show::modal", "modalDetail", button);
    }
  },
  mounted() {
    this.getcharacters();
  }
};
</script>
