<template>
  <h1 class="article-title">{{story.title}}</h1>
  <hr>
  <article class="article">
    <p>{{story.intro}}</p>
    <img v-if="story.image" :src="story.image.filename" class="feature-image" alt="">
    <p>{{$filters.formatDate(story.published_at) }}</p>
    <div v-html="articleHtml"></div>
  </article>
</template>

<script>
import StoryblokClient from 'storyblok-js-client'
import router from '../router'

let storyApi = new StoryblokClient({
  accessToken: process.env.VUE_APP_STORYBLOK_API
})

export default {
  name: 'Article',
  data() {
    return {
      story: {},
      articleHtml: ''
    }
  },
  created() {
    this.getStory()
  },
  methods: {
    getStory() {
      storyApi.get(`cdn/stories/article/${this.$route.params.slug}`, {})
        .then(response => {
          this.story = {
            ...response.data.story.content, 
            published_at: response.data.story.published_at
          }
          this.articleHtml = storyApi.richTextResolver.render(this.story.long_text)
        }).catch(error => { 
          console.log(error)
          router.push({ name: 'NotFound' })
        })
    }
  }
}
</script>

<style scoped>
.article { 
  margin: 2rem auto 3rem; 
  max-width: 700px;
}

.article-title {
  text-align: center;
  margin: auto;
  max-width: 800px;
}

.article:deep(iframe) {
  max-width: 100%;
}

.feature-image {
  max-width: 400px;
}
</style>
