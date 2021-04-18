<template>
  <h1 class="article-title">{{story.title}}</h1>
  <hr>
  <article class="article">
    <div class="left">
      <div v-html="itemText" v-if="itemText"></div>
    </div>
    <div v-html="articleHtml" v-if="articleHtml"></div>
    <div class="right" v-if="story.right_sidebar">
      <template v-for="sidebar_item in story.right_sidebar" :key="sidebar_item.uuid">
        <div :class="{top: sidebar_item.position === 'top'}" v-if="sidebar_item.feature === 'events'">
          <h2>Upcoming Events</h2>
          <div v-for="item in events" :key="item.uuid" @click="goToEvent(item.slug)" class="event">
            <p class="event-date">{{$filters.formatDate(item.event_date) }}</p>
            <p>{{item.event_description}}</p>
          </div>
        </div>
      </template>
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
  name: 'Page',
  props: {
    stories: Array
  },
  data() {
    return {
      story: {},
      itemText: '',
      articleHtml: ''
    }
  },
  created() {
    this.getStory()
  },
  updated() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been re-rendered
      const codeElement = document.querySelector('code');
      if (codeElement) {
        const iframeElement = codeElement.innerText;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = iframeElement;
        document.querySelector('pre').appendChild(newDiv);
        codeElement.remove();
      }
    })
  },
  methods: {
    getStory() {
      storyApi.get(`cdn/stories/${this.$route.params.slug}`, {})
        .then(response => {
          console.log(response.data.story.content)
          this.story = response.data.story.content
          this.articleHtml = storyApi.richTextResolver.render(this.story.body)
          this.getSidebarData(this.story.left_sidebar)
        }).catch(error => { 
          console.log(error)
          router.push({ name: 'NotFound' })
        })
    },
    getSidebarData(sideBarArray) {
      sideBarArray.forEach(item => {
        if (item.text) {
          this.itemText = storyApi.richTextResolver.render(item.text)
        }
      });
    },
    goToEvent(url) {
      router.push({path: `/event/${url}`})
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
.article { 
  margin: 0; 
  display: grid;
  grid-template-columns: auto;
  gap: 2rem;
}

.article-title {text-align: center;}

.article:deep(iframe) {
  max-width: 100%;
}

:deep(ol) {
  padding: 0;
  list-style: none;
  counter-reset: list-counter;
}

:deep(ul) {
  padding: 0;
  list-style: none;
}

:deep(li) {
  padding: 5px 20px;
  margin: 0;
  border-left: 5px solid var(--highlight-colour-muted);
  border-radius: 10px;
}

:deep(li>*) {
  display: inline-block;
}

:deep(li p) {
  padding-left: 10px;
  max-width: 600px;
}

:deep(li:nth-child(odd)) {
  background: linear-gradient(90deg, var(--highlight-colour-muted) 0%, transparent 100%);
}

:deep(li:nth-child(even)) {
  background: linear-gradient(90deg, var(--highlight-colour-light) 0%, transparent 100%);
}

:deep(li::before) {
  font-family: Playfair;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--highlight-colour);
}

:deep(ul>li::before) {
  content: '◍'
}

:deep(ol>li) {
  counter-increment: list-counter;
}

:deep(ol>li::before) {
  content: counter(list-counter);
}

.left {
  grid-column: auto;
}

.right {
  grid-column: auto;
}

.feature-image {
  max-width: 400px;
}

.event {cursor: pointer;}
.event-date {
  color: var(--highlight-colour);
}

@media screen and (min-width: 1200px) {
  .article {
    grid-template-columns: [left] 1fr [content] 3fr [right] 1fr;
  }
  .left {
    grid-column: left;
  }
  .right {
    grid-column: right;
  }
}
</style>
