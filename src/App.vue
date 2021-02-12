<template>
  <div id="app">
    <location-autocomplete />
    <div class="card"><Card /></div>
  </div>
</template>

<script>
import Card from '@C/Card.vue'
import LocationAutocomplete from '@C/Autocomplete/LocationAutocomplete.vue'

export default {
  name: 'App',
  components: {
    LocationAutocomplete,
    Card
  },
  data: () => ({}),
  computed: {},
  methods: {},
}
</script>

<style>
@import './assets/reset.css';
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.card {
  width: 645px;
  margin: auto;
}
</style>
