import axios from 'axios'

export class ApiClient {
  constructor({ resource = '' } = {}) {
    this.axios = axios.create({
      baseURL: resource
    })
  }
  get(path) {
    return this.axios.get(path)
  }
  post(path, payload) {
    return this.axios.post(path, payload)
  }
}
