<template>
  <template v-if="event.acf">
    <div
      v-if="event.acf.featured_image"
      class="banner-image"
      :style="{ backgroundImage: 'url(' + event.acf.featured_image + ')' }"
    >
      <h1 class="event-title">{{ event.post_title }}</h1>
    </div>
    <div v-if="!event.acf.featured_image" class="banner-image">
      <h1 class="event-title">{{ event.post_title }}</h1>
    </div>
  </template>
  <article class="event">
    <div class="left">
      <template v-if="event.acf">
        <p class="event-date">
          {{ $filters.formatDate(event.acf.event_date) }}
        </p>
        <p>{{ event.acf.event_time }}</p>
        <p>{{ event.acf.event_address }}</p>
        <a
          class="button full-width"
          :href="`${event.acf.event_link}`"
          target="_blank"
          >Attend this event</a
        >
        <button class="button full-width" @click="emitShowModal('give')">
          Donate
        </button>
      </template>
    </div>
    <div>
      <div v-html="eventHtml"></div>
    </div>
    <div class="right">
      <Events :events="events.slice(0, 5)" />
    </div>
  </article>
</template>

<script>
import router from "../router";
import Events from "./Events.vue";

export default {
  name: "Event",
  props: {
    events: Array,
  },
  components: { Events },
  data() {
    return {
      event: {},
    };
  },
  methods: {
    onShowModal(modalType) {
      this.$emit("showModal", modalType);
    },
    emitShowModal(modalType) {
      this.$emit("showModal", modalType);
    },
  },
  created() {
    fetch(`${process.env.VUE_APP_CMS_URL}/api/event/${this.$route.params.slug}`)
      .then((r) => r.json())
      .then((res) => {
        this.event = res;
        if (!this.event.content) {
          this.event.content = `<h2 style="text-align: center">Details to be confirmed</h2>`;
        }
        this.eventHtml = this.event.content;
        document.title = `Level Ground - ${this.event.post_title}`;
      })
      .catch(() => router.push({ path: `/404` }));
  },
};
</script>

<style scoped>
.banner-image {
  background-image: url(../assets/images/event.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  width: 100%;
  position: absolute;
  left: 0;
  margin: 1rem 0;
}

.event {
  max-width: 1200px;
  margin: calc(200px + 4rem) auto 1rem;
  display: grid;
  grid-template-columns: auto;
  gap: 2rem;
}

.event:deep(img) {
  max-width: 400px;
  width: 100%;
}

.event-title {
  position: absolute;
  top: -30px;
  left: 50%;
  margin: 0;
  padding: 10px;
  transform: translateX(-50%);
  background: var(--background);
}

.event-date {
  color: var(--highlight-colour);
}

@media screen and (min-width: 1200px) {
  .event {
    grid-template-columns: 1fr 2fr 1fr;
  }
}
</style>
