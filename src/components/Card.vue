<template>
  <div class="card"><CardHeader /> <CardFooter /></div>
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
  props: {}
}
</script>

<style scoped>
.card {
  width: 60%;
  margin: auto;
}
</style>
