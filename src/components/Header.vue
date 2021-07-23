<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/images/level-ground-logo.svg" alt="" class="logo" />
    </router-link>
    <NavMenu />
    <div class="cta">
      <a href="#" @click="emitShowModal('subscribe')">Subscribe</a>
      <router-link to="/signin" v-if="!user">Sign In</router-link>
      <router-link to="/members" v-if="user">Members</router-link>
      <a href="#" class="give" @click="emitShowModal('give')"
        ><img src="../assets/images/give.svg" alt="" /> Give</a
      >
    </div>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import firebase from "firebase";

export default {
  name: "Header",
  data() {
    return { user: null };
  },
  emits: ["showModal"],
  components: {
    NavMenu,
  },
  methods: {
    emitShowModal(modalType) {
      this.$emit("showModal", modalType);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log(user);
    });
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.logo {
  max-width: 260px;
}

.give {
  position: relative;
}
.give img {
  position: absolute;
  width: 20px;
  top: unset;
  bottom: 0px;
  right: 35px;
}

.cta {
  display: block;
  position: fixed;
  right: 10px;
  top: 0;
  width: 68px;
  text-align: right;
}

.cta a {
  text-decoration: none;
  color: black;
  margin: 10px 0 5px;
  display: block;
  background: var(--background-transparent);
}

@media screen and (min-width: 900px) {
  .cta {
    display: block;
    position: absolute;
    right: 1rem;
    top: 0;
    width: unset;
    text-align: center;
  }
  .cta a {
    display: inline;
    padding: 0 15px;
  }
  .give img {
    top: -1px;
    right: 45px;
    bottom: unset;
  }
}
</style>
