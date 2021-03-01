<template>
  <div class="headline">
    <div class="title-container">
      <h2 class="title">EXPERIMENT</h2>
      <h2 class="title">IN <span class="reverse">E</span>MPATHY</h2>
    </div>
    <div>
      <p>Level Ground is more than just an arts organization. Our goal is to build a community of unlike minds. Our immersive programming, panels, and moderated discussions encourage informal cultural exchanges that spark new friendships.</p>
      <button class="button">Join Our Collective</button>
      <router-link class="mission" to="/404">Our Mission</router-link>
    </div>
  </div>
  <div class="cards__feature">
    <div v-for="item in stories" class="card__feature" :key="item.uuid" @click="goTo(item.slug)">
      <img :src="item.image.filename" alt="">
      <p class="featured">Featured Project</p>
      <h2>{{item.title}}</h2>
      <p>{{item.intro}}</p>
      <p>{{$filters.formatDate(item.published_at) }}</p>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'HomePage',
  props: {
    stories: Array
  },
  methods: {
    goTo(url) {
      router.push({path: `/article/${url}`})
    }
  }
}
</script>

<style scoped>
  .cards__feature, .headline {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  }

  .headline {
    margin: 1rem 0 3rem;
  }

  .headline .title {
    margin: 0;
    font-family: Asap;
    font-size: 36px;
    position: relative;
  }

  .headline .title::after {
      content: '';
      display: block;
      width: 200px;
      height: 26px;
      position: absolute;
  }

  .headline .title:nth-child(1)::after {
    border-top: 2px solid var(--highlight-colour-muted);
    border-right: 2px solid var(--highlight-colour-muted);
    top: 16px;
    right: -3px;
  }

  .headline .title:nth-child(2)::after {
    border-bottom: 2px solid var(--highlight-colour-muted);
    border-left: 2px solid var(--highlight-colour-muted);
    position: absolute;
    bottom: 16px;
    left: -3px;
  }

  .headline .title:nth-child(2) {
    text-align: right;
  }

  .headline .title-container {
    align-self: center;
  }

  .reverse {
    transform: rotate(180deg);
    display: inline-block;
  }
</style>
