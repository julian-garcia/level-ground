<template>
  <h2 v-if="!user" style="text-align: center">
    Please <router-link to="/signin">sign in</router-link> to access the
    members' area
  </h2>
  <h1 class="page-title" v-if="user">Collective Artists</h1>
  <hr v-if="user" />
  <div class="links" v-if="user">
    <button
      class="button links-button"
      @click="tab = 'blog'"
      :class="[tab === 'blog' ? 'active' : 'inactive']"
    >
      Content
    </button>
    <button
      class="button links-button"
      @click="tab = 'calendar'"
      :class="[tab === 'calendar' ? 'active' : 'inactive']"
    >
      Calendar
    </button>
    <button
      class="button links-button"
      @click="tab = 'artists'"
      :class="[tab === 'artists' ? 'active' : 'inactive']"
    >
      Artist Database
    </button>
    <button
      class="button links-button"
      @click="tab = 'resources'"
      :class="[tab === 'resources' ? 'active' : 'inactive']"
    >
      Resources
    </button>
    <button
      class="button links-button"
      @click="tab = 'opportunities'"
      :class="[tab === 'opportunities' ? 'active' : 'inactive']"
    >
      Opportunities
    </button>
    <button class="button links-button signout" @click="signOut()">
      Sign Out
    </button>
  </div>
  <div v-if="user" class="dashboard">
    <div class="tab" v-if="tab === 'blog'">
      <Grid :memberPosts="memberPosts" />
    </div>
    <div class="tab" v-if="tab === 'opportunities'">
      <Grid :opportunityPosts="opportunityPosts" />
    </div>
    <div class="tab" v-if="tab === 'artists'">
      <hr />
      <iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrymnQBj8pX6Ah4K?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="533"
        style="background: transparent"
      ></iframe>
    </div>
    <div class="tab" v-if="tab === 'resources'" style="text-align: center">
      <hr />
      <div class="column" v-html="memberResources" v-if="memberResources"></div>
    </div>
    <div class="tab" v-if="tab === 'calendar'">
      <hr />
      <iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrgsqjiDa93QAfTq?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="533"
        style="background: transparent"
      ></iframe>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Grid from "./Grid.vue";

export default {
  name: "Members",
  components: {
    Grid,
  },
  data() {
    return {
      user: null,
      tab: "blog",
      memberPosts: [],
      opportunityPosts: [],
      memberResources: [],
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        fetch(`${process.env.VUE_APP_CMS_URL}/api/member-article`)
          .then((r) => r.json())
          .then((res) => (this.memberPosts = res));
        fetch(`${process.env.VUE_APP_CMS_URL}/api/opportunity`)
          .then((r) => r.json())
          .then((res) => (this.opportunityPosts = res));
        fetch(`${process.env.VUE_APP_CMS_URL}/api/page/member-resources`)
          .then((r) => r.json())
          .then((res) => (this.memberResources = res.post_content));
      }
    });
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$emit("userSignout", null);
        });
    },
  },
};
</script>

<style scoped>
iframe {
  max-width: 100%;
}
.dashboard {
  position: relative;
  max-width: 970px;
  margin: auto;
}
.button.signout {
  margin-bottom: 10px;
}
.links,
.tab-title {
  text-align: center;
}
.links-button {
  margin: 10px 5px 5px;
}
.links-button.active {
  background: black;
  border: 1px solid black;
  cursor: default;
  position: relative;
}
.links-button.active::before {
  content: "";
  width: 22px;
  height: 22px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  background: black;
  transform: translateX(-50%) rotate(45deg);
  z-index: -1;
}
.links-button.active:hover {
  color: white;
}
</style>
