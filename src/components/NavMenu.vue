<template>
  <ul class="nav-menu" :class="{show: showMenu}" @click="showMenu = false">
    <li class="nav-menu__item" v-for="item in menuItems" :key="item.ID">
      <router-link :to="item.slug">{{item.title}}</router-link>
    </li>
  </ul>
  <img src="../assets/images/hamburger.svg" alt="" @click="showMenu = !showMenu" class="toggle-menu">
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      menuItems: Array,
      showMenu: false
    }
  },
  created() {
    this.showMenu = false
    fetch(`http://level-ground.local/wp-json/api/menu`)
      .then((r) => r.json())
      .then((res) => {
        this.menuItems = res; 
        this.menuItems.map(element => {
          element['slug'] = element.url.indexOf('http') === -1 ? element.url : `/${element.url.split('/')[3]}`
        })
      })
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
    grid-template-columns: repeat(auto-fit, minmax(0,max-content));
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