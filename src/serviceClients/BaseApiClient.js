import axios from 'axios'

export class ApiClient {
  constructor(resource) {
    this.axios = axios.create({
      baseUrl: resource
    })
  }
  get(path) {
    return this.axios.get(path)
  }
}
