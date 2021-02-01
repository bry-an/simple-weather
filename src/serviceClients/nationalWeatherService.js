import { ApiClient } from './BaseApiClient.js'

const nwsClient = new ApiClient({ resource: 'https://api.weather.gov/' })
const baseClient = new ApiClient()

export default {
  getHourlyWeather: ({ lat, lon }) =>
    nwsClient.get(`points/${lat},${lon}`).then((res) => {
      const hourlyForecastUrl = res.data.properties.forecastHourly
      return baseClient.get(hourlyForecastUrl).then((res) => res.data)
    })
}
