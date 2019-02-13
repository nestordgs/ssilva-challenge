<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      class="img-fluid mx-auto d-block"
    />
    <b-row>
      <b-col cols="12" md="8" class="mx-auto">
        <P>Welcome to this Web App build with:</P>
        <ul>
          <li>Vue</li>
          <li>Vuex</li>
          <li>Vue-Router</li>
          <li>Bootstrap-Vue</li>
        </ul>
      </b-col>
      <b-col cols="12" md="8" class="mx-auto">
        <p>
          In this app you can get information from
          <router-link class="text-success" :to="{ name: 'people' }">
            <span class="font-weight-bold">People (people)</span>
          </router-link>
          from Start Wars Universe, also, can get information from all
          <router-link class="text-success" :to="{ name: 'films' }">
            <span class="font-weight-bold">Films (Episodes)</span>.
          </router-link>
        </p>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="12" md="8" class="mx-auto">
        If you want to see the code, could go to the repo in
        <a href="https://github.com/nestordgs/ssilva-challenge" target="_blank">
          GitHub
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>
