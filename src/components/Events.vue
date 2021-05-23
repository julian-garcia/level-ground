<template>
  <h2>Upcoming Events</h2>
  <div v-for="item in events" :key="item.uuid" @click="goToEvent(item.post_name)" :style="{cursor: 'pointer'}">
    <h3 class="event-title">{{item.post_title}}:</h3>
    <p class="event-date">{{$filters.formatDate(item.post_date) }}</p>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Events',
  props: {
    events: Array
  },
  methods: {
    goToEvent(url) {
      router.push({path: `/event/${url}`})
    }
  }
}
</script>

<style scoped>

.event-title {
  display: inline-block;
  margin:  0 10px 20px 0;
}

.event-date {
  color: var(--highlight-colour);
  display: inline-block;
  margin: 0;
}

</style>
