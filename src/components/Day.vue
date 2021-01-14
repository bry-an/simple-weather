<template>
  <div @click="selectDay" :class="['day-container', { 'selected-day': isSelectedDay }]">
    <div class="day">{{ dayOfTheWeek }}</div>
    <img :src="iconUrl" alt="it's really frosty, but I like it" />
    <div>{{ tempMax }}°</div>
    <div class="temp-min">{{ tempMin }}°</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tempConversionMixin from '../mixins/tempConversion.js'
export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      default: () => ({})
    },
    isSelectedDay: {
      type: Boolean,
      default: false
    }
  },
  mixins: [tempConversionMixin],
  data: () => ({}),
  computed: {
    ...mapGetters(['fahrenheit']),
    dayOfTheWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        new Date(this.day.dt * 1000).getDay()
      ]
    },
    tempMax() {
      const temp = Math.round(this.day.temp.max)
      return this.fahrenheit ? temp : this.fahrenheitToCelsius(temp)
    },
    tempMin() {
      const temp = Math.round(this.day.temp.min)
      return this.fahrenheit ? temp : this.fahrenheitToCelsius(temp)
    },
    iconUrl() {
      // return 'https://openweathermap.org/img/wn/' + this.day?.weather[0].icon + '.png'
      let icon = ''
      switch (this.day?.weather[0].description) {
        case 'overcast clouds':
          icon = 'partly-cloudy-day.svg'
          break
        case 'scattered clouds':
          icon = 'cloudy.svg'
          break
        case 'broken clouds':
          icon = 'cloudy.svg'
          break
        case 'clear sky':
          icon = 'clear-day.svg'
          break
        case 'few clouds':
          icon = 'partly-cloudy-day.svg'
          break
        case 'snow':
          icon = 'snow.svg'
          break
        case 'light snow':
          icon = 'snow.svg'
          break
        case 'moderate rain':
          icon = 'rain.svg'
          break
        case 'light rain':
          icon = 'rain.svg'
          break
        // clear-night.svg
        // wind.svg
        default:
          return 'https://place-hold.it/50&text=icon'
      }
      return `https://duckduckgo.com/assets/weather/svg/new/${icon}`
    }
  },
  methods: {
    selectDay() {
      this.$store.dispatch('setSelectedDay', this.day)
    }
  }
}
</script>

<style scoped>
.day-container {
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;
  border-right: 1.4px solid gray;
  border-top: 1.4px solid gray;
}
.day-container.selected-day {
  opacity: 1;
  background-color: #eeeeee;
  border-top: 1.5px solid black;
}
.day-container:last-child {
  border-right: none;
}
.day-container > * {
  margin: 3px;
}
.temp-min {
  color: gray;
}
</style>
