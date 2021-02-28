<template>
  <Header />
  <div class="container">
    <div class="leftbar"></div>
    <div class="content">
      <hr>
      <router-view :stories="stories" />
    </div>
    <div class="rightbar"></div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import StoryblokClient from 'storyblok-js-client'

const token = process.env.VUE_APP_STORYBLOK_API;

let storyApi = new StoryblokClient({
  accessToken: token
})

export default {
  name: 'App',
  components: {
    Header,
  },
  data () {
    return {
      stories: []
    }
  },
  created () {
    window.storyblok.init({
      accessToken: token
    })
    window.storyblok.on('change', () => {
      this.getStory('draft')
    })
    window.storyblok.pingEditor(() => {
      if (window.storyblok.isInEditor()) {
        this.getStory('draft')
      } else {
        this.getStory('published')
      }
    })
  },
  methods: {
    getStory(version) {
      storyApi.get('cdn/stories', {
        starts_with: "articles/",
        version: version
      })
      .then((response) => {
        this.stories = response.data.stories.filter(story => story.content.feature)
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
  max-width: 900px;
  margin: auto;
  width: 100%;
}

h1, h2, h3 { font-family: Playfair; }
hr { border: none; height: 1px; background: var(--highlight-colour-muted); }

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
@media screen and (min-width: 900px) {
  .container {
    grid-template-columns: [leftbar] .5fr [content] 3fr [rightbar] .5fr;
  }
}
@media screen and (min-width: 1200px) {
  .container {
    grid-template-columns: [leftbar] .7fr [content] 3fr [rightbar] .7fr;
  }
}
@media screen and (min-width: 2000px) {
  .container {
    grid-template-columns: [leftbar] 1fr [content] 3fr [rightbar] 1fr;
  }
}
</style>
