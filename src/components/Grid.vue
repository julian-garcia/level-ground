<template>
  <div>
    <h1>{{$route.name}}</h1>
    <hr>
    <div class="grid">
      <div v-for="item in items" class="grid__item" :key="item.uuid" @click="goTo('event', item.slug)">
        <template v-if="item.component === 'Event'">
        <template v-if="item.event_image">
          <img v-if="item.event_image.filename" :src="item.event_image.filename" class="feature-image" alt="">
          <img v-if="!item.event_image.filename" src="../assets/images/event.jpg" class="feature-image" alt="">
        </template>
        <h2>{{item.event_title}}</h2>
        <p>{{item.event_description}}</p>
        <p>{{$filters.formatDate(item.event_date) }}</p>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 2rem;
}
.grid__item {
  cursor: pointer;
}
.grid__item img {
  width: 100%;
}
@media screen and (min-width: 900px) {}
</style>
