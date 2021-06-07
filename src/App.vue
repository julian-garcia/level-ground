<template>
  <Header />
  <div class="container">
    <div class="leftbar"></div>
    <div class="content">
      <hr>
      <router-view :posts="posts" :pages="pages" :events="events" :key="$route.path" />
      <hr class="square">
    </div>
    <div class="rightbar"></div>
  </div>
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import '@csstools/normalize.css'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      posts: [],
      pages: [],
      events: [],
      name: this.$route.path
    }
  },
  mounted(){
    fetch(`${process.env.VUE_APP_CMS_URL}/api/post`)
      .then((r) => r.json())
      .then((res) => this.posts = res);
    fetch(`${process.env.VUE_APP_CMS_URL}/wp/v2/pages`)
      .then((r) => r.json())
      .then((res) => this.pages = res);
    fetch(`${process.env.VUE_APP_CMS_URL}/api/event`)
      .then((r) => r.json())
      .then((res) => this.events = res);
  }
}
</script>

<style>
#app {
  font-family: Asap, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  background: #fff7f7;
  --background: #fff7f7;
  --highlight-colour: #e5511b;
  --highlight-colour-muted: #ffe9e6;
  --highlight-colour-light: #fef2f0;
  --accent-colour: #f1b52a;
  --accent-colour-2: #feb3a8;
  --button-font-size: 20px;
}

html, body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

form {
  margin-top: 1rem;
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input, form textarea {
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  border: 1px solid var(--accent-colour-2);
  border-radius: 5px;
  font-family: Asap, Helvetica, Arial, sans-serif;
  padding: 5px;
  font-size: 16px;
}

form textarea {
  min-height: 90px;
  max-height: 90px;
}

form .half {
  min-width: 100%;
  max-width: 100%;
  display: block;
  margin: 0;
}

form .button {
  margin: auto;
  display: block;
}

.form-circles { position: relative; }
.form-circles:before {
  content: '';
  position: absolute;
  bottom: -25px;
  right: -50px;
  background-image: url(./assets/images/circles-wide.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 400px;
  height: 150px;
  max-width: 100%;
  z-index: -1;
}

.container {
  display: grid;
  grid-template-columns: [leftbar] 1rem [content] 1fr [rightbar] 1rem;
}

.leftbar {
  grid-column: leftbar;
}

.rightbar {
  grid-column: rightbar;
}

.content {
  grid-column: content;
  margin: auto;
  width: 100%;
  max-width: 1350px;
}

p { line-height: 1.6rem; font-size: 1.1rem; }
h1, h2, h3 { font-family: Playfair; }
hr { 
  border: none; 
  height: 1px; 
  background: var(--highlight-colour-muted); 
  position: relative;
  overflow: visible;
  margin: 1rem 0;
}

hr.square::after {
  content: '';
  position: absolute;
  top: -10px;
  right: -30px;
  height: 50px;
  width: 50px;
  transform: rotate(45deg);
  border: 1px solid var(--highlight-colour);
}

a {
  text-decoration: none; 
  color: var(--highlight-colour);
  font-weight: bold;
}

.button {
  border-radius: 5px;
  border: none;
  background: var(--highlight-colour);
  color: white;
  min-width: 100px;
  padding: .5rem 1rem;
  font-size: var(--button-font-size);
  font-family: Asap;
  font-weight: normal;
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
}

.button.full-width {
  width: 100%;
}

.page-title {
  text-align: center;
}

input {
  border-radius: 5px;
  border: 1px solid var(--highlight-colour-muted);
  padding: .5rem 1rem;
  font-size: var(--button-font-size);
  font-family: Asap;
}

.left .headline {
  color: var(--highlight-colour);
  font-style: italic;
  font-family: Playfair;
  font-weight: bold;
  font-size: 1.2rem;
}

@font-face {
  font-family: "Asap";
  src: url("./assets/fonts/Asap-Regular.woff2") format("woff2"),
       url("./assets/fonts/Asap-Regular.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  src: url("./assets/fonts/PlayfairDisplay.woff2") format("woff2"),
       url("./assets/fonts/PlayfairDisplay.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  font-style: italic;
  src: url("./assets/fonts/PlayfairDisplay-Italic.woff2") format("woff2"),
       url("./assets/fonts/PlayfairDisplay-Italic.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  font-style: italic;
  font-weight: bold;
  src: url("./assets/fonts/PlayfairDisplay-BoldItalic.woff2") format("woff2"),
       url("./assets/fonts/PlayfairDisplay-BoldItalic.woff") format("woff");
}
@media screen and (min-width: 300px) {
  .container {
    padding: 0 10px;
    grid-template-columns: [leftbar] 0 [content] 1fr [rightbar] 0;
  }
}
@media screen and (min-width: 600px) {
  .container {
    padding: 0 30px;
  }
  form .half {
    min-width: calc(50% - 5px);
    max-width: calc(50% - 5px);
    display: inline-block;
  }
  :not(.half) + .half { margin-right: 5px; }
  .half + .half { margin-left: 5px; }
}
@media screen and (min-width: 900px) {
  .container {
    grid-template-columns: [leftbar] .3fr [content] 3fr [rightbar] .3fr;
  }
}
@media screen and (min-width: 1200px) {
  .container {
    grid-template-columns: [leftbar] .2fr [content] 3fr [rightbar] .2fr;
  }
}
@media screen and (min-width: 2000px) {
  .container {
    grid-template-columns: [leftbar] 1fr [content] 3fr [rightbar] 1fr;
  }
}
</style>
