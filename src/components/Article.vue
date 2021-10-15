<template>
  <h1 class="article-title">{{ post.post_title }}</h1>
  <hr />
  <article class="article" v-if="post">
    <p v-if="post.post_excerpt">{{ post.post_excerpt }}</p>
    <img
      v-if="post.acf"
      :src="post.acf.featured_image"
      class="feature-image"
      alt=""
    />
    <p>{{ $filters.formatDate(post.post_date) }}</p>
    <div v-html="articleHtml" v-if="articleHtml"></div>
  </article>
</template>

<script>
import router from "../router";
import firebase from "firebase";

export default {
  name: "Article",
  data() {
    return {
      post: {},
      articleHtml: "",
    };
  },
  created() {
    const postType =
      this.$route.path.split("/")[1] === "article"
        ? "post"
        : this.$route.path.split("/")[1];

    if (postType !== "post") {
      firebase.auth().onAuthStateChanged((user) => {
        if (user === null) {
          router.push({ path: `/404` });
        }
      });
    }

    fetch(
      `${process.env.VUE_APP_CMS_URL}/api/${postType}/${this.$route.params.slug}`
    )
      .then((r) => r.json())
      .then((res) => {
        this.post = res;
        this.articleHtml = this.post.content
          .replace(/http:\/\/level-ground.local/g, "")
          .replace(/https:\/\/level-ground-cms.space/g, "");
        document.title = `Level Ground - ${this.post.post_title}`;
        if (!this.post.content) {
          router.push({ path: `/404` });
        }
      })
      .catch(() => router.push({ path: `/404` }));
  },
};
</script>

<style scoped>
.article {
  margin: 2rem auto 3rem;
  max-width: 700px;
}

.article-title {
  text-align: center;
  margin: auto;
  max-width: 800px;
}

.article:deep(iframe),
.article:deep(img) {
  max-width: 100%;
  height: auto;
}

.article:deep(.wp-block-gallery) {
  margin: 0;
}
.article:deep(.blocks-gallery-grid) {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  list-style: none;
}
.article:deep(.blocks-gallery-item figure) {
  margin: 0;
}

.feature-image {
  max-width: 100%;
  margin: auto;
  display: block;
}
</style>
