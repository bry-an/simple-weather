<template>
  <div id="header">
    <h2>Header</h2>
    <CurrentWeather />
    <Chart />
    <Hour />
  </div>
</template>

<script>
import CurrentWeather from '@C/CurrentWeather'
import Chart from '@C/Chart'
import Hour from '@C/Hour'

export default {
  name: 'CardHeader',
  components: { CurrentWeather, Chart, Hour },
  props: {}
}
</script>

<style scoped>
#header {
  margin: auto;
  height: 200px;
  width: 60%;
  border: 1px solid black;
}
#header > * {
  margin: 20px auto;
}
</style>
