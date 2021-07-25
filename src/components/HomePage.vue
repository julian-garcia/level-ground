<template>
  <div class="home">
    <div class="headline">
      <div class="title-container">
        <h2 class="title">EXPERIMENT</h2>
        <h2 class="title">IN <span class="reverse">E</span>MPATHY</h2>
      </div>
      <div>
        <p>
          Through organizing and creating with artists, Level Ground is
          committed to destabilizing oppressive social structures through art
          making, community building, and resource sharing.
        </p>
        <button class="button" @click="emitShowModal('give')">
          Make a Donation Today
        </button>
        <router-link class="mission" to="/404"
          >Read About Our Mission</router-link
        >
      </div>
    </div>
    <div class="cards__feature">
      <div
        v-for="item in getFeaturePosts"
        class="card__feature"
        :key="item.ID"
        @click="goTo(item.post_name)"
      >
        <div
          class="featured__image"
          :style="{ backgroundImage: 'url(' + item.acf.featured_image + ')' }"
        ></div>
        <p class="featured">Featured Project</p>
        <h2>{{ item.post_title }}</h2>
        <p>{{ item.post_excerpt }}</p>
        <p>{{ $filters.formatDate(item.post_date) }}</p>
      </div>
    </div>
    <div class="updates">
      <div class="latest">
        <h2>Latest Updates</h2>
        <hr />
        <div
          v-for="item in getPosts"
          class="card"
          :key="item.ID"
          @click="goTo(item.post_name)"
        >
          <img class="card__image" :src="item.acf.featured_image" alt="" />
          <div class="card__text">
            <h2 v-if="item.post_title">{{ item.post_title }}</h2>
            <p v-html="item.post_excerpt" v-if="item.post_excerpt"></p>
            <p>{{ $filters.formatDate(item.post_date) }}</p>
          </div>
        </div>
      </div>
      <div class="popular">
        <h2>Popular</h2>
        <hr />
        <div
          v-for="item in getPopularPosts"
          class="card-side"
          :key="item.ID"
          @click="goTo(item.post_name)"
        >
          <div
            class="card-side__image"
            :style="{ backgroundImage: 'url(' + item.acf.featured_image + ')' }"
          ></div>
          <div class="card-side__text">
            <h2>{{ item.post_title }}</h2>
            <p>{{ $filters.formatDate(item.post_date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "HomePage",
  props: {
    stories: Array,
    posts: Array,
  },
  emits: ["showModal"],
  computed: {
    getPopularPosts() {
      return this.posts.filter((post) => post.acf.popular === true).slice(0, 5);
    },
    getPosts() {
      return this.posts.filter((post) => post.acf.feature !== true);
    },
    getFeaturePosts() {
      return this.posts.filter((post) => post.acf.feature === true).slice(0, 2);
    },
  },
  methods: {
    goTo(url) {
      router.push({ path: `/article/${url}` });
    },
    emitShowModal(modalType) {
      this.$emit("showModal", modalType);
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 1100px;
  margin: auto;
}

.cards__feature,
.headline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.cards__feature {
  margin-bottom: 2rem;
}

.card__feature {
  text-align: left;
  cursor: pointer;
  position: relative;
}

.card__feature::before {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: contain;
}

.card__feature:first-of-type::before {
  top: -25px;
  left: -25px;
  background-image: url(../assets/images/circles-feature.svg);
}

.card__feature:last-of-type::before {
  top: 75px;
  right: -25px;
  background-image: url(../assets/images/diagonals.svg);
}

.card__feature img {
  width: 100%;
}

.featured {
  text-transform: uppercase;
  color: var(--highlight-colour);
}

.featured__image {
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.mission {
  text-decoration: none;
  font-size: var(--button-font-size);
  color: black;
  margin: 0 1rem;
  display: block;
}

.headline {
  margin: 1rem 0 3rem;
}

.headline .title {
  margin: 0;
  font-family: Asap;
  font-size: 42px;
  position: relative;
}

.headline .title::after {
  content: "";
  display: none;
  width: 200px;
  height: 26px;
  position: absolute;
}

.headline .title:nth-child(1)::after {
  border-top: 2px solid var(--highlight-colour-muted);
  border-right: 2px solid var(--highlight-colour-muted);
  top: 16px;
  left: 16rem;
}

.headline .title:nth-child(2)::after {
  border-bottom: 2px solid var(--highlight-colour-muted);
  border-left: 2px solid var(--highlight-colour-muted);
  position: absolute;
  bottom: 16px;
  left: -13rem;
}

.headline .title:nth-child(2) {
  margin-left: 0;
}

.headline .title-container {
  align-self: center;
}

.reverse {
  transform: rotate(180deg);
  display: inline-block;
}

.updates {
  display: grid;
  grid-template-columns: auto;
  gap: 2rem;
}

.updates .card {
  display: grid;
  grid-template-columns: auto;
  gap: 1rem;
  cursor: pointer;
}
.updates .card-side {
  cursor: pointer;
}

.updates .card__image {
  width: 100%;
  max-width: 300px;
}
.updates .card-side__image {
  background-size: cover;
  background-repeat: no-repeat;
  height: 200px;
}
.updates .card__text h2 {
  margin-top: 0;
}
.latest > h2 {
  position: relative;
  background: var(--background);
  padding: 0 0 5px 5px;
  margin-left: -5px;
}
.latest > h2::before {
  content: "";
  width: 60px;
  height: 60px;
  position: absolute;
  left: -30px;
  top: 0;
  border-radius: 50%;
  background: var(--accent-colour-2);
  z-index: -1;
}
.popular {
  position: relative;
  background: var(--background);
  margin-bottom: 100px;
}
.popular::before {
  content: "";
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  background: var(--accent-colour-2);
  right: -90px;
  bottom: -80px;
  z-index: -1;
}
.popular > h2 {
  position: relative;
}
.popular > h2::before {
  content: "";
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  border: 2px solid var(--accent-colour);
  right: -25px;
  bottom: -25px;
}

@media screen and (min-width: 600px) {
  .updates {
    grid-template-columns: 1fr 1fr;
  }
  .mission {
    display: inline-block;
  }
}
@media screen and (min-width: 900px) {
  .updates {
    grid-template-columns: 3fr 1fr;
  }
  .updates .card {
    grid-template-columns: 1fr 3fr;
  }
}
@media screen and (min-width: 1150px) {
  .headline .title::after {
    display: block;
  }
  .headline .title:nth-child(2) {
    margin-left: 13rem;
  }
}
</style>
