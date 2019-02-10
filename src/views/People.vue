<template>
  <div class="person">
    <h1>People</h1>
    <FormSearchPerson />
    <b-row class="mt-5">
      <b-col cols="12">
        <FilterPeople />
      </b-col>
      <b-col cols="12">
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
            v-show="$store.state.people.data.previous"
            @click="getCharacterPaginate($store.state.people.data.previous)"
          >
            Previous Page
          </b-button>
        </div>
        <div>
          <b-button
            variant="link"
            v-show="$store.state.people.data.next"
            @click="getCharacterPaginate($store.state.people.data.next)"
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
import FilterPeople from "@/components/FilterPeople";

export default {
  name: "people",
  components: {
    FormSearchPerson,
    FilterPeople
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
      }
    };
  },
  computed: {
    charactersResult() {
      return this.$store.state.people.data.results;
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
