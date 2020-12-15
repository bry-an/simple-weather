<template>
  <div><CardHeader /> <CardFooter /></div>
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
  created() {
    this.$store.dispatch('getDailyWeather', { lat: 39.742043, lon: -104.991531 })
  }
}
</script>

<style scoped></style>
