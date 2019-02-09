<template>
  <b-modal id="modalDetail" centered @hide="reset" ok-only :title="info.name">
    <b-row>
      <b-col cols="12">
        <p class="text-left">
          <span class="font-weight-bold">Height:</span>
          {{ info.height }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Mass:</span>
          {{ info.mass }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Hair Color:</span>
          {{ info.hair_color }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Skin Color:</span>
          {{ info.skin_color }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Eye Color:</span>
          {{ info.eye_color }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Birthday Year:</span>
          {{ info.birth_year }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Gender:</span>
          {{ info.gender }}
        </p>
        <p class="text-left">
          <span class="font-weight-bold">Planet:</span>
          {{ info.homeworld }}
        </p>
      </b-col>
      <b-col cols="12">
        <b-card-group deck class="mb-3">
          <b-card no-body v-if="info.vehicles.length">
            <h4 slot="header" class="mb-0">Vehicles</h4>
            <b-list-group flush>
              <b-list-group-item
                v-for="vehicle in info.vehicles"
                :key="vehicle.id"
                class="px-2"
              >
                {{ vehicle }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card no-body v-if="info.films.length">
            <h4 slot="header" class="mb-0">Films</h4>
            <b-list-group flush>
              <b-list-group-item
                v-for="film in info.films"
                :key="film.id"
                class="px-2"
              >
                <b-link :to="{ name: 'films.detail', params: { id: linkId(film) } }">
                  {{ film }}
                </b-link>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
      <b-col cols="12">
        <b-card-group deck class="mb-3">
          <b-card no-body v-if="info.starships.length">
            <h4 slot="header" class="mb-0">Starships</h4>
            <b-list-group flush>
              <b-list-group-item
                v-for="item in info.starships"
                :key="item.id"
                class="px-2"
              >
                {{ item }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card no-body v-if="info.species.length">
            <h4 slot="header" class="mb-0">Species</h4>
            <b-list-group flush>
              <b-list-group-item
                v-for="item in info.species"
                :key="item.id"
                class="px-2"
              >
                {{ item }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
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
