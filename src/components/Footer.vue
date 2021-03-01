<template>
  <footer class="footer">
    <h2>Don’t miss out on news or events</h2>
    <ul class="footer__form">
      <li><input type="text" name=""></li>
      <li><input type="email" name=""></li>
      <li><button class="button">Subscribe</button></li>
    </ul>
    <p>&copy; Level Ground 2020</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.footer__form {
  list-style: none;
  padding: 0;
}

.footer__form li {
  display: inline-block;
  margin: 0 .5rem;
}
</style>
