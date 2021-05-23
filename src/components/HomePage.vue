<template>
  <div class="home">
  <div class="headline">
    <div class="title-container">
      <h2 class="title">EXPERIMENT</h2>
      <h2 class="title">IN <span class="reverse">E</span>MPATHY</h2>
    </div>
    <div>
      <p>Through organizing and creating with artists, Level Ground is committed to destabilizing oppressive social structures through art making, community building, and resource sharing.</p>
      <button class="button">Make a Donation Today</button>
      <router-link class="mission" to="/404">Read About Our Mission</router-link>
    </div>
  </div>
  <div class="cards__feature">
    <div v-for="item in getFeaturePosts" class="card__feature" :key="item.ID" @click="goTo(item.post_name)">
      <img :src="item.acf.featured_image" alt="">
      <p class="featured">Featured Project</p>
      <h2>{{item.post_title}}</h2>
      <p>{{item.post_excerpt}}</p>
      <p>{{$filters.formatDate(item.post_date) }}</p>
    </div>
  </div>
  <div class="updates">
    <div class="latest">
      <h2>Latest Updates</h2>
      <hr>
      <div v-for="item in getPosts" class="card" :key="item.ID" @click="goTo(item.post_name)">
        <img class="card__image" :src="item.acf.featured_image" alt="">
        <div class="card__text">
          <h2 v-if="item.post_title">{{item.post_title}}</h2>
          <p v-html="item.post_excerpt" v-if="item.post_excerpt"></p>
          <p>{{$filters.formatDate(item.post_date) }}</p>
        </div>
      </div>
    </div>
    <div class="popular">
      <h2>Popular</h2>
      <hr>
      <div v-for="item in getPopularPosts" class="card-side" :key="item.ID" @click="goTo(item.post_name)">
        <div class="card-side__image" :style='{backgroundImage: "url(" + item.acf.featured_image + ")"}'></div>
        <div class="card-side__text">
          <h2>{{item.post_title}}</h2>
          <p>{{$filters.formatDate(item.post_date) }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'HomePage',
  props: {
    stories: Array,
    posts: Array
  },
  computed: {
    getPopularPosts() {
      return this.posts.filter(post => post.acf.popular === true);
    },
    getPosts() {
      return this.posts.filter(post => post.acf.feature !== true);
    },
    getFeaturePosts() {
      return this.posts.filter(post => post.acf.feature === true);
    }
  },
  methods: {
    goTo(url) {
      router.push({path: `/article/${url}`})
    }
  }
}
</script>

<style scoped>
  .home {
    max-width: 1100px;
    margin: auto;
  }
  .cards__feature, .headline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .card__feature {
    text-align: left;
    cursor: pointer;
  }

  .card__feature img {
    width: 100%;
  }

  .featured {
    text-transform: uppercase;
    color: var(--highlight-colour);
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
      content: '';
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
  .updates .card-side { cursor: pointer; }

  .updates .card__image { width: 100% }
  .updates .card-side__image { 
    background-size: cover;
    background-repeat: no-repeat;
    height: 120px;
  }
  .updates .card__text h2 { margin-top: 0; }

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
