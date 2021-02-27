<template>
  <Header />
  <div class="container">
    <div class="leftbar"></div>
    <div class="content">
      <HomePage :blok="stories" />
    </div>
    <div class="rightbar"></div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import HomePage from './components/HomePage.vue'
import StoryblokClient from 'storyblok-js-client'

const token = process.env.VUE_APP_STORYBLOK_API;

let storyApi = new StoryblokClient({
  accessToken: token
})

export default {
  name: 'App',
  components: {
    Header,
    HomePage
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
        console.log(response.data.stories);
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
:root {
  background: #fff7f7;
}
.container {
  display: grid;
  grid-template-columns: [leftbar] 1fr [content] 3fr [rightbar] 1fr;
}
.leftbar {
  grid-column: leftbar;
}
.rightbar {
  grid-column: rightbar;
}
.content {
  grid-column: content;
  max-width: 800px;
  margin: auto;
}
</style>
