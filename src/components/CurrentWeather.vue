<template>
  <div>
    <div class="current-weather">
      <div class="city">Denver, CO</div>
      <div class="synopsis">Thursday 10 PM · Light Snow</div>
    </div>
    <div>
      <div class="weather-details">
        <div class="weather-overview">
          <div>
            <img
              src="https://duckduckgo.com/assets/weather/svg/new/snow.svg"
              alt="it's really frosty, but I like it"
            />
          </div>
          <div>29°</div>
          <div>F</div>
        </div>
        <div class="weather-report">
          <div>Humidity: 90%</div>
          <div>Wind: 4 MPH N</div>
          <div>Show More</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {}
}
</script>

<style scoped>
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
}

.weather-report {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}
</style>
