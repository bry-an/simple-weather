<template>
  <div class="footer">
    <Day
      :key="day.dt"
      v-for="day in daily"
      :day="day"
      :is-selected-day="selectedDayDt === day.dt"
    />
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
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  overflow-x: auto;
  justify-content: space-between;
}
</style>
