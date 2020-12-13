<template>
  <div @click="selectDay" class="day flex-center">
    <div>{{ dayOfTheWeek }}</div>
    <img :src="iconUrl" alt="it's really frosty, but I like it" />
    <div>{{ tempMax }}°</div>
    <div class="temp-min">{{ tempMin }}°</div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  computed: {
    dayOfTheWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        new Date(this.day.dt * 1000).getDay()
      ]
    },
    tempMax() {
      return Math.round(this.day.temp.max)
    },
    tempMin() {
      return Math.round(this.day.temp.min)
    },
    iconUrl() {
      return 'https://openweathermap.org/img/wn/' + this.day?.weather[0].icon + '.png'
    }
  },
  methods: {
    selectDay() {
      console.log('selecting', this.day)
      this.$store.commit('SET_ACTIVE_DAY', this.day)
    }
  }
}
</script>

<style scoped>
.day {
  min-height: 20px;
  flex-direction: column;
}

.day > * {
  margin: 3px;
}
.temp-min {
  color: gray;
}
</style>
