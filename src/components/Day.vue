<template>
  <div class="day flex-center">
    <div>Thu</div>
    <img
      src="https://duckduckgo.com/assets/weather/svg/new/snow.svg"
      alt="it's really frosty, but I like it"
    />
    <div>44°</div>
    <div>28°</div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    active: { type: Boolean, default: false },
    dayOfTheWeek: { type: String, required: true },
    skyCover: { type: String, required: true },
    tempMax: { type: Number, required: true },
    tempMin: { type: Number, required: true }
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
</style>
