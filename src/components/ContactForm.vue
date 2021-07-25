<template>
  <form class="contact-form" @submit.prevent="sendEmail" v-if="!formSubmitted">
    <label>Email</label>
    <input type="email" name="email" />
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send" />
  </form>
  <img
    v-if="formSubmitted && !messageSent"
    src="../assets/images/loading.gif"
    alt=""
    class="loading"
  />
  <h2 class="message-sent" v-if="messageSent" v-html="messageSent"></h2>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "ContactForm",
  data() {
    return {
      messageSent: "",
      formSubmitted: false,
    };
  },
  methods: {
    sendEmail(e) {
      this.formSubmitted = true;
      emailjs
        .sendForm(
          process.env.VUE_APP_EMAILJS_SERVICE_ID,
          process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
          e.target,
          process.env.VUE_APP_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            console.log(result.status, result.text);
            this.messageSent =
              "Thank you for contacting us, we will get back to you";
          },
          (error) => {
            console.error(error);
            this.messageSent =
              "Sorry, there was a problem, please email us at: <a href='mailto:info@levelground.co'>info@levelground.co</a>";
          }
        );
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
.message-sent {
  text-align: center;
}
.loading {
  width: 100px;
  margin: auto;
  display: block;
}
</style>
