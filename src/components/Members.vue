<template>
  <h1 class="page-title">Members</h1>
  <hr />
  <h2 v-if="!user" style="text-align: center">
    Please <router-link to="/signin">sign in</router-link> to access the
    members' area
  </h2>
  <div v-if="user" class="dashboard">
    <button class="button signout" @click="signOut()">Sign Out</button>
    <h2>Artists Database</h2>
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
</template>

<script>
import firebase from "firebase";

export default {
  name: "Members",
  data() {
    return { user: null };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
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
}
.button.signout {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
