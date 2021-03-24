<template>
  <div>
    <h1 class="page-title">{{$route.name}}</h1>
    <hr>
    <div class="grid">
      <div v-for="item in items" class="grid__item" :key="item.uuid" @click="goTo('event', item.slug)">
        <template v-if="item.component === 'Event'">
          <template v-if="item.event_image">
            <div v-if="item.event_image.filename" 
              class="feature-image" 
              :style='{backgroundImage: "url(" + item.event_image.filename + ")"}'>
            </div>
            <div v-if="!item.event_image.filename" class="feature-image"></div>
          </template>
          <h2>{{item.event_title}}</h2>
          <p>{{item.event_description}}</p>
          <p>{{$filters.formatDate(item.event_date) }}</p>
        </template>
        <template v-if="item.component === 'Post'">
          <template v-if="item.image">
            <div v-if="item.image.filename" 
              class="feature-image" 
              :style='{backgroundImage: "url(" + item.image.filename + ")"}'>
            </div>
            <div v-if="!item.image.filename" class="feature-image"></div>
          </template>
          <h2>{{item.title}}</h2>
          <p>{{item.intro}}</p>
          <p>{{$filters.formatDate(item.published_at) }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Grid',
  props: {
    stories: Array
  },
  computed: {
    items() {
      return this.stories.filter((story) => story.component === this.mapComponent())
    }
  },
  methods: {
    goTo(parent, url) {
      router.push({path: `/${parent}/${url}`})
    },
    mapComponent() {
      const nameComponent = [
        { routeName: 'Events', component: 'Event' },
        { routeName: 'News', component: 'Post' }
      ]
      return nameComponent.filter(item => item.routeName === this.$route.name)[0].component || 'Post';
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 330px));
  gap: 2rem;
  max-width: 1100px;
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
