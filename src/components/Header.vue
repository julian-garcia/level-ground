<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/images/level-ground-logo.svg" alt="" class="logo">
    </router-link>
    <NavMenu />
    <div class="cta">
      <a href="#">Subscribe</a>
      <a href="#">Sign In</a>
      <a href="#" class="give"><img src="../assets/images/give.svg" alt=""> Give</a>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
  name: 'Header',
  components: {
    NavMenu
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.logo {
  max-width: 260px;
}

.give { position: relative; }
.give img {
  position: absolute;
  width: 20px;
  top: -1px;
  left: 0;
}

.cta {
  display: none;
  position: absolute;
  right: 1rem;
  top: 0;
}

.cta a {
  text-decoration: none; 
  color: black; 
  padding: 0 1rem;
}

@media screen and (min-width: 900px) {
  .cta { display: block; }
}
</style>
