<template>
  <div class="footer">
    <div class="row flex-even">
      <Day :key="item" v-for="item in items" />
    </div>
  </div>
</template>

<script>
import Day from '@C/Day'

export default {
  name: 'CardFooter',
  components: { Day },
  props: {},
  data: () => ({ items: [1, 2, 3, 4, 5, 6, 7] })
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


