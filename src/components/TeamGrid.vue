<template>
  <div class="grid">
    <div
      v-for="item in group"
      class="grid__item"
      :class="{ 'no-link': !item.acf.link }"
      :key="item.ID"
      @click="goTo(item.acf.link)"
    >
      <template v-if="item.acf">
        <div
          v-if="item.acf.photo"
          class="feature-image"
          :style="{ backgroundImage: 'url(' + item.acf.photo + ')' }"
        ></div>
        <div v-if="!item.acf.photo" class="feature-image"></div>
      </template>
      <h2 class="team-member-detail">{{ item.post_title }}</h2>
      <p class="team-member-detail">{{ item.post_excerpt }}</p>
      <p class="team-member-detail">{{ item.acf.pronouns }}</p>
      <p class="team-member-bio" v-if="item.acf.bio">{{ item.acf.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamGrid",
  props: {
    group: Array,
  },
  methods: {
    goTo(url) {
      if (url) {
        window.location.href = url;
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  gap: 2rem;
  margin: 0 auto 3rem;
  justify-content: center;
}

.grid__item {
  cursor: pointer;
  position: relative;
}

.grid__item:hover .team-member-bio {
  opacity: 1;
}

.grid__item.no-link {
  cursor: default;
}

.grid__item img {
  width: 100%;
}

.feature-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../assets/images/event.jpg);
  height: 240px;
}

.feature-image + .team-member-detail {
  margin: 10px 0 0;
}

.team-member-detail {
  text-align: center;
  margin: 5px 0 0;
}

.team-member-bio {
  position: absolute;
  top: 0;
  margin: 0;
  padding: 10px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  width: calc(100% - 20px);
}
</style>
