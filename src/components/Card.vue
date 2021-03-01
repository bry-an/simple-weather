<template>
  <div class="card-border"><CardHeader /> <CardFooter /></div>
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
    this.$store.dispatch('getWeather', 'Denver')
  }
}
</script>

<style scoped>
.card-border {
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 1px 1px 3px 3px #bbb;
}
</style>
