/* eslint-disable no-useless-escape */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDay: null,
    dailyIsLoaded: false,
    hourlyIsLoaded: false,
    currentIsLoaded: false,
    currentWeather: null,
    hourlyWeather: null,
    hourlyEightWeather: null,
    hourlyChartData: null,
    dailyWeather: null,
    city: '',
    temperatureUnit: 'f'
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
    selectedDay(state) {
      return state.selectedDay
    },
    selectedDayDt(state) {
      return state.selectedDay?.dt
    },
    hourlyIsLoaded(state) {
      return state.hourlyIsLoaded
    },
    hourlyEight(state) {
      return state.hourlyEightWeather
    },
    hourlyChartData(state) {
      return state.hourlyChartData
    },
    fahrenheit(state) {
      return state.temperatureUnit === 'f'
    },
    temperatureUnit(state) {
      return state.temperatureUnit
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
    SET_HOURLY_EIGHT(state, hourlyEightWeather) {
      state.hourlyEightWeather = hourlyEightWeather
    },
    SET_HOURLY_EIGHT_CHART_DATA(state, hourlyChartData) {
      state.hourlyChartData = hourlyChartData
    },
    SET_UNIT(state, unit) {
      state.temperatureUnit = unit
    }
  },
  actions: {
    async getCurrentWeather({ state, commit }, cityName) {
      state.currentIsLoaded = false
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f3d7426d2e77aa4e3212b0537db8d3a8`
      const response = await axios.get(url)
      commit('SET_CURRENT_WEATHER', response.data)
      state.currentIsLoaded = true
    },
    getHourlyWeather({ state, commit }, { lat, lon }) {
      state.hourlyIsLoaded = false
      const initialUrl = `https://api.weather.gov/points/${lat},${lon}`
      return axios.get(initialUrl).then((initialResponse) => {
        const hourlyForecastUrl = initialResponse.data.properties.forecastHourly
        return axios.get(hourlyForecastUrl).then((hourlyResponse) => {
          commit('SET_HOURLY_WEATHER', hourlyResponse.data)
          state.hourlyIsLoaded = true
        })
      })
    },
    setSelectedDay({ state, dispatch }, day) {
      state.selectedDay = day
      dispatch('getHourlyEight')
    },
    async getDailyWeather({ state, commit, dispatch }, { lat, lon }) {
      state.dailyIsLoaded = false
      const url = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=f3d7426d2e77aa4e3212b0537db8d3a8`
      const response = await axios.get(url)
      commit('SET_DAILY_WEATHER', response.data)
      await dispatch('getHourlyWeather', { lat, lon }) // await this response, before we call:
      dispatch('setSelectedDay', response.data.daily[0])
      state.dailyIsLoaded = true // let's leave it
      // snake_case_kinda_looks_like_ar_snake
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
    },
    getHourlyEight({ state, commit, dispatch }) {
      const dateSelected = new Date(state.selectedDay.dt * 1000)
      const dateRightNow = new Date()
      // figure out where to start

      // assuming the selected day is the same as the day it is right now by default
      let x = 0

      // if not then finding where to start
      if (dateSelected.toString().slice(0, 15) !== dateRightNow.toString().slice(0, 15)) {
        const index = state.hourlyWeather.properties.periods.findIndex(
          (i) =>
            new Date(i.startTime).toString().slice(0, 15) ===
            dateSelected.toString().slice(0, 15)
        )
        x = index >= 0 ? index : NaN
      }

      const hourlyEightData = [
        state.hourlyWeather.properties.periods[x + 0],
        state.hourlyWeather.properties.periods[x + 3],
        state.hourlyWeather.properties.periods[x + 6],
        state.hourlyWeather.properties.periods[x + 9],
        state.hourlyWeather.properties.periods[x + 12],
        state.hourlyWeather.properties.periods[x + 15],
        state.hourlyWeather.properties.periods[x + 18],
        state.hourlyWeather.properties.periods[x + 21]
      ]
      commit('SET_HOURLY_EIGHT', hourlyEightData)
      dispatch('createChartData')
    },
    createChartData({ state, commit }) {
      const chartData = state.hourlyEightWeather.map((hour) => ({
        x: new Date(hour.startTime),
        y: hour.temperature
      }))
      commit('SET_HOURLY_EIGHT_CHART_DATA', chartData)
    }
  }
})
