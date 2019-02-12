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
            <b-col cols="12" sm="6" md="4">
              <b-form-group label="Name / Species">
                <b-input-group>
                  <b-form-input
                    id="name_specie"
                    name="name_specie"
                    size="sm"
                    v-model="filter.name_specie"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-btn size="sm" @click="filter.name_specie = ''">
                      Clear
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
              <legend class="col-form-label pt-0">Planets</legend>
              <b-form-select
                multiple
                :select-size="4"
                v-model="filter.planets"
                class="mb-3"
                size="sm"
                id="planetsFilter"
                name="planetsFilter"
                :value="filter.planets"
              >
                <option
                  v-for="planet in $store.state.people.planets"
                  :key="planet.url"
                  :value="planet.url"
                >
                  {{ planet.name }}
                </option>
              </b-form-select>
            </b-col>
            <b-col cols="12" sm="6" md="4">
              <legend class="col-form-label pt-0">Gender</legend>
              <b-form-select
                id="genderFilter"
                name="genderFilter"
                class="mb-3"
                size="sm"
                v-model="filter.gender"
                :value="filter.gender"
                :options="optionsGender"
              >
              </b-form-select>
            </b-col>
            <b-col cols="12">
              <legend class="col-form-label pt-0 text-center">
                Birthday Year
              </legend>
              <vue-slider
                v-model="filter.birth_year"
                :min="-200"
                :max="200"
                id="birthFilter"
                name="birthFilter"
                class="mt-5"
              >
                <template slot="tooltip" slot-scope="tooltip">
                  <div
                    class="vue-slider-tooltip-top vue-slider-tooltip-wrap"
                    style="visibility: inherit;"
                  >
                    <span class="vue-slider-tooltip">
                      {{ tooltip.value }}{{ tooltip.value > 0 ? "ABY" : "BBY" }}
                    </span>
                  </div>
                </template>
              </vue-slider>
              <small class="font-italic  text-muted">
                BBY: Before the Battle of Yavin.
                <br />
                ABY: After the Battle of Yavin.
              </small>
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
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      optionsPlanets: [
        { value: null, text: "Select One or More Planets" },
        { value: "martes", text: "Martes" },
        { value: "venus", text: "Venus" },
        { value: "jupiter", text: "Jupiter" },
        { value: "tierta", text: "Tierra" }
      ],
      optionsGender: [
        { value: null, text: "Select One Gender" },
        { value: "m", text: "Male" },
        { value: "f", text: "Female" },
        { value: "h", text: "Hermaphrodite" },
        { value: "n", text: "N/A" }
      ]
    };
  },
  computed: {
    numFilters() {
      return Object.values(this.filter).filter(value => value && value.length)
        .length;
    }
  },
  methods: {}
};
</script>
