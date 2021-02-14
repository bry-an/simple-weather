export default {
  methods: {
    iconUrl(weatherShortDescription) {
      // * 'https://openweathermap.org/img/wn/' + this.day?.weather[0].icon + '.png'
      let icon = ''
      // ! available icons - add as you go
      // 'partly-cloudy-day.svg'
      // 'cloudy.svg'
      // 'clear-day.svg'
      // 'partly-cloudy-day.svg'
      //  'snow.svg'
      //  'rain.svg'
      switch (weatherShortDescription) {
        case 'Light Snow':
        case 'Chance Light Snow':
        case 'Slight Chance Light Snow':
          icon = 'snow.svg'
          break
        case 'Partly Sunny':
          icon = 'partly-cloudy-day.svg'
          break
        case 'Sunny':
        case 'Clear':
        case 'Mostly Sunny':
        case 'Mostly Clear':
          icon = 'clear-day.svg'
          break
        case 'Cloudy':
        case 'Mostly Cloudy':
        case 'Partly Cloudy':
        case 'Chance Light Snow then Mostly Cloudy':
        case 'Slight Chance Light Snow then Partly Cloudy':
        case 'Mostly Cloudy then Slight Chance Light Snow':
          icon = 'cloudy.svg'
          break
        case 'Rain':
        case 'Light Rain':
        case 'Light Rain Likely then Partly Cloudy':
        case 'Light Rain Likely then Freezing Rain Likely':
        case 'Rain And Snow Likely':
        case 'Chance Rain Showers':
        case 'Slight Chance Drizzle then Patchy Fog':
          icon = 'rain.svg'
          break
        default:
          return 'https://place-hold.it/50&text=icon'
      }
      return `https://duckduckgo.com/assets/weather/svg/new/${icon}`
    }
  }
}
