import { ApiClient } from './BaseApiClient.js'

const nwsClient = new ApiClient({
  resource: process.env.VUE_APP_NATIONAL_WEATHER_SERVICE_BASE_URL
})
const baseClient = new ApiClient()

export default {
  getHourlyWeather: ({ lat, lon }) =>
    nwsClient.get(`points/${lat},${lon}`).then((res) => {
      const hourlyForecastUrl = res.data.properties.forecastHourly
      return baseClient.get(hourlyForecastUrl).then((res) => res.data)
    })
}
