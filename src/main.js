import Vue from 'vue'
import { mapActions } from 'vuex'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
  created() {
    // const unsubscribe =
    store.subscribe((mutation) => {
      console.log(mutation)
      // doesn't work because it runs before the API response comes back
      // ok it actually does work but will it always work?
      if (mutation.type === 'SET_SELECTED_DAY') {
        this.$store.dispatch('getHourlyEight')
      }
    })

    // you may call unsubscribe to stop the subscription
    // unsubscribe()
  },
  methods: {
    ...mapActions(['getHourlyEight'])
  }
}).$mount('#app')
