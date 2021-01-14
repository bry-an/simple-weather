export default {
  methods: {
    fahrenheitToCelsius(f) {
      if (!f && f !== 0) return 1
      return Math.round((f - 32) / 1.8)
    }
  }
}
