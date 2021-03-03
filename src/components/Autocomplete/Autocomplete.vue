<template>
  <div class="autocomplete">
    <input
      v-model.trim="localInput"
      :placeholder="placeholderText"
      type="text"
      @input="changeSearchTerm"
      class="city-input"
    />
    <div v-if="showDropdown" class="autocomplete-dropdown">
      <p class="search-result" v-for="item in items" :key="item.name">
        <a @click="selectItem(item)">{{ item.name }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../utils/index.js'

export default {
  name: 'Autocomplete',
  props: {
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    itemType: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    localInput: '',
    showDropdown: false
  }),
  computed: {
    placeholderText() {
      return `Please enter a ${this.itemType.toLowerCase() || 'item'} to search`
    }
  },
  watch: {
    items: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.showDropdown = true
        }
      }
    }
  },
  created() {
    document.addEventListener('click', this.clickHandler)
  },
  methods: {
    clickHandler(e) {
      // if outside dropdown, close it
      if (e.target.className !== 'search-result') {
        this.showDropdown = false
        this.localInput = ''
      }
    },
    changeSearchTerm: debounce(function (e) {
      if (e.target.value) {
        // only update search term if value entered
        this.$emit('change-search-term', e.target.value)
      }
    }, 200),
    selectItem(item) {
      this.$emit('item-selected', item)
      this.localInput = item.name
      this.showDropdown = false
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete input {
  width: 100%;
}

.search-result {
  color: blue;
  cursor: pointer;
  padding: 5px 5px;
  font-size: 0.9rem;
  &:first-child {
    padding-top: 8px;
  }
}
.autocomplete-dropdown {
  z-index: 9;
  background: white;
  position: absolute;
  border: 1px solid #888;
  border-top: none;
  border-radius: 1px;
}
.city-input {
  border-radius: 3px;
  height: 2rem;
  font-size: 1rem;
}
</style>
