<template>
  <div class="header">
    <CurrentWeather :selectedDay="selectedDay" />
    <Chart />
    <div v-if="hourlyIsLoaded" class="hours">
      <Hour v-for="hourData in hourlyEight" :hourData="hourData" :key="hourData.number" />
    </div>
    <div v-else class="hours">
      Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentWeather from '@C/CurrentWeather'
import Chart from '@C/Chart'
import Hour from '@C/Hour'

export default {
  name: 'CardHeader',
  components: { CurrentWeather, Chart, Hour },
  props: {},
  computed: {
    ...mapGetters(['hourly', 'selectedDay', 'selectedDayDt', 'hourlyIsLoaded']),
    hourlyEight() {
      return [
        this.hourly[0],
        this.hourly[3],
        this.hourly[6],
        this.hourly[9],
        this.hourly[12],
        this.hourly[15],
        this.hourly[18],
        this.hourly[21]
      ]
    }
  }
}
</script>

<style scoped>
.header {
  padding: 20px 20px 0 20px;
  border: 1px solid black;
}

.hours {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
