<template>
  <div @click="selectDay" :class="['day-container', { 'selected-day': isSelectedDay }]">
    <div class="day">{{ dayOfTheWeek }}</div>
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
    },
    isSelectedDay: {
      type: Boolean,
      default: false
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
      this.$store.commit('SET_SELECTED_DAY', this.day)
    }
  }
}
</script>

<style scoped>
.day-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 20px;
  cursor: pointer;
  padding: 1rem;
  border: 1.4px solid #ffffffff;
}
.day-container.selected-day {
  opacity: 1;
  border: 1.4px solid gray;
}
.day-container > * {
  margin: 3px;
}
.temp-min {
  color: gray;
}
</style>
