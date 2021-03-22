<template>
  <ul class="nav-menu">
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
</template>

<script>
export default {
  name: 'NavMenu'
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
  grid-template-columns: repeat(auto-fit, minmax(0,min-content));
  justify-content: center;
  list-style-type: none;
  max-width: 800px;
  margin: 1rem auto;
  padding: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

@media screen and (min-width: 900px) {
  .nav-menu { display: grid; }
}
</style>