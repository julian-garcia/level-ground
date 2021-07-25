<template>
  <button
    class="button"
    @click="donationFrequency = 'monthly'"
    :class="[donationFrequency === 'monthly' ? 'active' : 'inactive']"
  >
    Monthly
  </button>
  <button
    class="button"
    @click="donationFrequency = 'annually'"
    :class="[donationFrequency === 'annually' ? 'active' : 'inactive']"
  >
    Annually
  </button>
  <iframe
    src="https://donorbox.org/embed/level-ground-membership"
    name="donorbox"
    allowpaymentrequest=""
    seamless="seamless"
    frameborder="0"
    scrolling="no"
    height="900px"
    width="100%"
    style="max-width: 100%; min-width: 300px; max-height: none !important"
    v-if="donationFrequency === 'monthly'"
  ></iframe>
  <iframe
    src="https://donorbox.org/embed/level-ground-membership-annual"
    name="donorbox"
    allowpaymentrequest=""
    seamless="seamless"
    frameborder="0"
    scrolling="no"
    height="900px"
    width="100%"
    style="max-width: 100%; min-width: 300px; max-height: none !important"
    v-if="donationFrequency === 'annually'"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      membership: "",
      donationFrequency: "monthly",
    };
  },
  methods: {
    onSubmit() {
      if (this.$data.membership) {
        alert(JSON.stringify(this.$data));
      }
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
  margin-bottom: 2rem;
}

form:before {
  content: "";
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(../assets/images/diagonals-rectangle.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 190px;
  height: 100px;
  max-width: 100%;
  z-index: -1;
}

form.membership li.membership__option {
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  border: none;
  font-family: Asap, Helvetica, Arial, sans-serif;
  padding: 5px;
  font-size: 16px;
  background: white;
}
form.membership ul > li.membership__option {
  padding: 0;
  position: relative;
  font-weight: bold;
}

form.membership ul > li.membership__option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

form.membership ul > li.membership__option label {
  margin: 0;
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid var(--accent-colour-2);
  border-radius: 5px;
  box-sizing: border-box;
}

form.membership ul > li.membership__option input:checked + label {
  color: white;
  background: var(--highlight-colour);
  box-sizing: border-box;
  border: 1px solid var(--highlight-colour);
  border-radius: 5px;
}

form.membership ul > li.membership__option::before {
  content: none;
}
.button {
  margin: auto;
  display: block;
}

.option-value {
  width: 40px;
  display: inline-block;
}
.option-title {
  color: grey;
}
input:checked + label .option-title {
  color: whitesmoke;
}
.button {
  margin: 0 1rem 1rem 0;
  display: inline-block;
}
.button.inactive {
  background: var(--highlight-colour-muted);
}
</style>