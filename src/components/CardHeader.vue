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
      const dateSelected = new Date(this.selectedDayDt * 1000)
      const dateRightNow = new Date()
      // figure out where to start

      // assuming the selected day is the same as the day it is right now by default
      let x = 0

      // if not then finding where to start
      if (dateSelected.toString().slice(0, 15) !== dateRightNow.toString().slice(0, 15)) {
        const index = this.hourly.findIndex(
          (i) =>
            new Date(i.startTime).toString().slice(0, 15) ===
            dateSelected.toString().slice(0, 15)
        )
        x = index >= 0 ? index : NaN
      }
      return [
        this.hourly[x + 0],
        this.hourly[x + 3],
        this.hourly[x + 6],
        this.hourly[x + 9],
        this.hourly[x + 12],
        this.hourly[x + 15],
        this.hourly[x + 18],
        this.hourly[x + 21]
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
