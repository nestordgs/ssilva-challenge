<template>
  <b-modal
    id="modalDetail"
    centered
    @hide="reset"
    ok-only
    :title="info.name"
    size="lg"
  >
    <b-row>
      <b-col cols="12">
        <p class="text-capitalize">
          <span class="font-weight-bold">Height:</span>
          {{ info.height }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Mass:</span>
          {{ info.mass }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Hair Color:</span>
          {{ info.hair_color }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Skin Color:</span>
          {{ info.skin_color }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Eye Color:</span>
          {{ info.eye_color }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Birthday Year:</span>
          {{ info.birth_year }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Gender:</span>
          {{ info.gender }}
        </p>
        <p class="text-capitalize">
          <span class="font-weight-bold">Planet:</span>
          {{ $store.getters.getPlanetByUrl(info.homeworld) }}
        </p>
      </b-col>
      <b-col cols="12" lg="5" offset-md="1" class="mb-3">
        <h4 class="text-center">Species</h4>
        <b-list-group>
          <b-list-group-item
            v-for="specie in info.species"
            :key="specie.id"
            class="text-center"
          >
            {{ $store.getters.getSpecieByUrl(specie) }}
          </b-list-group-item>
          <b-list-group-item v-if="!info.species.length" class="text-center">
            No Species to show
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" lg="5" class="mb-3">
        <h4 class="text-center">Vehicles</h4>
        <b-list-group>
          <b-list-group-item
            v-for="vehicle in info.vehicles"
            :key="vehicle.id"
            class="text-center"
          >
            {{ vehicle }}
          </b-list-group-item>
          <b-list-group-item v-if="!info.vehicles.length" class="text-center">
            No Vehicles to show
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" lg="5" offset-md="1" class="mb-3 mb-md-auto">
        <h4 class="text-center">Films</h4>
        <b-list-group>
          <b-list-group-item
            v-for="film in info.films"
            :key="film.id"
            class="text-center"
          >
            <b-link
              :to="{ name: 'films.detail', params: { id: linkId(film) } }"
            >
              {{ $store.getters.getFilmTitleByUrl(film) }}
            </b-link>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" lg="5">
        <h4 class="text-center">Starships</h4>
        <b-list-group>
          <b-list-group-item
            v-for="starship in info.starships"
            :key="starship.id"
          >
            {{ starship }}
          </b-list-group-item>
          <b-list-group-item v-if="!info.starships.length" class="text-center">
            No Starships to show
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: "modalDetail",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    reset() {
      this.$emit("reset");
    },
    linkId(item) {
      let parts = item.split("/");
      let lastSegment = parts.pop() || parts.pop();

      return lastSegment;
    }
  }
};
</script>
