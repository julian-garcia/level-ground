<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/images/level-ground-logo.svg" alt="" class="logo">
    </router-link>
    <NavMenu />
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
  name: 'Header',
  components: {
    NavMenu
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  margin: 1rem 0;
}
.logo {
  max-width: 260px;
}
</style>
