<template>
  <div>Day</div>
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
</style>
