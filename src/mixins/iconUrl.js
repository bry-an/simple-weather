export default {
  methods: {
    iconUrl(weatherShortDescription) {
      const getIcon = (description) => {
        let icon = ''
        if (description.includes('snow')) icon = 'snow'
        if (description.includes('partly') && description.includes('sunny'))
          icon = 'partly-cloudy-day'
        if (description.includes('sunny') || description.includes('clear'))
          icon = 'clear-day'
        if (description.includes('cloudy')) icon = 'clear-day'
        if (description.includes('rain')) icon = 'rain'
        return icon || 'clear-day'
      }
      weatherShortDescription = weatherShortDescription.toLowerCase()
      const icon = getIcon(weatherShortDescription)
      return `https://duckduckgo.com/assets/weather/svg/new/${icon}.svg`
    }
  }
}
