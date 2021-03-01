<template>
  <div>
    <div class="current-weather">
      <div class="city">{{ selectedCity }}</div>
      <div class="synopsis">{{ selectedDate }}</div>
    </div>
    <div>
      <div class="weather-details">
        <div class="weather-overview">
          <div>
            <img
              :src="iconUrl(weatherShortDescription)"
              class="icon"
              alt="it's really frosty, but I like it"
            />
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
            target="_blank"
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
import iconUrl from '../mixins/iconUrl.js'

export default {
  name: 'CurrentWeather',
  props: {
    selectedDay: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [tempConversionMixin, iconUrl],
  computed: {
    ...mapGetters([
      'selectedDay',
      'selectedDayDt',
      'fahrenheit',
      'temperatureUnit',
      'current',
      'selectedCity'
    ]),
    weatherShortDescription() {
      return this.selectedDay.shortForecast
    },
    selectedDate() {
      // * Thursday 10 PM · Light Snow
      const printDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
      const cDate = new Date(this.selectedDayDt || 0)
      const cDay = printDay.format(cDate)
      const cHour24 = cDate.getHours()
      const cHour12 =
        cHour24 > 12 ? cHour24 - 12 + ' PM' : cHour24 === 0 ? 12 + ' AM' : cHour24 + ' AM'
      return `${cDay} ${cHour12} · ${this.weatherShortDescription}`
    },
    selectedTemp() {
      if (this.fahrenheit) {
        return this.selectedDay.temperature
      } else {
        return this.fahrenheitToCelsius(this.selectedDay.temperature)
      }
    },
    selectedHumidity() {
      return Math.floor(Math.random() * 100)
    },
    selectedWind() {
      return this.selectedDay.windSpeed
    },
    selectedWindDirection() {
      return this.selectedDay.windDirection
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
  cursor: pointer;
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
  line-height: 2.5rem;
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
