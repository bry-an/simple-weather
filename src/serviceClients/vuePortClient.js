import { ApiClient } from './BaseApiClient.js'

const vueportServiceClient = new ApiClient({
  resource: 'https://vueport.io/api/weather/'
})

export default {
  getCityWeather: (city) => vueportServiceClient.get(city)
}
