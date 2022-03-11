<template v-if="page">
  <h1 class="article-title" v-if="page.post_title">{{ page.post_title }}</h1>
  <hr />
  <article
    class="article"
    v-if="
      (page && !page.acf) ||
      (page.acf && (!page.acf.form_content || page.acf.form_content === 'none'))
    "
  >
    <div class="left">
      <img
        :src="headlineImage"
        alt=""
        v-if="headlineImage"
        class="headline-image desktop"
      />
      <p v-html="page.acf.headline" v-if="page.acf" class="headline"></p>
    </div>
    <div>
      <img
        :src="headlineImage"
        alt=""
        v-if="headlineImage"
        class="headline-image mobile"
      />
      <div v-html="pageHtml" v-if="pageHtml"></div>
    </div>
    <div class="right">
      <div class="top" v-if="events && upcomingEvents">
        <Events :events="events" />
      </div>
    </div>
  </article>
  <article
    class="article"
    v-if="page.acf && page.acf.form_content === 'contact'"
  >
    <div class="left">
      <p
        v-html="page.acf.headline"
        v-if="page.acf.headline"
        class="headline"
      ></p>
    </div>
    <div>
      <div v-html="pageHtml" v-if="pageHtml"></div>
      <ContactForm />
    </div>
    <div class="right"></div>
  </article>
  <article
    class="article columns"
    v-if="
      page.acf &&
      page.acf.form_content &&
      page.acf.form_content !== 'contact' &&
      page.acf.form_content !== 'none'
    "
  >
    <div class="column" v-html="pageHtml" v-if="pageHtml"></div>
    <div
      class="column"
      v-if="page.acf.form_content && page.acf.form_content !== 'none'"
    >
      <MembershipForm v-if="page.acf.form_content === 'membership'" />
      <CollectiveForm v-if="page.acf.form_content === 'signup'" />
    </div>
  </article>
</template>

<script>
import router from "../router";
import Events from "./Events.vue";
import MembershipForm from "./MembershipForm.vue";
import CollectiveForm from "./CollectiveForm.vue";
import ContactForm from "./ContactForm.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Page",
  props: {
    pages: Array,
  },
  components: { Events, MembershipForm, CollectiveForm, ContactForm },
  data() {
    return {
      page: {},
      events: [],
      itemText: "",
    };
  },
  created() {
    fetch(`${process.env.VUE_APP_CMS_URL}/api/page/${this.$route.params.slug}`)
      .then((r) => r.json())
      .then((res) => {
        this.page = res;
        this.pageHtml = this.page.content
          .replace(/href="http:\/\/level-ground.local/g, 'href="')
          .replace(/href="https:\/\/level-ground-cms.space/g, 'href="');
        document.title = `Level Ground - ${this.page.post_title}`;
        if (this.page.acf && this.pageHtml) {
          setTimeout(() => {
            document
              .querySelectorAll(".article li:not(.blocks-gallery-item)")
              .forEach((item) => {
                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: item,
                      scrub: 0,
                      start: "top bottom",
                      end: "top 65%",
                    },
                  })
                  .from(item, {
                    x: -100,
                    opacity: 0,
                    rotateY: 90,
                    ease: "power1.inOut",
                  });
              });
          }, 0);
        }
      })
      .catch(() => router.push({ path: `/404` }));
    fetch(`${process.env.VUE_APP_CMS_URL}/api/event`)
      .then((r) => r.json())
      .then((res) => {
        this.events = res;
      });
  },
  methods: {
    goToEvent(url) {
      router.push({ path: `/event/${url}` });
    },
  },
  computed: {
    upcomingEvents() {
      if (this.page.acf) {
        return this.page.acf.upcoming_events || false;
      }
      return false;
    },
    headlineImage() {
      if (this.page.acf) {
        return this.page.acf.headline_image || false;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.article {
  margin: 0;
  display: grid;
  grid-template-columns: auto;
  gap: 2rem;
}

.article .column {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.article-title {
  text-align: center;
}

.article:deep(iframe) {
  max-width: 100%;
  margin: 0;
}

.article:deep(img),
.article:deep(.wp-block-column figure.wp-block-image img) {
  max-width: 100%;
  height: auto;
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

.article :deep(li:not(.blocks-gallery-item)) {
  padding: 15px 20px 15px 50px;
  margin: 0;
  border-left: 5px solid var(--highlight-colour-muted);
  border-radius: 10px;
  position: relative;
  line-height: 1.5;
}

.article :deep(li > *) {
  display: inline-block;
}

.article :deep(li p) {
  padding-left: 10px;
  max-width: 600px;
}

.article :deep(li:nth-child(odd):not(.blocks-gallery-item)) {
  background: linear-gradient(
    90deg,
    var(--highlight-colour-muted) 0%,
    var(--background) 100%
  );
}

.article :deep(li:nth-child(even):not(.blocks-gallery-item)) {
  background: linear-gradient(
    90deg,
    var(--highlight-colour-light) 0%,
    var(--background) 100%
  );
}

.article :deep(li::before:not(.blocks-gallery-item)) {
  font-family: Playfair;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--highlight-colour);
  position: absolute;
  left: 15px;
  line-height: 1;
}

.article :deep(ul > li::before:not(.blocks-gallery-item)) {
  content: "◍";
}

.article :deep(ol > li) {
  counter-increment: list-counter;
}

.article :deep(ol > li::before) {
  content: counter(list-counter);
}

.article :deep(.has-text-align-center) {
  text-align: center;
}

:deep(.blocks-gallery-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 2rem 0;
}

:deep(.blocks-gallery-item figure) {
  margin: 0;
}

:deep(.wp-block-gallery) {
  margin: 0;
}

:deep(.wp-block-gallery > .wp-block-image) {
  margin: 0;
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

.event {
  cursor: pointer;
}
.event-date {
  color: var(--highlight-colour);
}

.headline-image {
  width: 100%;
  margin-top: 1rem;
  max-width: 300px;
}

.headline-image.mobile {
  display: block;
  float: none;
  margin-right: 1rem;
}

.headline-image.desktop {
  display: none;
}

.article :deep(.residency) {
  display: block;
}

@media screen and (min-width: 500px) {
  .headline-image.mobile {
    float: left;
  }
  .article :deep(.residency) {
    display: flex;
  }
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
  .headline-image.mobile {
    display: none;
  }
  .headline-image.desktop {
    display: block;
  }
}
</style>
