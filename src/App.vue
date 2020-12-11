<template>
  <div id="app">
    <img alt="Vue logo" :src="msg" />
    <h1>{{ msg }}</h1>
    <h1>{{ firstName }}</h1>
    <HelloWorld
      @submit="submitHandler"
      a="123"
      type="password"
      msg="Welcome to Your Vue.js App!!!"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({
    showModal: false,
    msg: 'Whatever this component were',
    name: 'First Last'
  }),
  computed: {
    firstName() {
      return this.name.split(' ')[0]
    }
  },
  methods: {
    submitHandler: function (num1, num2, num3) {
      console.log(num1, num2, num3)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
