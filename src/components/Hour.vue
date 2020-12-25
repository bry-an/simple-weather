<template>
  <div class="hour-container">
    <div class="temp">{{ temp }}°</div>
    <div class="hour">{{ hour }}</div>
  </div>
</template>

<script>
export default {
  name: 'Hour',
  props: { hourData: { type: Object, required: true } },
  computed: {
    temp() {
      return this.hourData.temperature
    },
    hour() {
      const hr24 = new Date(this.hourData.endTime).getHours()
      return hr24 > 12 ? hr24 - 12 + 'PM' : hr24 === 0 ? 12 + 'AM' : hr24 + 'AM'
    }
  }
}
</script>

<style scoped>
.hour-container {
  min-height: 50px;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.temp {
  font-weight: bold;
}
.hour {
  color: grey;
}
</style>
