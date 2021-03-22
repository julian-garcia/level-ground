<template>
  <template v-if="story.event_image">
    <div v-if="story.event_image.filename" class="banner-image" :style='{backgroundImage: "url(" + story.event_image.filename + ")"}'>
      <h1 class="event-title">{{story.event_title}}</h1>
    </div>
    <div v-if="!story.event_image.filename" class="banner-image">
      <h1 class="event-title">{{story.event_title}}</h1>
    </div>
  </template>
  <article class="event">
    <div class="left">
      <p class="event-date">{{$filters.formatDate(story.event_date) }}</p>
      <p>{{ story.event_time }}</p>
      <p>{{ story.event_address }}</p>
      <button class="button full-width">Attend this event</button>
      <button class="button full-width">Donate</button>
    </div>
    <div>
      <p>{{story.event_description}}</p>
      <div v-html="eventHtml"></div>
    </div>
    <div class="right">
      <h2>Upcoming Events</h2>
      <div v-for="item in events" :key="item.uuid" @click="goToEvent(item.slug)">
        <p class="event-date">{{$filters.formatDate(item.event_date) }}</p>
        <p>{{item.event_description}}</p>
      </div>
    </div>
  </article>
</template>

<script>
import StoryblokClient from 'storyblok-js-client'
import router from '../router'

let storyApi = new StoryblokClient({
  accessToken: process.env.VUE_APP_STORYBLOK_API
})

export default {
  name: 'Event',
  props: {
    stories: Array
  },
  data() {
    return {
      story: {}
    }
  },
  created() {
    this.getStory()
  },
  methods: {
    getStory() {
      storyApi.get(`cdn/stories/event/${this.$route.params.slug}`, {})
        .then(response => {
          this.story = response.data.story.content
          this.eventHtml = storyApi.richTextResolver.render(this.story.event_body)
        }).catch(error => { 
          console.log(error)
          router.push({ name: 'NotFound' })
        })
    }
  },
  computed: {
    events() {
      return this.stories.filter((story) => story.component === 'Event')
    }
  }
}
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
