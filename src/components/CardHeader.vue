<template>
  <div class="header" v-if="weatherIsLoaded">
    <CurrentWeather :selected-dDay="selectedDay" />
    <div v-if="hourlyChartData" class="chart-wrapper">
      <Chart />
    </div>
    <div v-else>:(</div>
    <div class="hours">
      <Hour v-for="hourData in hourlyEight" :hourData="hourData" :key="hourData.number" />
    </div>
  </div>
  <div v-else class="hours">Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentWeather from '@C/CurrentWeather'
import Chart from '@C/Chart'
import Hour from '@C/Hour'

export default {
  name: 'CardHeader',
  components: { CurrentWeather, Chart, Hour },
  computed: {
    ...mapGetters(['selectedDay', 'weatherIsLoaded', 'hourlyEight', 'hourlyChartData'])
  }
}
</script>

<style scoped>
.header {
  padding: 20px 20px 0 20px;
}

.hours {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.chart-wrapper {
  position: relative;
  height: 100px;
  width: 90%;
  margin: auto;
}
</style>
