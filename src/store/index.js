/* eslint-disable no-useless-escape */
import Vue from 'vue'
import Vuex from 'vuex'
import { citySearchClient, vueportClient } from '../serviceClients/index.js'
import { dateParser, createChartData } from '../utilities/index.js'
Vue.use(Vuex)

const getDefaultState = () => ({
  selectedDay: null,
  weatherIsLoaded: null,
  currentWeather: null,
  hourlyWeather: null,
  hourlyEightWeather: null,
  hourlyChartData: null,
  dailyWeather: null,
  temperatureUnit: 'f',
  currentPosition: null,
  citySearchResults: [],
  selectedCity: 'Denver, CO, United States of America',
  whatThreeWords: ''
})

const state = getDefaultState()

const getters = {
  daily(state) {
    return state.dailyWeather
  },
  hourly(state) {
    return state.hourlyWeather
  },
  current(state) {
    return state.currentWeather
  },
  selectedDay(state) {
    return state.selectedDay
  },
  selectedDayDt(state) {
    return state.selectedDay?.startTime
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
  citySearchResults(state) {
    return state.citySearchResults
  },
  selectedCity(state) {
    return state.selectedCity
  },
  weatherIsLoaded(state) {
    return state.weatherIsLoaded
  }
}
const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_CITY_SEARCH_RESULTS(state, results) {
    state.citySearchResults = results
  },
  SET_SELECTED_CITY(state, cityName) {
    state.selectedCity = cityName
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
    console.log('fetch weather end', weather)
    state.selectedDay = weather.hourlyForecast[0]
    // we receive two items for one day - 6 am and 6 pm
    // only using evening information from days (6 pm)
    state.dailyWeather = weather.dailyForecast.filter((i) => !i.isDaytime)
    state.currentWeather = weather.currentForecast
    state.hourlyWeather = weather.hourlyForecast
    state.weatherIsLoaded = true
  },
  SET_SELECTED_DAY(state, day) {
    state.selectedDay = day
  }
}
const actions = {
  // ! ??
  updateLocation({ dispatch, commit }, { name }) {
    commit('SET_SELECTED_CITY', name)
    dispatch('getWeather', name)
  },
  async runCitySearch({ commit }, searchTerm) {
    return citySearchClient.getCityData(searchTerm).then((response) => {
      if (response.data) {
        commit('SET_CITY_SEARCH_RESULTS', response.data)
      } else {
        console.error('Failed getting city search results')
      }
    })
  },
  // getGeoLocation({ state }) {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //       const coords = {
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude
  //       }
  //       state.currentPosition = coords
  //     })
  //   }
  // },
  getWeather({ state, commit, dispatch }, city) {
    state.weatherIsLoaded = false
    return vueportClient
      .getCityWeather(city)
      .then((response) => {
        // console.log(+'2') = 2
        // console.log(""+2)
        // console.log(Number.POSITIVE_INFINITY **-true)
        // const weather = !!(response && response.data)
        // 🕵️‍♀️🕵️‍♂️ infiltrating pm2 segfault with double bitwise OR
        if (response) {
          const weather = response.data
          commit('FETCH_WEATHER_END', weather)
          dispatch('getHourlyEight')
        }
        // snake_case_kinda_looks_like_a_snake
        `
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
        🐀
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
  },
  setSelectedDay({ commit, dispatch }, day) {
    commit('SET_SELECTED_DAY', day)
    dispatch('getHourlyEight')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
