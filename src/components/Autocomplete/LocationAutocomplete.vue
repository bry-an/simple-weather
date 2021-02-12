<template>
  <div class="input-container">
    <autocomplete
      id="location-input"
      item-type="city"
      :items="citySearchResults"
      @change-search-term="search"
      @item-selected="selectCity"
    />
  </div>
</template>

<script>
import Autocomplete from '@C/Autocomplete/Autocomplete.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'LocationInput',
  components: {
    Autocomplete
  },
  data: () => ({
    location: '',
    searchResults: []
  }),
  computed: {
    ...mapGetters(['citySearchResults'])
  },
  methods: {
    search(name) {
      console.log('searching', name)
      this.$store.dispatch('runCitySearch', name)
    },
    selectCity(item) {
      const { lat, lng } = item.coords
      this.$store.dispatch('updateLocation', { lat, lng, name: item.name })
    }
  }
}
</script>

<style lang="scss" scoped>
#location-input {
  width: 100%;
}

.input-container {
  width: 625px;
  margin: auto;
  margin-bottom: 2rem;
}
</style>
