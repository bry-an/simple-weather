<template>
  <div id="app">
    <div class="card"><Card /></div>
  </div>
</template>

<script>
import Card from '@C/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  data: () => ({}),
  computed: {},
  methods: {}
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
  width: 60%;
  margin: auto;
}
</style>
