<template>
  <img src="../assets/images/level-ground-logo.svg" alt="" class="logo">
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.logo {
  max-width: 260px;
}
</style>
