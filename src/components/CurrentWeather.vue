<template>
  <div>
    <div class="current-weather">
      <div class="city">Denver, CO</div>
      <div class="synopsis">{{ selectedDate }}</div>
    </div>
    <div>
      <div class="weather-details">
        <div class="weather-overview">
          <div>
            <img :src="iconUrl" class="icon" alt="it's really frosty, but I like it" />
          </div>
          <div class="temp">
            {{ selectedTemp }}°
            <span class="unit-container">
              <span @click="selectUnit('f')" :class="['unit', { selected: fahrenheit }]"
                >F</span
              >
              /
              <span @click="selectUnit('c')" :class="['unit', { selected: !fahrenheit }]"
                >C</span
              >
            </span>
          </div>
        </div>
        <div class="weather-report">
          <div>Humidity: {{ selectedHumidity }}%</div>
          <div>Wind: {{ selectedWind }} MPH {{ selectedWindDirection }}</div>
          <a
            class="show-more-link"
            href="https://darksky.net/forecast/39.8621,-105.0504/us12/en"
            >Show More</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tempConversionMixin from '../mixins/tempConversion.js'
export default {
  name: 'CurrentWeather',
  props: {
    selectedDay: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [tempConversionMixin],
  computed: {
    ...mapGetters(['selectedDayDt', 'fahrenheit', 'temperatureUnit']),
    selectedDate() {
      // * Should be of that format
      // * Thursday 10 PM · Light Snow
      // ! not accurate to the hour
      const printDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
      // ! why does it start with Saturday??!?
      // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
      const cDate = new Date(this.selectedDayDt ? this.selectedDayDt * 1000 : 0)
      // const cDay = days[cDate.getDay()]
      const cDay = printDay.format(cDate)
      const cHour24 = cDate.getHours()
      const cHour12 =
        cHour24 > 12 ? cHour24 - 12 + ' PM' : cHour24 === 0 ? 12 + ' AM' : cHour24 + ' AM'

      return `${cDay} ${cHour12} · ${this.selectedDescription}`
    },
    selectedDescription() {
      return this.selectedDay?.weather[0].description.replace(
        /(^|\s)([a-z]+)/gi,
        // eslint-disable-next-line no-unused-vars
        function(match, p1, p2, offset, string, groups) {
          return p1 + p2[0].toUpperCase() + p2.slice(1)
        }
      )
    },
    selectedTemp() {
      // ! not accurate to the hour
      const temp = this.fahrenheit
        ? Math.round(this.selectedDay?.temp.day)
        : this.fahrenheitToCelsius(Math.round(this.selectedDay?.temp.day))
      return Number.isNaN(temp) ? '' : temp
    },
    selectedHumidity() {
      // ! not accurate to the hour
      return this.selectedDay?.humidity
    },
    selectedWind() {
      // ! not accurate to the hour
      return Math.round(this.selectedDay?.wind_speed)
    },
    selectedWindDirection() {
      // http://snowfence.umn.edu/Components/winddirectionanddegreeswithouttable3.htm
      const degree = this.selectedDay?.wind_deg
      if (degree >= 348.75 && degree < 11.25) return 'N'
      else if (degree >= 11.25 && degree < 78.75) return 'NE'
      else if (degree >= 78.75 && degree < 101.25) return 'E'
      else if (degree >= 101.25 && degree < 168.75) return 'SE'
      else if (degree >= 168.75 && degree < 191.25) return 'S'
      else if (degree >= 191.25 && degree < 258.75) return 'SW'
      else if (degree >= 258.75 && degree < 281.25) return 'W'
      else if (degree >= 281.25 && degree < 348.75) return 'NW'
      else return ''
    },
    iconUrl() {
      // return 'https://openweathermap.org/img/wn/' + this.day?.weather[0].icon + '.png'
      let icon = ''
      switch (this.selectedDay?.weather[0].description) {
        case 'overcast clouds':
          icon = 'partly-cloudy-day.svg'
          break
        case 'scattered clouds':
          icon = 'cloudy.svg'
          break
        case 'broken clouds':
          icon = 'cloudy.svg'
          break
        case 'clear sky':
          icon = 'clear-day.svg'
          break
        case 'few clouds':
          icon = 'partly-cloudy-day.svg'
          break
        case 'light snow':
          icon = 'snow.svg'
          break
        default:
          return 'https://place-hold.it/50&text=icon'
      }
      return `https://duckduckgo.com/assets/weather/svg/new/${icon}`
    }
  },
  methods: {
    selectUnit(unit) {
      if (this.temperatureUnit !== unit) {
        this.$store.commit('SET_UNIT', unit)
      }
    }
  }
}
</script>

<style scoped>
a.show-more-link {
  text-decoration: none;
  font-weight: bold;
}
.temp {
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  justify-content: start;
}
.icon {
  width: 4rem;
}
.unit-container {
  font-size: 1rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  color: #aaaaaa;
}
.unit {
  cursor: pointer;
}
.selected {
  color: black;
  text-decoration: underline;
}
.current-weather {
  margin: 10px;
  text-align: left;
}

.city {
  font-size: 1.7rem;
}

.synopsis {
  font-size: 1rem;
  color: gray;
}

.weather-details {
  display: flex;
  justify-content: start;
  margin: 2rem 0;
}

.weather-overview {
  width: 45%;
  padding: 0 0 0 2%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.weather-report {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}
</style>
