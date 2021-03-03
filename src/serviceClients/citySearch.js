import { ApiClient } from './BaseApiClient.js'

const citySearchClient = new ApiClient({ resource: 'https://vueport.io/api/city/search' })

export default {
  getCityData: (searchTerm) => citySearchClient.get(`${searchTerm}`)
}
