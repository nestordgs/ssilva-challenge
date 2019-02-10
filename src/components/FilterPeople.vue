<template>
  <div>
    <p class="text-right">
      <b-btn
        type="button"
        size="sm"
        variant="outline-primary"
        v-b-toggle.collapse1
      >
        <font-awesome icon="filter" />Filters
        <span v-if="numFilters">({{ numFilters }})</span>
      </b-btn>
    </p>
    <b-collapse id="collapse1" visible>
      <b-card>
        <h4 slot="header" class="card-text">Filters Table</h4>
        <b-form>
          <b-row>
            <b-col cols="12" sm="6" md="4" xl="3">
              <b-form-group label="Name / Species">
                <b-input-group>
                  <b-form-input
                    id="namEspecie"
                    name="nameEspecie"
                    size="sm"
                    v-model.trim="filtros.nameEspecie"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-btn size="sm" @click="filtros.nameEspecie = ''">
                      Clear
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4" xl="3">
              <legend class="col-form-label pt-0">Planets</legend>
              <b-form-select
                multiple
                id="planetsFilter"
                name="planetsFilter"
                class="mb-3"
                size="sm"
                v-model="filtros.planets"
                :value="filtros.planets"
                :options="optionsPlanets"
              >
                <template slot="first">
                  <option :value="null" disabled class="opt-disable">
                    Select One
                  </option>
                </template>
              </b-form-select>
            </b-col>
            <b-col cols="12" sm="6" md="4" xl="3">
              <legend class="col-form-label pt-0">Gender</legend>
              <b-form-select
                id="genderFilter"
                name="genderFilter"
                class="mb-3"
                size="sm"
                v-model="filtros.gender"
                :value="filtros.gender"
                :options="optionsGender"
              >
                <template slot="first">
                  <option :value="null" disabled class="opt-disable">
                    Select One
                  </option>
                </template>
              </b-form-select>
            </b-col>
            <b-col cols="12" sm="6" md="4" xl="3">
              <legend class="col-form-label pt-0">Birthday Year Range</legend>
              <b-form-input
                id="birthYearFilter"
                name="birthYearFilter"
                size="sm"
                v-model="filtros.birth_year"
                type="range"
                class="custom-range"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "FilterPeople",
  data() {
    return {
      filtros: {
        nameEspecie: "",
        planets: [],
        gender: null,
        birth_year: null
      },
      optionsPlanets: [
        { value: "martes", text: "Martes" },
        { value: "venus", text: "Venus" },
        { value: "jupiter", text: "Jupiter" },
        { value: "tierta", text: "Tierra" }
      ],
      optionsGender: [
        { valie: "male", text: "Male" },
        { valie: "female", text: "Female" },
        { valie: "hermaphrodite", text: "Hermaphrodite" }
      ]
    };
  },
  computed: {
    numFilters() {
      return Object.values(this.filtros).filter(value => value && value.length)
        .length;
    }
  },
  methods: {
    // multiFilter(array, filters) {
    //   const filterKeys = Object.keys(filters);
    //   // filters all elements passing the criteria
    //   return array.filter((item) => {
    //     // dynamically validate all filter criteria
    //     return filterKeys.every(key => {
    //       // ignores an empty filter
    //       if (!filters[key].length) return true;
    //       return filters[key].includes(item[key]);
    //     });
    //   });
    // }
  }
};
</script>
