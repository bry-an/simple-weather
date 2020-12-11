<template>
  <div>
    <h1>Hi!</h1>
    <input :placeholder="msg" />
    <button @click="submit">Click me</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: { type: String, required: false },
    type: { type: String, required: false }
  },
  data: () => ({}),
  methods: {
    submit: function () {
      this.$emit('submit', 1, 2, 3)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
