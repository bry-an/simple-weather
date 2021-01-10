<template>
  <div class="header">
    <CurrentWeather :selectedDay="selectedDay" />
    <Chart :chartData="chartData" :chartOptions="chartOptions" />
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
  data: () => ({
    chartData: {
      datasets: [
        {
          label: 'Weather Data I am the cool label',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          fill: false,
          data: [
            {
              x: 1,
              y: 1
            },
            {
              x: 2,
              y: 2
            },
            {
              x: 1,
              y: 1
            },
            {
              x: 1,
              y: 1
            }
          ]
        }
      ]
    },
    chartOptions: {
      gridLines: {
        display: false
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Time Point Data'
        }
      },
      scales: {
        x: {
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          },
          gridLines: {
            display: false
          },
          ticks: {
            display: true,
            color: '#00ffff'
          }
        },
        y: {
          gridLines: {
            display: false
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temp'
          },
          ticks: {
            display: false
          }
        }
      }
    }
  }),
  computed: {
    ...mapGetters(['selectedDay', 'hourlyIsLoaded', 'hourlyEight'])
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
