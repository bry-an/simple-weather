import { ApiClient } from './BaseApiClient.js'

const vueportServiceClient = new ApiClient({
  resource: `${process.env.VUE_APP_API_BASE_URL}/weather`
})

export default {
  getCityWeather: (city) => vueportServiceClient.get(city)
}
