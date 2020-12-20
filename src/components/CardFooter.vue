<template>
  <div class="footer">
    <div class="row flex-even">
      <Day
        :key="day.dt"
        v-for="day in daily"
        :day="day"
        :is-selected-day="selectedDayDt === day.dt"
      />
    </div>
  </div>
</template>

<script>
import Day from '@C/Day'
import { mapGetters } from 'vuex'

export default {
  name: 'CardFooter',
  components: { Day },
  props: {},
  computed: {
    ...mapGetters(['daily', 'selectedDayDt'])
  },
  methods: {
    isSelectedDay(day) {
      return day.dt === this.selectedDay.dt
    }
  }
}
</script>

<style scoped>
.footer {
  min-height: 100px;
  border: 1px solid black;
}
.footer > * {
  margin: 20px auto;
}
</style>
