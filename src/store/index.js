import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDay: null,
    dailyIsLoading: false,
    hourlyIsLoading: false,
    currentIsLoading: false,
    currentWeather: null,
    hourlyWeather: null,
    dailyWeather: null,
    city: ''
  },
  getters: {
    daily(state) {
      return state.dailyWeather?.daily
    },
    hourly(state) {
      return state.hourlyWeather?.properties.periods
    },
    current(state) {
      return state.currentWeather
    },
    selectedDayDt(state) {
      return state.selectedDay?.dt
    }
  },
  mutations: {
    SET_DAILY_WEATHER(state, dailyWeather) {
      state.dailyWeather = dailyWeather
    },
    SET_HOURLY_WEATHER(state, hourlyWeather) {
      state.hourlyWeather = hourlyWeather
    },
    SET_CURRENT_WEATHER(state, currentWeather) {
      state.currentWeather = currentWeather
    },
    SET_SELECTED_DAY(state, day) {
      state.selectedDay = day
    }
  },
  actions: {
    async getCurrentWeather({ state, commit }, cityName) {
      state.currentIsLoading = true
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f3d7426d2e77aa4e3212b0537db8d3a8`
      const response = await axios.get(url)
      commit('SET_CURRENT_WEATHER', response.data)
      state.currentIsLoading = false
    },
    async getHourlyWeather({ state, commit }, { lat, lon }) {
      state.hourlyIsLoading = true
      const url = `https://api.weather.gov/gridpoints/BOU/${lat},${lon}/forecast/hourly`
      const response = await axios.get(url)
      commit('SET_HOURLY_WEATHER', response.data)
      state.hourlyIsLoading = false
    },
    async getDailyWeather({ state, commit }, { lat, lon }) {
      state.dailyIsLoading = true
      const url = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=f3d7426d2e77aa4e3212b0537db8d3a8`
      const response = await axios.get(url)
      commit('SET_DAILY_WEATHER', response.data)
      state.dailyIsLoading = false
      // let's leave it
      // snake_case_kinda_looks_like_a_snake
      ;`
      _________         _________
      /         \       /         \
     /  /~~~~~\  \     /  /~~~~~\  \
     |  |     |  |     |  |     |  |
     |  |     |  |     |  |     |  |
     |  |     |  |     |  |     |  |         /
     |  |     |  |     |  |     |  |       //
    (o  o)    \  \_____/  /     \  \_____/ /
     \__/      \         /       \        /
      |         ~~~~~~~~~         ~~~~~~~~
      ^
    `
    }
  }
})
