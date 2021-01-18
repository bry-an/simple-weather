/* eslint-disable no-useless-escape */
import Vue from 'vue'
import Vuex from 'vuex'
import { openWeatherMapClient, nwsClient } from '../serviceClients/index.js'

Vue.use(Vuex)

const getDefaultState = () => ({
  selectedDay: null,
  dailyIsLoaded: false,
  hourlyIsLoaded: false,
  currentWeather: null,
  hourlyWeather: null,
  hourlyEightWeather: null,
  hourlyChartData: null,
  dailyWeather: null,
  city: '',
  temperatureUnit: 'f',
  currentPosition: null
})

const state = getDefaultState()

const getters = {
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
  },
  dayOneSelected(state) {
    if (!state.selectedDay) return true
    if (!state.dailyWeather) return false
    return state.selectedDay.dt === state.dailyWeather.daily[0].dt
  },
  firstHour(state) {
    return state.hourlyWeather?.properties.periods[0]
  }
}
const mutations = {
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
}
const actions = {
  getGeoLocation({ state }) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        state.currentPosition = coords
      })
    }
  },
  getHourlyWeather({ state, commit }, { lat, lon }) {
    if (state.currentPosition) {
      lat = state.currentPosition.lat
      lon = state.currentPosition.lng
    }
    state.hourlyIsLoaded = false
    return nwsClient.getHourlyWeather({ lat, lon }).then((hourlyWeather) => {
      commit('SET_HOURLY_WEATHER', hourlyWeather)
      state.hourlyIsLoaded = true
    })
  },
  setSelectedDay({ state, dispatch }, day) {
    state.selectedDay = day
    dispatch('getHourlyEight')
  },
  async getDailyWeather({ state, commit, dispatch }, { lat, lon }) {
    state.dailyIsLoaded = false
    const response = await openWeatherMapClient.getDailyWeather({ lat, lon })
    commit('SET_DAILY_WEATHER', response.data)
    commit('SET_CURRENT_WEATHER', response.data.current)
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
       |        ~~~~~~~~~         ~~~~~~~~
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

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
