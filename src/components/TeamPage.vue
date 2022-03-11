<template>
  <div v-if="teamMembers.length">
    <h1 class="page-title">{{ $route.name }}</h1>
    <hr />
    <div :key="cat" v-for="cat in getCategories()">
      <h2 class="category-title">{{ cat.label }}</h2>
      <TeamGrid :group="getTeam(cat.value)" />
    </div>
  </div>
</template>

<script>
import TeamGrid from "./TeamGrid.vue";

export default {
  name: "TeamPage",
  components: { TeamGrid },
  props: {
    teamMembers: Array,
  },
  methods: {
    getCategories() {
      let categories = [];
      this.teamMembers.forEach((item) =>
        Object.values(item.acf.category).forEach((n) => {
          if (categories.map((i) => i.value).indexOf(n.value) === -1) {
            categories.push({ value: n.value, label: n.label });
          }
        })
      );
      return categories;
    },
    getTeam(category) {
      return this.teamMembers
        .filter((item) =>
          item.acf.category.some((cat) => cat.value === category)
        )
        .sort((a, b) => (a.post_title > b.post_title ? 1 : -1));
    },
  },
};
</script>

<style scoped>
.category-title {
  text-align: center;
}
</style>
