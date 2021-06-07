<template v-if="page">
  <h1 class="article-title" v-if="page.post_title">{{page.post_title}}</h1>
  <hr>
  <article class="article" v-if="(page && !page.acf) || (page.acf && !page.acf.form_content)">
    <div class="left">
      <p v-html="page.acf.headline" v-if="page.acf" class="headline"></p>
    </div>
    <div v-html="pageHtml" v-if="pageHtml"></div>
    <div class="right">
      <div class="top" v-if="events">
        <Events :events="events" />
      </div>
    </div>
  </article>
  <article class="article columns" v-if="page.acf && page.acf.form_content">
    <div class="column" v-html="pageHtml" v-if="pageHtml"></div>
    <div class="column" v-html="page.acf.form_content"></div>
  </article>
</template>

<script>
import router from '../router'
import Events from './Events.vue'

export default {
  name: 'Page',
  props: {
    pages: Array
  },
  components: { Events },
  data() {
    return {
      page: {},
      events: [],
      itemText: ''
    }
  },
  created(){
    fetch(`${process.env.VUE_APP_CMS_URL}/api/page/${this.$route.params.slug}`)
      .then((r) => r.json())
      .then((res) => {
        this.page = res; 
        if (!this.page.content) {
          this.page.content = `<h2 style="text-align: center">Under construction</h2>`
        }
        this.pageHtml = this.page.content; 
      })
      .catch(() => router.push({path: `/404`}));
    fetch(`${process.env.VUE_APP_CMS_URL}/api/event`)
      .then((r) => r.json())
      .then((res) => {this.events = res;});
  },
  methods: {
    goToEvent(url) {
      router.push({path: `/event/${url}`})
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

.article :deep(ol) {
  padding: 0;
  list-style: none;
  counter-reset: list-counter;
}

.article :deep(ul) {
  padding: 0;
  list-style: none;
}

.article :deep(li) {
  padding: 15px 20px 15px 50px;
  margin: 0;
  border-left: 5px solid var(--highlight-colour-muted);
  border-radius: 10px;
  position: relative;
  line-height: 1.5;
}

.article :deep(li>*) {
  display: inline-block;
}

.article :deep(li p) {
  padding-left: 10px;
  max-width: 600px;
}

.article :deep(li:nth-child(odd)) {
  background: linear-gradient(90deg, var(--highlight-colour-muted) 0%, transparent 100%);
}

.article :deep(li:nth-child(even)) {
  background: linear-gradient(90deg, var(--highlight-colour-light) 0%, transparent 100%);
}

.article :deep(li::before) {
  font-family: Playfair;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--highlight-colour);
  position: absolute;
  left: 15px;
  line-height: 1;
}

.article :deep(ul>li::before) {
  content: '◍'
}

.article :deep(ol>li) {
  counter-increment: list-counter;
}

.article :deep(ol>li::before) {
  content: counter(list-counter);
}

.columns.columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin: auto;
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
  .columns {
    max-width: 1100px;
  }
}
</style>
