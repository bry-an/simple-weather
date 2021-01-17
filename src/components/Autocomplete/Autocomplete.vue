<template>
  <div>
    <input v-model="localInput" type="text" @keydown.enter.prevent="changeSearchTerm" />
    <p v-for="item in items" :key="item.name">
      {{ item.name }}
    </p>
  </div>
</template>

<script>
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
    }
  },
  data: () => ({
    localInput: ''
  }),
  methods: {
    changeSearchTerm(e) {
      this.$emit('change-search-term', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
