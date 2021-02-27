<template>
  <div class="cards__feature">
    <div v-for="item in blok" class="card__feature" :key="item.uuid">
      <img :src="item.content.image.filename" alt="">
      <p>Featured Project</p>
      <h2>{{item.content.title}}</h2>
      <p>{{item.content.intro}}</p>
      <p>{{item.published_at}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    blok: Array
  }
}
</script>

<style scoped>
  .cards__feature {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .card__feature {
    text-align: left;
  }
  
  .card__feature img {
    width: 100%;
  }
</style>
