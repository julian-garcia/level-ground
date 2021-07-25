<template>
  <Header @showModal="onShowModal" />
  <div class="container">
    <div class="leftbar"></div>
    <div class="content">
      <hr />
      <router-view
        :posts="posts"
        :pages="pages"
        :events="events"
        :teamMembers="teamMembers"
        :key="$route.path"
        @showModal="onShowModal"
      />
      <hr class="square" />
    </div>
    <div class="rightbar"></div>
  </div>
  <Footer />
  <Modal v-if="showModal === 'give'" @showModal="onHideModal">
    <h2>Support Our Artists</h2>
    <p style="max-width: 400px; margin: auto">
      Any amount makes a difference to supporting our artists and enhancing our
      community.
    </p>
    <iframe
      src="https://donorbox.org/embed/level-ground-website-donation"
      name="donorbox"
      allowpaymentrequest=""
      seamless="seamless"
      frameborder="0"
      scrolling="no"
      height="400px"
      width="100%"
      style="max-height: none !important"
    ></iframe>
    <p>
      <router-link to="/membership">Become a member</router-link> by setting up
      a recurring donation.
    </p>
  </Modal>
  <Modal v-if="showModal === 'subscribe'" @showModal="onHideModal">
    <SignupForm />
  </Modal>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import SignupForm from "./components/SignupForm.vue";
import "@csstools/normalize.css";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Modal,
    SignupForm,
  },
  data() {
    return {
      posts: [],
      pages: [],
      events: [],
      teamMembers: [],
      name: this.$route.path,
      showModal: false,
    };
  },
  mounted() {
    fetch(`${process.env.VUE_APP_CMS_URL}/api/post`)
      .then((r) => r.json())
      .then((res) => (this.posts = res));
    fetch(`${process.env.VUE_APP_CMS_URL}/wp/v2/pages`)
      .then((r) => r.json())
      .then((res) => (this.pages = res));
    fetch(`${process.env.VUE_APP_CMS_URL}/api/event`)
      .then((r) => r.json())
      .then((res) => (this.events = res));
    fetch(`${process.env.VUE_APP_CMS_URL}/api/team-member`)
      .then((r) => r.json())
      .then((res) => (this.teamMembers = res));
  },
  methods: {
    onShowModal(modalType) {
      this.showModal = modalType;
    },
    onHideModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Asap, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  background: #fff7f7;
  --background: #fff7f7;
  --background-transparent: #fff7f7b2;
  --highlight-colour: #e5511b;
  --highlight-colour-muted: #ffe9e6;
  --highlight-colour-light: #fef2f0;
  --accent-colour: #f1b52a;
  --accent-colour-2: #feb3a8;
  --button-font-size: 20px;
}

html,
body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.container {
  position: relative;
  display: grid;
  grid-template-columns: [leftbar] 1rem [content] 1fr [rightbar] 1rem;
}

.leftbar {
  grid-column: leftbar;
}

.rightbar {
  grid-column: rightbar;
}

.content {
  grid-column: content;
  margin: auto;
  width: 100%;
  max-width: 1350px;
}

p {
  line-height: 1.6rem;
  font-size: 1.1rem;
}
h1,
h2,
h3 {
  font-family: Playfair;
}
hr {
  border: none;
  height: 2px;
  background: var(--highlight-colour-muted);
  position: relative;
  overflow: visible;
  margin: 1rem 0;
}

hr.square::after {
  content: "";
  position: absolute;
  top: -10px;
  right: -30px;
  height: 50px;
  width: 50px;
  transform: rotate(45deg);
  border: 1px solid var(--highlight-colour);
}

a {
  text-decoration: none;
  color: var(--highlight-colour);
  font-weight: bold;
}

.button,
input[type="button"],
input[type="submit"] {
  border-radius: 5px;
  border: none;
  background: var(--highlight-colour);
  color: white;
  min-width: 100px;
  padding: 0.5rem 1rem;
  font-size: var(--button-font-size);
  font-family: Asap;
  font-weight: normal;
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
}

.button.full-width {
  width: 100%;
}

.page-title {
  text-align: center;
}

input {
  border-radius: 5px;
  border: 1px solid var(--highlight-colour-muted);
  padding: 0.5rem 1rem;
  font-size: var(--button-font-size);
  font-family: Asap;
}

.left .headline {
  color: var(--highlight-colour);
  font-style: italic;
  font-family: Playfair;
  font-weight: bold;
  font-size: 1.2rem;
}

iframe {
  display: block;
  margin: 1rem 0 0;
  max-width: 400px;
}

@font-face {
  font-family: "Asap";
  src: url("./assets/fonts/Asap-Regular.woff2") format("woff2"),
    url("./assets/fonts/Asap-Regular.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  src: url("./assets/fonts/PlayfairDisplay.woff2") format("woff2"),
    url("./assets/fonts/PlayfairDisplay.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  font-style: italic;
  src: url("./assets/fonts/PlayfairDisplay-Italic.woff2") format("woff2"),
    url("./assets/fonts/PlayfairDisplay-Italic.woff") format("woff");
}
@font-face {
  font-family: "Playfair";
  font-style: italic;
  font-weight: bold;
  src: url("./assets/fonts/PlayfairDisplay-BoldItalic.woff2") format("woff2"),
    url("./assets/fonts/PlayfairDisplay-BoldItalic.woff") format("woff");
}
@media screen and (min-width: 300px) {
  .container {
    padding: 0 10px;
    grid-template-columns: [leftbar] 0 [content] 1fr [rightbar] 0;
  }
}
@media screen and (min-width: 600px) {
  .container {
    padding: 0 30px;
  }
  :not(.half) + .half {
    margin-right: 5px;
  }
  .half + .half {
    margin-left: 5px;
  }
}
@media screen and (min-width: 900px) {
  .container {
    grid-template-columns: [leftbar] 0.3fr [content] 3fr [rightbar] 0.3fr;
  }
}
@media screen and (min-width: 1200px) {
  .container {
    grid-template-columns: [leftbar] 0.2fr [content] 3fr [rightbar] 0.2fr;
  }
}
@media screen and (min-width: 2000px) {
  .container {
    grid-template-columns: [leftbar] 1fr [content] 3fr [rightbar] 1fr;
  }
}
</style>
