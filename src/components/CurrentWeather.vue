<template>
  <div class="current-weather">
    <div class="row">Denver, CO</div>
    <div class="row">Thursday 10 PM · Light Snow</div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {}
}
</script>

<style scoped>
.current-weather > * {
  margin: 10px;
}
</style>
