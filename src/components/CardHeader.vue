<template>
  <div class="header">
    <CurrentWeather />
    <Chart />
    <div class="row flex-even">
      <Hour />
      <Hour />
      <Hour />
      <Hour />
      <Hour />
      <Hour />
      <Hour />
      <Hour />
    </div>
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
.header {
  min-height: 200px;
  border: 1px solid black;
  padding: 20px;
}
.header > * {
  margin: 20px auto;
  width: 95%;
}
</style>
