<template>
  <ul class="nav-menu">
    <li>
      <router-link to="/">About</router-link>
    </li>
    <li>
      <router-link to="/404">Collective</router-link>
    </li>
    <li>
      <router-link to="/404">Studio</router-link>
    </li>
    <li>
      <router-link to="/404">Events</router-link>
    </li>
    <li>
      <router-link to="/404">News & Stories</router-link>
    </li>
    <li>
      <router-link to="/404">Store</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style scoped>
a { text-decoration: none; color: black; display: block; }

.nav-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  list-style-type: none;
  max-width: 800px;
  margin: 1rem auto;
  padding: 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>