<template>
  <div style="card-wrapper"><CardHeader /> <CardFooter /></div>
</template>

<script>
import CardHeader from '@C/CardHeader'
import CardFooter from '@C/CardFooter'

export default {
  name: 'Card',
  components: {
    CardHeader,
    CardFooter
  },
  props: {},
  data: () => ({}),
  created() {
    this.$store.dispatch('getDailyWeather', { lat: 39.742043, lon: -104.991531 })
  }
}
</script>

<style scoped>
.card-wrapper {
  width: 60%;
}
</style>
