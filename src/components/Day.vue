<template>
  <div @click="selectDay" :class="['day-container', { 'selected-day': isSelectedDay }]">
    <div class="day">{{ dayOfTheWeek }}</div>
    <img
      :src="iconUrl(weatherShortDescription)"
      alt="it's really frosty, but I like it"
    />
    <div>{{ tempMax }}°</div>
    <div class="temp-min">{{ tempMin }}°</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tempConversionMixin from '../mixins/tempConversion.js'
import iconUrl from '../mixins/iconUrl.js'
import { dailyMinMax } from '../utilities/dateParser.js'

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
  mixins: [tempConversionMixin, iconUrl],
  data: () => ({}),
  computed: {
    ...mapGetters(['fahrenheit']),
    weatherShortDescription() {
      return this.day.shortForecast
    },
    dayOfTheWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        new Date(this.day.startTime).getDay()
      ]
    },
    tempMax() {
      // ! only one temp exists
      const { max } = dailyMinMax({
        selectedDay: this.day,
        hourlyWeather: this.$store.state.hourlyWeather
      })
      return this.fahrenheit ? max : this.fahrenheitToCelsius(max)
    },
    tempMin() {
      // ! only one temp exists
      const { min } = dailyMinMax({
        selectedDay: this.day,
        hourlyWeather: this.$store.state.hourlyWeather
      })
      return this.fahrenheit ? min : this.fahrenheitToCelsius(min)
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
  width: 100px;
  flex: 1;
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
