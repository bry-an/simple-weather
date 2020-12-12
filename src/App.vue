<template>
  <div id="app">
    <h1>Simple Weather</h1>
    <Card />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-even {
  justify-content: space-evenly;
}
</style>
