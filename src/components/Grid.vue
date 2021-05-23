<template>
  <div>
    <h1 class="page-title">{{$route.name}}</h1>
    <hr>
    <div class="grid">
      <div v-for="item in items" class="grid__item" :key="item.ID" @click="goTo(posttype, item.post_name)">
        <template v-if="item.acf">
          <div v-if="item.acf.featured_image" class="feature-image" 
            :style='{backgroundImage: "url(" + item.acf.featured_image + ")"}'>
          </div>
          <div v-if="!item.acf.featured_image" class="feature-image"></div>
        </template>
        <h2>{{item.post_title}}</h2>
        <p>{{item.post_excerpt}}</p>
        <p>{{$filters.formatDate(item.post_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Grid',
  props: {
    posts: Array,
    events: Array
  },
  data() {
    if (this.$route.path.indexOf('news') !== -1) {
      return { posttype: 'article' }
    } else {
      return { posttype: 'event' }
    }
  },
  computed: {
    items() {
      if (this.$route.path.indexOf('news') !== -1) {
        return this.posts;
      }
      if (this.$route.path.indexOf('events') !== -1) {
        return this.events;
      }
      return this.posts;
    }
  },
  methods: {
    goTo(parent, url) {
      router.push({path: `/${parent}/${url}`})
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  gap: 2rem;
  margin: auto;
  justify-content: center;
}

.grid__item {
  cursor: pointer;
}

.grid__item img {
  width: 100%;
}

.feature-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../assets/images/event.jpg);
  height: 120px;
}
</style>
