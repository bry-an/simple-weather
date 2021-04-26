import { ApiClient } from './BaseApiClient.js'

const citySearchClient = new ApiClient({
  resource: `${process.env.VUE_APP_API_BASE_URL}/city/search`
})

export default {
  getCityData: (searchTerm) => citySearchClient.get(`${searchTerm}`)
}
