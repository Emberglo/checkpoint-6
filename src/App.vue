<template>
  <div id="app" class="row justify-content-between">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import { computed } from 'vue'
import { AppState } from './AppState'

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  font-family: 'Roboto', sans-serif;
  height: 100%;
  background-color: #D0D0D0;
}
</style>
