<template>
  <form
    ref="signupForm"
    action="https://levelground.us10.list-manage.com/subscribe/post?u=91654b7b2f2c683f33e7f44a4&amp;id=95e2975d27"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="signup form-circles"
    novalidate
    @submit.prevent="signup"
  >
    <div class="mc-field-group signup__field left">
      <label for="mce-FNAME">First Name </label>
      <input
        type="text"
        name="FNAME"
        id="mce-FNAME"
        @keyup="validateFirstName"
        v-model="firstName"
      />
      <p v-if="firstNameError" class="error">{{ firstNameError }}</p>
    </div>
    <div class="mc-field-group signup__field right">
      <label for="mce-LNAME">Last Name </label>
      <input
        type="text"
        name="LNAME"
        id="mce-LNAME"
        @keyup="validateLastName"
        v-model="lastName"
      />
      <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
    </div>
    <div class="mc-field-group signup__field">
      <label for="mce-EMAIL">Email Address </label>
      <input
        type="email"
        name="EMAIL"
        id="mce-EMAIL"
        v-model="email"
        @keyup="validateEmail"
      />
      <p v-if="emailError" class="error">{{ emailError }}</p>
    </div>
    <div id="mce-responses" class="clear">
      <div class="response" id="mce-error-response" style="display: none"></div>
      <div
        class="response"
        id="mce-success-response"
        style="display: none"
      ></div>
    </div>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px" aria-hidden="true">
      <input
        type="text"
        name="b_91654b7b2f2c683f33e7f44a4_95e2975d27"
        tabindex="-1"
        value=""
      />
    </div>
    <input
      type="submit"
      value="Subscribe"
      name="subscribe"
      id="mc-embedded-subscribe"
      class="button"
    />
    <p>
      Level Ground sends emails about once a month, and sometimes more
      frequently when we're promoting a big event or project. We promise to
      respect your time, attention, and privacy.
    </p>
  </form>
  <h2 v-if="validFormMessage">
    Thanks! You will now be taken to <br />Mailchimp to confirm your details.
  </h2>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      formValid: false,
      validFormMessage: false,
    };
  },
  methods: {
    signup() {
      this.validateFirstName();
      this.validateLastName();
      this.validateEmail();
      this.formValid =
        !this.firstNameError && !this.lastNameError && !this.emailError;
      if (this.formValid) {
        this.validFormMessage = true;
        setTimeout(() => {
          this.$refs.signupForm.submit();
          this.$refs.signupForm.reset();
        }, 3000);
      }
    },
    validateFirstName() {
      this.firstNameError =
        this.firstName.length > 0 ? "" : "First name is required";
      if (!this.firstNameError) {
        this.firstNameError = /^[a-zA-Z]+$/.test(this.firstName)
          ? ""
          : "Letters only please";
      }
    },
    validateLastName() {
      this.lastNameError =
        this.lastName.length > 0 ? "" : "Last name is required";
      if (!this.lastNameError) {
        this.lastNameError = /^[a-zA-Z]+$/.test(this.lastName)
          ? ""
          : "Letters only please";
      }
    },
    validateEmail() {
      this.emailError = this.email.length > 0 ? "" : "Email is required";
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
  margin-bottom: 2rem;
  max-width: 500px;
}

form:before {
  content: "";
  position: absolute;
  bottom: -25px;
  right: -50px;
  background-image: url(../assets/images/circles-wide.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 400px;
  height: 150px;
  max-width: 100%;
  z-index: -1;
}

form.signup .signup__field {
  background: none;
  border: none;
  padding: 0;
  position: relative;
}

form.signup .signup__field::before {
  content: none;
}

form p {
  background: rgba(255, 255, 255, 0.8);
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input:not([type="submit"]),
form textarea {
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 2.5rem;
  box-sizing: border-box;
  border: 1px solid var(--accent-colour-2);
  border-radius: 5px;
  font-family: Asap, Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 16px;
  background: white;
}

form textarea {
  min-height: 90px;
  max-height: 90px;
}

form .left,
form .right {
  min-width: 100%;
  max-width: 100%;
  display: block;
  margin: 0;
}

form .button {
  margin: auto;
  display: block;
}

form .signup__field .error {
  position: absolute;
  bottom: 15px;
  left: 0;
  color: var(--highlight-colour);
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
}

form .signup__field.right .error {
  padding: 0 0 0 5px;
}

@media screen and (min-width: 600px) {
  form.signup .signup__field.left {
    padding: 0 5px 0 0;
  }

  form.signup .signup__field.right {
    padding: 0 0 0 5px;
  }

  form .left,
  form .right {
    min-width: calc(50% - 5px);
    max-width: calc(50% - 5px);
    display: inline-block;
  }
}
</style>