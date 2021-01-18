import { ApiClient } from './BaseApiClient.js'

const openWeatherMapService = new ApiClient('https://api.openweathermap.org/data/2.5/')

export default {
  getDailyWeather: ({ lat, lon }) =>
    openWeatherMapService.get(
      `onecall?units=imperial&lat=${lat}&lon=${lon}&appid=f3d7426d2e77aa4e3212b0537db8d3a8`
    )
}
