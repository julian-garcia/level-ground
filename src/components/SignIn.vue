<template>
  <h1>Sign In</h1>
  <p class="signin-intro">
    This sign-in page takes you to content exclusively for the Level Ground
    community. If you're an artist that wants to join the Level Ground
    Collective,
    <router-link to="/collective">click here</router-link>. If you want to
    support experiments in empathy, you can join the Level Ground community by
    <router-link to="/membership">becoming&nbsp;a&nbsp;member</router-link>.
  </p>
  <div class="signin-form">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label><strong>Email</strong></label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="email"
        />
      </div>

      <div class="form-group">
        <label><strong>Password</strong></label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="password"
        />
      </div>

      <input type="submit" class="button" value="Sign In" />
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "SignIn",
  data() {
    return {
      user: null,
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.user = firebase.auth().currentUser;
          this.email = "";
          this.password = "";
          this.$router.push("/members");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style scoped>
.signin-intro {
  max-width: 700px;
  margin: auto;
}

h1 {
  text-align: center;
}

.signin-form {
  max-width: 100%;
  width: 400px;
  margin: 1rem auto;
}

.signin-form input {
  width: 100%;
  margin: 0 0 1rem;
  box-sizing: border-box;
}

.signin-form label {
  display: block;
  margin: 0 0 0.5rem;
  font-size: 18px;
}
</style>
