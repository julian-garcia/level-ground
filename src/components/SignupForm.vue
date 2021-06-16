<template>
  <form class="signup form-circles" @submit.prevent="signup">
    <ul>
      <li class="signup__field left">
        <label for="firstname">First Name *</label>
        <input type="text" name="firstname" v-model="firstName" @keyup="validateFirstName">
        <p v-if="firstNameError" class="error">{{ firstNameError }}</p>
      </li>
      <li class="signup__field right">
        <label for="lastname">Last Name *</label>
        <input type="text" name="lastname" v-model="lastName" @keyup="validateLastName">
        <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
      </li>
      <li class="signup__field left">
        <label for="pronouns">Pronouns</label>
        <input type="text" name="pronouns" v-model="pronouns">
      </li>
      <li class="signup__field right">
        <label for="phone">Phone *</label>
        <input type="text" name="phone" v-model="phone" @keyup="validatePhone">
        <p v-if="phoneError" class="error">{{ phoneError }}</p>
      </li>
      <li class="signup__field">
        <label for="email">Email *</label>
        <input type="email" name="email" v-model="email" @keyup="validateEmail">
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </li>
      <li class="signup__field left">
        <label for="website">Website</label>
        <input type="text" name="website" v-model="website">
      </li>
      <li class="signup__field right">
        <label for="instagram">Instagram Handle</label>
        <input type="text" name="instagram" v-model="instagram">
      </li>
      <li class="signup__field">
        <label for="practice">How would you describe your artistic practice? *</label>
        <textarea name="practice" v-model="practice"></textarea>
        <p v-if="practiceError" class="error">{{ practiceError }}</p>
      </li>
      <li class="signup__field">
        <label for="why-join">Why are you interested in joining the collective? *</label>
        <textarea name="why-join" v-model="whyJoin"></textarea>
        <p v-if="whyJoinError" class="error">{{ whyJoinError }}</p>
      </li>
      <li class="signup__field">
        <label for="hear">How did you hear about Level Ground? *</label>
        <textarea name="hear" v-model="hear"></textarea>
        <p v-if="hearError" class="error">{{ hearError }}</p>
      </li>
    </ul>
    <button type="submit" class="button">Sign Up</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      phone: '',
      phoneError: '',
      email: '',
      emailError: '',
      formValid: false
    }
  },
  methods: {
    signup() {
      this.validateFirstName()
      this.validateLastName()
      this.validatePhone()
      this.validateEmail()
      this.formValid = !this.firstNameError && !this.lastNameError && 
        !this.emailError && !this.phoneError;
      if (this.formValid) {
        alert(JSON.stringify(this.$data))
      }
    },
    validateFirstName() {
      this.firstNameError = this.firstName.length > 0 ? '' : 'First name is required'
      if (!this.firstNameError) {
        this.firstNameError = /^[a-zA-Z]+$/.test(this.firstName) ? '' : 'Letters only please'
      }
    },
    validateLastName() {
      this.lastNameError = this.lastName.length > 0 ? '' : 'Last name is required'
      if (!this.lastNameError) {
        this.lastNameError = /^[a-zA-Z]+$/.test(this.lastName) ? '' : 'Letters only please'
      }
    },
    validatePhone() {
      this.phoneError = this.phone.length > 0 ? '' : 'Phone is required'
      if (!this.phoneError) {
        this.phoneError = /^\d+$/.test(this.phone) ? '' : 'Numbers only please'
      }
    },
    validateEmail() {
      this.emailError = this.email.length > 0 ? '' : 'Email is required'
    },
  }
}
</script>

<style scoped>
form { 
  position: relative; 
  margin-bottom: 2rem;
}

form:before {
  content: '';
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

form.signup li.signup__field {
  background: none;
  border: none;
  padding: 0;
  position: relative;
}

form.signup li.signup__field::before {
  content: none;
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input, form textarea {
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

form .left, form .right {
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

@media screen and (min-width: 1250px) {
  form.signup li.signup__field.left {
    padding: 0 5px 0 0;
  }

  form.signup li.signup__field.right {
    padding: 0 0 0 5px;
  }

  form .left, form .right {
    min-width: calc(50% - 5px);
    max-width: calc(50% - 5px);
    display: inline-block;
  }

}
</style>