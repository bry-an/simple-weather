// ! available icons - add as you go
// 'partly-cloudy-day.svg'
// 'cloudy.svg'
// 'clear-day.svg'
// 'partly-cloudy-day.svg'
//  'snow.svg'
//  'rain.svg'

export default {
  methods: {
    iconUrl(weatherShortDescription) {
      const getIcon = (description) => {
        let icon = ''
        if (description.includes('snow')) icon = 'snow'
        // prettier-ignore
        if (description.includes('partly') && description.includes('sunny')) icon = 'partly-cloudy-day'
        // prettier-ignore
        if (description.includes('sunny') || description.includes('clear')) icon = 'clear-day'
        if (description.includes('cloudy')) icon = 'cloudy'
        if (description.includes('rain')) icon = 'rain'
        return icon || 'clear-day'
      }
      weatherShortDescription = weatherShortDescription.toLowerCase()
      const icon = getIcon(weatherShortDescription)
      return `${process.env.VUE_APP_ICON_BASE_URL}/${icon}.svg`
    }
  }
}
