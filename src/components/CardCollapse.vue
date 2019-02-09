<template>
  <b-card no-body>
    <b-card-header header-tag="header" class="p-1" role="tab">
      <h4 class="mb-0 text-capitalize" v-b-toggle="`${title}Collapse`">
        {{ title }}
      </h4>
    </b-card-header>
    <b-collapse
      :id="`${title}Collapse`"
      :accordion="`${title}-accordion`"
      role="tabpanel"
    >
      <b-card-body class="p-0">
        <b-list-group flush v-if="data.length > 0">
          <b-list-group-item v-for="item in data" :key="item.id">
            <span
              v-if="details"
              class="cursor-pointer"
              @click="getCharacter(item)"
            >
              {{ item }}
            </span>
            <span v-else>
              {{ item }}
            </span>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item>
            No <span class="text-capitalize">{{ title }}</span> in this film.
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "cardCollapse",
  props: {
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    details: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getCharacter(item) {
      let parts = item.split("/");
      let lastSegment = parts.pop() || parts.pop();
      this.$store.dispatch("getCharacter", lastSegment);
      this.$root.$emit("bv::show::modal", "modalDetail");
    }
  }
};
</script>
