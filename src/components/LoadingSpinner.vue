<template>
  <div class="loader-container">
    <div class="loader" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.loader-container {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  z-index: 10;
  width: 80px;
  height: 80px;
  border: 8px solid blue;
  border-top: 8px solid white;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
