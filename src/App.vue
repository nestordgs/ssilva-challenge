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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
