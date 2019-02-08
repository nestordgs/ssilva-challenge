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
        <h3>Species</h3>
      </b-col>
      <b-col cols="12">
        <h3>Starships</h3>
      </b-col>
      <b-col cols="12">
        <h3>Vehicles</h3>
      </b-col>
      <b-col cols="12">
        <h3>films</h3>
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
    }
  }
};
</script>
