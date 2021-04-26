<template>
  <div class="input-container">
    <autocomplete
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
.input-container {
  margin: 2rem auto;
}
</style>
