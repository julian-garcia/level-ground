<template>
  <form
    ref="signupForm"
    action="https://levelground.us10.list-manage.com/subscribe/post?u=91654b7b2f2c683f33e7f44a4&amp;id=eba597d9f6"
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
        class=""
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
        class=""
        id="mce-LNAME"
        @keyup="validateLastName"
        v-model="lastName"
      />
      <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
    </div>
    <div class="mc-field-group signup__field left">
      <label for="mce-PRONOUNS">Pronouns </label>
      <input
        type="text"
        name="PRONOUNS"
        id="mce-PRONOUNS"
        v-model="pronouns"
        @keyup="validatePronouns"
      />
      <p v-if="pronounsError" class="error">{{ pronounsError }}</p>
    </div>
    <div class="mc-field-group signup__field right">
      <label for="mce-PHONE">Phone </label>
      <input
        type="text"
        name="PHONE"
        id="mce-PHONE"
        @keyup="validatePhone"
        v-model="phone"
      />
      <p v-if="phoneError" class="error">{{ phoneError }}</p>
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
    <div class="mc-field-group signup__field left">
      <label for="mce-LINK">Website </label>
      <input type="text" name="LINK" id="mce-LINK" v-model="website" />
    </div>
    <div class="mc-field-group signup__field right">
      <label for="mce-INSTAGRAM">Instagram Handle </label>
      <input
        type="text"
        name="INSTAGRAM"
        id="mce-INSTAGRAM"
        v-model="instagram"
      />
    </div>
    <div class="mc-field-group signup__field">
      <label for="mce-HEARABOUT">How did you hear about Level Ground? </label>
      <textarea
        name="HEARABOUT"
        id="mce-HEARABOUT"
        v-model="hearAbout"
      ></textarea>
    </div>
    <div class="mc-field-group signup__field">
      <label for="mce-PRACTICE"
        >How do you describe your artistic practice?
      </label>
      <textarea name="PRACTICE" id="mce-PRACTICE" v-model="practice"></textarea>
    </div>
    <div class="mc-field-group signup__field">
      <label for="mce-INTERESTED"
        >Why are you interested in joining the collective?
      </label>
      <textarea
        name="INTERESTED"
        id="mce-INTERESTED"
        v-model="whyJoin"
      ></textarea>
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
        name="b_91654b7b2f2c683f33e7f44a4_eba597d9f6"
        tabindex="-1"
        value=""
      />
    </div>
    <input
      type="submit"
      value="Sign Up"
      name="subscribe"
      id="mc-embedded-subscribe"
      class="button"
    />
  </form>
  <h2 v-if="validFormMessage">
    Thanks! You will now be taken to Mailchimp to confirm your details.
  </h2>
</template>

<script>
export default {
  name: "CollectiveForm",
  data() {
    return {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      phone: "",
      phoneError: "",
      email: "",
      emailError: "",
      pronouns: "",
      pronounsError: "",
      formValid: false,
      validFormMessage: false,
    };
  },
  methods: {
    signup() {
      this.validateFirstName();
      this.validateLastName();
      this.validatePhone();
      this.validateEmail();
      this.validatePronouns();
      this.formValid =
        !this.firstNameError &&
        !this.lastNameError &&
        !this.emailError &&
        !this.phoneError;
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
    validatePhone() {
      this.phoneError = this.phone.length > 0 ? "" : "Phone is required";
      if (!this.phoneError) {
        this.phoneError = /^\d+$/.test(this.phone) ? "" : "Numbers only please";
      }
    },
    validateEmail() {
      this.emailError = this.email.length > 0 ? "" : "Email is required";
    },
    validatePronouns() {
      this.pronounsError =
        this.pronouns.length > 0 ? "" : "Pronouns is required";
    },
  },
};
</script>

<style>
.content form {
  position: relative;
  margin-bottom: 2rem;
}

.content form:before {
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

.content form.signup .signup__field {
  background: none;
  border: none;
  padding: 0;
  position: relative;
}

.content form.signup .signup__field::before {
  content: none;
}

.content form label {
  display: block;
  margin-bottom: 10px;
}

.content form input:not([type="submit"]),
.content form textarea {
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

.content form textarea {
  min-height: 90px;
  max-height: 90px;
}

.content form .left,
.content form .right {
  min-width: 100%;
  max-width: 100%;
  display: block;
  margin: 0;
}

.content form .button {
  margin: auto;
  display: block;
}

.content form .signup__field .error {
  position: absolute;
  bottom: 15px;
  left: 0;
  color: var(--highlight-colour);
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
}

.content form .signup__field.right .error {
  padding: 0 0 0 5px;
}

@media screen and (min-width: 1250px) {
  .content form.signup .signup__field.left {
    padding: 0 5px 0 0;
  }

  .content form.signup .signup__field.right {
    padding: 0 0 0 5px;
  }

  .content form .left,
  .content form .right {
    min-width: calc(50% - 5px);
    max-width: calc(50% - 5px);
    display: inline-block;
  }
}
</style>