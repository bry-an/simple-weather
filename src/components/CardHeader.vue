<template>
  <div class="header">
    <CurrentWeather />
    <Chart />
    <div class="hours">
      <Hour :key="item" v-for="item in items" />
    </div>
  </div>
</template>

<script>
import CurrentWeather from '@C/CurrentWeather'
import Chart from '@C/Chart'
import Hour from '@C/Hour'
import { mapGetters } from 'vuex'

export default {
  name: 'CardHeader',
  components: { CurrentWeather, Chart, Hour },
  props: {},
  computed: {
    ...mapGetters(['hourly'])
  },
  data: () => ({
    currentDay: null,
    items: [1, 2, 3, 4, 5, 6, 7, 8]
  })
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
