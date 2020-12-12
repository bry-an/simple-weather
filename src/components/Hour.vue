<template>
  <div class="hour flex-center">
    <div>29°</div>
    <div>10PM</div>
  </div>
</template>

<script>
export default {
  name: 'Hour',
  props: {
    time: { type: Number, required: true },
    temp: { type: Number, required: true }
  }
}
</script>

<style scoped>
.hour {
  height: 30px;
  flex-direction: column;
}
.hour > * {
  margin: 5px;
}
</style>
