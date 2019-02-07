<template>
  <div class="person">
    <h1>Films</h1>
    <b-row>
      <b-col>
        <b-table responsive striped hover small :fields="fields"></b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "films",
  data() {
    return {
      fields: [
        { sortable: "true", key: "name" },
        { sortable: "true", key: "planet" }
      ]
    };
  }
};
</script>
