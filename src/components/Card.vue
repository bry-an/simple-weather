<template>
  <div><CardHeader /><CardFooter /></div>
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
</style>
