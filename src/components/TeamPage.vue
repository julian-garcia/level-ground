<template>
  <div>
    <h1 class="page-title">{{ $route.name }}</h1>
    <hr />
    <h2 class="category-title">Level Ground Leadership</h2>
    <TeamGrid :group="getTeam('leadership')" />
    <h2 class="category-title">Skew Curatorial Team</h2>
    <TeamGrid :group="getTeam('skew')" />
    <h2 class="category-title">Current & Alumni Resident Artists</h2>
    <TeamGrid :group="getTeam('resident')" />
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
    getTeam(category) {
      return this.teamMembers
        .filter((item) => item.acf.category === category)
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
