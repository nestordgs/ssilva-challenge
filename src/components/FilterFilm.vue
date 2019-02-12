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
              <b-form-group label="Title">
                <b-input-group>
                  <b-form-input
                    size="sm"
                    id="titleFilter"
                    name="titleFilter"
                    v-model="filter.title"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-btn size="sm" @click="filter.title = ''">
                      Clear
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
              <legend class="col-form-label pt-0">Directors</legend>
              <b-form-select
                id="directorFilter"
                name="directorFilter"
                class="mb-3"
                size="sm"
                v-model="filter.director"
                :value="filter.director"
                :options="$store.getters.getDirectors"
              >
              </b-form-select>
            </b-col>
            <b-col cols="12" sm="6" md="4">
              <legend class="col-form-label pt-0">Episode</legend>
              <vue-slider
                id="episodeFilter"
                name="episodeFilter"
                v-model="filter.episode_id"
                class="mt-4"
                :min="1"
                :max="$store.getters.getFilm.length"
              ></vue-slider>
            </b-col>
            <b-col cols="12">
              <legend class="col-form-label pt-0 text-center">
                Release Date
              </legend>
              <b-row>
                <b-col cols="12" md="5">
                  <legend class="col-form-label pt-0">
                    From:
                  </legend>
                  <vue-slider
                    piecewise
                    class="mt-4"
                    :data="dateFilms"
                    id="episodeFilterFrom"
                    name="episodeFilterFrom"
                    :value="filter.release_date.from"
                    v-model="filter.release_date.from"
                  ></vue-slider>
                </b-col>
                <b-col cols="12" md="5" offset-md="1">
                  <legend class="col-form-label pt-0">
                    To:
                  </legend>
                  <vue-slider
                    piecewise
                    class="mt-4"
                    :data="dateFilms"
                    id="episodeFilterTo"
                    name="episodeFilterTo"
                    :value="filter.release_date.to"
                    v-model="filter.release_date.to"
                  ></vue-slider>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "FilterFilm",
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      releasesDate: [
        "2016-10-01",
        "2016-10-02",
        "2016-10-03",
        "2016-10-04",
        "2016-10-05",
        "2016-10-06",
        "2016-10-07"
      ]
    };
  },
  computed: {
    numFilters() {
      return Object.values(this.filter).filter(value => value && value.length)
        .length;
    },
    dateFilms() {
      let releaseDates = [];

      this.$store.getters.getFilm.forEach(item => {
        releaseDates.push(item.release_date);
      });

      return releaseDates.sort();
    }
  }
};
</script>
