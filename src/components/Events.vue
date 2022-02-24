<template>
  <h2>Upcoming Events</h2>
  <div
    v-for="item in events"
    :key="item.uuid"
    @click="goToEvent(item.post_name)"
    class="event"
  >
    <h3 class="event-title">{{ item.post_title }}:</h3>
    <p class="event-date">{{ $filters.formatDate(item.acf.event_date) }}</p>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "Events",
  props: {
    events: Array,
  },
  methods: {
    goToEvent(url) {
      router.push({ path: `/event/${url}` });
    },
  },
};
</script>

<style scoped>
.event {
  cursor: pointer;
}

.event-title {
  display: inline-block;
  margin: 0 10px 10px 0;
}

.event-date {
  color: var(--highlight-colour);
  display: inline-block;
  margin: 0 0 20px;
}
</style>
