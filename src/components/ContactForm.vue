<template>
  <form class="contact-form" @submit.prevent="sendEmail" v-if="!formSubmitted">
    <label>Email</label>
    <input type="email" name="email" v-model="email" />
    <label>Message</label>
    <textarea name="message" v-model="message"></textarea>
    <input type="submit" value="Send" class="button" />
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
      email: "",
      message: "",
      formSubmitted: false,
      formValid: false,
    };
  },
  methods: {
    sendEmail(e) {
      this.formValid = this.email.length > 0 && this.message.length > 0;
      if (this.formValid) {
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
              document.querySelector(".article h2").remove();
              this.messageSent =
                "Thank you for reaching out, we will get back to you shortly!";
            },
            (error) => {
              console.error(error);
              this.messageSent =
                "Sorry, there was a problem, please email us at: <a href='mailto:info@levelground.co'>info@levelground.co</a>";
            }
          );
      }
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
