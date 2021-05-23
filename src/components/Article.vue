<template>
  <h1 class="article-title">{{post.post_title}}</h1>
  <hr>
  <article class="article" v-if="post">
    <p v-if="post.post_excerpt" >{{post.post_excerpt}}</p>
    <img v-if="post.acf" :src="post.acf.featured_image" class="feature-image" alt="">
    <p>{{$filters.formatDate(post.post_date) }}</p>
    <div v-html="articleHtml" v-if="articleHtml"></div>
  </article>
</template>

<script>
import router from '../router'

export default {
  name: 'Article',
  data() {
    return {
      post: {},
      articleHtml: ''
    }
  },
  created(){
    fetch(`http://level-ground.local/wp-json/api/post/${this.$route.params.slug}`)
      .then((r) => r.json())
      .then((res) => {
        this.post = res; 
        this.articleHtml = this.post.content; 
        if (!this.post.content) { router.push({path: `/404`}) }
      })
      .catch(() => router.push({path: `/404`}));
  },
  computed: {

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
  width: 100%;
}
</style>
