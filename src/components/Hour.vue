<template>
  <div class="hour-container">
    <div class="temp">{{ temp }}°</div>
    <div class="hour">{{ hour }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tempConversionMixin from '../mixins/tempConversion.js'
export default {
  name: 'Hour',
  props: { hourData: { type: Object, required: true } },
  computed: {
    ...mapGetters(['fahrenheit']),
    temp() {
      const temp = this.hourData.temperature
      return this.fahrenheit ? temp : this.fahrenheitToCelsius(temp)
    },
    hour() {
      const hr24 = new Date(this.hourData.startTime).getHours()
      return hr24 > 12 ? hr24 - 12 + 'PM' : hr24 === 0 ? 12 + 'AM' : hr24 + 'AM'
    }
  },
  mixins: [tempConversionMixin]
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
