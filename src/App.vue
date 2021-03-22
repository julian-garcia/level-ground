<template>
  <Header />
  <div class="container">
    <div class="leftbar"></div>
    <div class="content">
      <hr>
      <router-view :stories="stories" />
      <hr class="square">
    </div>
    <div class="rightbar"></div>
  </div>
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StoryblokClient from 'storyblok-js-client'
import '@csstools/normalize.css'

let storyApi = new StoryblokClient({
  accessToken: process.env.VUE_APP_STORYBLOK_API
})

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      stories: []
    }
  },
  created () {
    window.storyblok.init({
      accessToken: process.env.VUE_APP_STORYBLOK_API
    })
    window.storyblok.on('change', () => {
      this.getStories('draft')
    })
    window.storyblok.pingEditor(() => {
      if (window.storyblok.isInEditor()) {
        this.getStories('draft')
      } else {
        this.getStories('published')
      }
    })
  },
  methods: {
    getStories(version) {
      storyApi.get('cdn/stories', {
        // starts_with: "article/",
        version: version
      })
      .then((response) => {
        this.stories = response.data.stories
          .map(story => { 
            delete story.content.long_text
            return {...story.content, published_at: story.published_at, slug: story.slug}
          })
        console.log(this.stories);
      })
      .catch((error) => {
        console.log(error);
      })
    }
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
  --highlight-colour-muted: #fecfc8;
  --button-font-size: 20px;
}

.container {
  display: grid;
  grid-template-columns: [leftbar] 1rem [content] 3fr [rightbar] 1rem;
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

p { line-height: 1.3; }
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

.button {
  border-radius: 5px;
  border: none;
  background: var(--highlight-colour);
  color: white;
  min-width: 100px;
  padding: .5rem 1rem;
  font-size: var(--button-font-size);
  font-family: Asap;
  cursor: pointer;
  margin-bottom: 1rem;
}

.button.full-width {
  width: 100%;
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
@media screen and (min-width: 900px) {
  .container {
    grid-template-columns: [leftbar] .5fr [content] 3fr [rightbar] .5fr;
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
