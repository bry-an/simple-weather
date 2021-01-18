/* eslint-disable no-useless-escape */
import Vue from 'vue'
import Vuex from 'vuex'
import { openWeatherMapClient, nwsClient } from '../serviceClients/index.js'
import { dateParser, createChartData } from '../utilities/index.js'
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
    if (!state.selectedDay) return true // if user has not selected a day, should default to first day selected
    if (!state.dailyWeather) return false
    return state.selectedDay.dt === state.dailyWeather.daily[0].dt
  },
  firstHour(state) {
    return state.hourlyWeather?.properties.periods[0]
  }
}
const mutations = {
  SET_HOURLY_WEATHER(state, hourlyWeather) {
    state.hourlyWeather = hourlyWeather
  },
  SET_HOURLY_EIGHT(state, hourlyEightWeather) {
    state.hourlyEightWeather = hourlyEightWeather
  },
  SET_HOURLY_EIGHT_CHART_DATA(state, hourlyChartData) {
    state.hourlyChartData = hourlyChartData
  },
  SET_UNIT(state, unit) {
    state.temperatureUnit = unit
  },
  FETCH_WEATHER_END(state, weather) {
    state.selectedDay = weather.daily[0]
    state.dailyWeather = weather
    state.currentWeather = weather.current
    state.dailyIsLoaded = true
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
    // set browser-derived location if one exists
    if (state.currentPosition) {
      lat = state.currentPosition.lat
      lon = state.currentPosition.lng
    }
    state.hourlyIsLoaded = false
    return nwsClient
      .getHourlyWeather({ lat, lon })
      .then((hourlyWeather) => {
        commit('SET_HOURLY_WEATHER', hourlyWeather)
        state.hourlyIsLoaded = true
        return hourlyWeather
      })
      .catch((e) => console.error(JSON.stringify(e)))
  },
  setSelectedDay({ state, dispatch }, day) {
    state.selectedDay = day
    dispatch('getHourlyEight')
  },
  getAllWeather({ dispatch }, coords) {
    return dispatch('getDailyWeather', coords)
      .then(() => dispatch('getHourlyWeather', coords))
      .then((res) => (res ? dispatch('getHourlyEight') : null))
  },
  getDailyWeather({ state, commit }, coords) {
    // get daily weather for next  days
    state.dailyIsLoaded = false
    return openWeatherMapClient
      .getDailyWeather(coords)
      .then((response) => {
        const weather = response && response.data
        commit('FETCH_WEATHER_END', weather)
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
      })
      .catch((e) => console.error('Error getting daily weather', JSON.stringify(e)))
  },
  getHourlyEight({ commit, state, dispatch }) {
    const hourlyEightData = dateParser({
      selectedDay: state.selectedDay,
      hourlyWeather: state.hourlyWeather
    })
    commit('SET_HOURLY_EIGHT', hourlyEightData)
    dispatch('createChartData')
  },
  createChartData({ state, commit }) {
    const chartData = createChartData(state.hourlyEightWeather)
    commit('SET_HOURLY_EIGHT_CHART_DATA', chartData)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
