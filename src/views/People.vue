<template>
  <div class="person">
    <h1 class="text-center">People</h1>
    <FormSearchPerson />
    <b-row class="mt-5">
      <b-col cols="12">
        <FilterPeople :filter="filter" />
      </b-col>
      <b-col cols="12">
        <b-table
          hover
          small
          striped
          responsive
          show-empty
          :fields="fields"
          :items="charactersResult"
        >
          <template slot="homeworld" slot-scope="item">
            {{ $store.getters.getPlanetByUrl(item.item.homeworld) }}
          </template>
          <template slot="species" slot-scope="item">
            {{ $store.getters.getSpecieByUrl(item.item.species[0]) }}
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
      filter: {
        name_specie: "",
        planets: [],
        gender: null,
        birth_year: [-2000, 2000],
        includeUnknown: true
      },
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
      return this.multiFilter(this.$store.getters.getPeople);
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
    },
    multiFilter(array) {
      let filtros = this.filter;

      array = array.filter(item => {
        let pass = true;
        if (filtros.name_specie) {
          let nameSpecie = this.$store.getters.getSpecieByUrl(item.species[0]);
          if (
            !item.name.includes(filtros.name_specie) &&
            !nameSpecie.includes(filtros.name_specie)
          ) {
            pass = false;
          }
        }
        if (filtros.gender) {
          if (!(item.gender === filtros.gender)) {
            pass = false;
          }
        }
        if (filtros.planets.length) {
          let namePlanet = this.$store.getters.getPlanetByUrl(item.homeworld);
          if (!filtros.planets.includes(namePlanet)) {
            pass = false;
          }
        }

        let birth_year = parseFloat(item.birth_year.replace(/[A-Z]/gi, ""));
        let min = parseFloat(filtros.birth_year[0]);
        let max = parseFloat(filtros.birth_year[1]);

        if (birth_year) {
          if (min < max) {
            if (!birth_year.between(min, max)) {
              pass = false;
            }
          }
        }

        if (!birth_year && !filtros.includeUnknown) {
          pass = false;
        }

        return pass;
      });

      return array;
    }
  },
  mounted() {
    this.getcharacters();
  }
};
</script>
