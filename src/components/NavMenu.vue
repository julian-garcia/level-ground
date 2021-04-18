<template>
  <ul class="nav-menu" :class="{show: showMenu}" @click="showMenu = false">
    <li class="nav-menu__item">
      <router-link to="/about">About</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/collective">Collective</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/studio">Studio</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/events">Events</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/membership">Membership</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/news">News&nbsp;&amp;&nbsp;Stories</router-link>
    </li>
    <li class="nav-menu__item">
      <router-link to="/store">Store</router-link>
    </li>
  </ul>
  <img src="../assets/images/hamburger.svg" alt="" @click="showMenu = !showMenu" class="toggle-menu">
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      showMenu: false
    }
  },
  created() {
    this.showMenu = false
  },
  mounted() {
    window.addEventListener('resize', () => {this.showMenu = false})
  }
}
</script>

<style scoped>
.nav-menu__item a { 
  text-decoration: none; 
  color: black; 
  display: block;
  padding: 0 1rem;
}

.nav-menu__item a:hover, a.router-link-active {
  color: var(--highlight-colour);
}

.nav-menu {
  display: none;
  list-style-type: none;
  padding: 0;
}

.nav-menu.show {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .9);
}

.nav-menu.show .nav-menu__item a { 
  display: inline-block;
  margin: 10px auto;
  padding: 10px;
  font-size: 24px;
}

.toggle-menu {
  position: fixed;
  display: block;
  left: .5rem;
  top: .5rem;
}

@media screen and (min-width: 900px) {
  .nav-menu { 
    display: grid; 
    position: relative;
    grid-template-columns: repeat(auto-fit, minmax(0,min-content));
    justify-content: center;
    max-width: 800px;
    margin: 1rem auto;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .toggle-menu {
    display: none;
  }
}
</style>