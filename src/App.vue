<template>
  <div id="app">
    <div id="nav">
      <PageHeader />
    </div>
    <b-container class="my-4">
      <router-view />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import PageHeader from "@/components/PageHeader";

export default {
  name: "home",
  components: {
    PageHeader
  }
};
</script>
