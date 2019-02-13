<template>
  <div>
    <div class="d-flex justify-content-around p-2 bg-dark">
      <div class="p-2">
        <router-link class="text-light" :to="{ name: 'home' }">
          <font-awesome icon="home" /> Home
        </router-link>
      </div>
      <div class="p-2">
        <router-link class="text-light" :to="{ name: 'people' }">
          <font-awesome icon="users" /> People
        </router-link>
      </div>
      <div class="p-2">
        <router-link class="text-light" :to="{ name: 'films' }">
          <font-awesome icon="film" /> Films
        </router-link>
      </div>
    </div>
  </div>
</template>
