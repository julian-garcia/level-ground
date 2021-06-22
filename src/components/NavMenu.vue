<template>
  <ul class="nav-menu" :class="{show: showMenu}">
    <li class="nav-menu__item" v-for="item in menuItems" :key="item.ID">
      <router-link :to="item.slug" @click="showMenu = false">{{item.title}}</router-link>
      <ul class="nav-menu__sub" v-if="item.submenu.length">
        <li v-for="item in item.submenu" :key="item.ID">
          <router-link :to="item.slug" @click="showMenu = false">{{item.title}}</router-link>
        </li>
      </ul>
    </li>
  </ul>
  <img src="../assets/images/hamburger.svg" alt="" @click="showMenu = true" class="toggle-menu" v-if="!showMenu">
  <img src="../assets/images/close.svg" alt="" @click="showMenu = false" class="close-menu" v-if="showMenu">
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
    fetch(`${process.env.VUE_APP_CMS_URL}/api/menu`)
      .then((r) => r.json())
      .then((res) => {
        this.menuItems = res.filter(item => item.post_parent === 0); 
        this.menuItems.map(element => {
          element['slug'] = element.url.indexOf('http') === -1 ? element.url : `/${element.url.split('/')[3]}`
          element['submenu'] = res.filter(item => item.post_parent !== 0 && item.post_parent === parseInt(element.object_id))
          element['submenu'].forEach(item => {
            item['slug'] = item.url.indexOf('http') === -1 ? item.url : `/${item.url.split('/')[3]}/${item.url.split('/')[4]}`
          })
        })
      })
  },
  mounted() {
    window.addEventListener('resize', () => {this.showMenu = false})
  }
}
</script>

<style scoped>
.nav-menu__item {
  text-align: left;
}

.nav-menu__item a { 
  text-decoration: none; 
  color: black; 
  display: block;
  padding: 10px 1rem;
  transition: color .3s ease-in-out;
}

.nav-menu__item a:hover, .nav-menu__item a.router-link-active {
  color: var(--highlight-colour);
}

.nav-menu {
  display: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-menu.show {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem 2rem;
  z-index: 9;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, .9);
  box-sizing: border-box;
}

.nav-menu.show .nav-menu__item a { 
  display: inline-block;
  margin: 0 auto;
  padding: 10px;
  font-size: 24px;
  position: relative;
}

.nav-menu__sub {
  list-style: none;
  margin-bottom: 20px;
}

.toggle-menu {
  position: fixed;
  display: block;
  left: 1rem;
  top: 1rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 9;
}

.close-menu {
  position: fixed;
  display: block;
  right: 1rem;
  top: 0;
  padding: 1rem;
  cursor: pointer;
  z-index: 9;
  width: 30px;
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
  .nav-menu__item {
    text-align: center;
  }
  .nav-menu.show .nav-menu__item a { 
    margin: 10px auto;
  }
  .nav-menu__item > a:hover+.nav-menu__sub {
    opacity: 1;
    z-index: 1;
  }
  .toggle-menu {
    display: none;
  }
  .nav-menu__sub {
    position: absolute;
    padding: 10px;
    background: rgba(255, 255, 255, .8);
    opacity: 0;
    z-index: -1;
    transition: opacity .3s ease-in-out, z-index .3s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.4);
    margin-bottom: 0;
  }
  .nav-menu__sub:hover {
    opacity: 1;
    z-index: 1;
  }
  .nav-menu__sub a {
    display: block;
    padding: 5px 1rem 5px 1rem;
    text-align: left;
  }
}
</style>