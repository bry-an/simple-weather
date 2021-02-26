<template>
  <div class="footer">
    <Day
      v-for="day in daily"
      :key="day.startTime"
      :day="day"
      :is-selected-day="isSelectedDay(day)"
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
      console.log('day', day)
      return (
        new Date(day.startTime).toString().slice(0, 15) ===
        new Date(this.selectedDayDt).toString().slice(0, 15)
      )
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
}
</style>
