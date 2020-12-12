<template>
  <div id="footer">
    <h2>Footer</h2>
    <div class="flex-h">
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
#footer {
  margin: auto;
  height: 200px;
  width: 60%;
  border: 1px solid black;
}
#footer > * {
  margin: 20px auto;
}
.flex-h {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
