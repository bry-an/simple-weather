<template>
  <div class="hour-container">
    <div class="temp">29°</div>
    <div class="hour">10PM</div>
  </div>
</template>

<script>
export default {
  name: 'Hour',
  props: {}
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
