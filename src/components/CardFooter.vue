<template>
  <div class="footer">
    <div class="row flex-even">
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </div>
  </div>
</template>

<script>
import Day from '@C/Day'

export default {
  name: 'CardFooter',
  components: { Day },
  props: {}
}
</script>

<style scoped>
.footer {
  min-height: 100px;
  border: 1px solid black;
}
.footer > * {
  margin: 20px auto;
}
</style>
