<template>
  <footer class="footer">
    <h3>Join our mailing list.</h3>
    <p>Don't miss out on news, events and updates from Level Ground</p>
    <form
      action="https://levelground.us10.list-manage.com/subscribe/post?u=91654b7b2f2c683f33e7f44a4&amp;id=95e2975d27"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="footer__form"
      novalidate
    >
      <img src="../assets/images/circles.svg" alt="" class="circles" />
      <input type="text" name="FNAME" id="mce-FNAME" placeholder="First Name" />
      <input type="text" name="LNAME" id="mce-LNAME" placeholder="Last Name" />
      <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="Email" />
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
    </form>

    <p>
      Copyright &copy; {{ fullYear }} Level Ground. All rights reserved.<br />Find
      us at 1646 N Spring Street, Los Angeles, CA 90012
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      fullYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.footer h2 {
  position: relative;
  z-index: 1;
}

.footer__form {
  list-style: none;
  padding: 0;
  width: 250px;
  margin: auto;
}

.footer__form input {
  display: block;
  margin: 0 auto 0.5rem;
  position: relative;
}

.circles {
  position: absolute;
  height: 130px;
  top: 0;
  transform: translateX(-50%);
}

@media screen and (min-width: 900px) {
  .footer__form {
    width: unset;
  }
  .footer__form input {
    display: inline-block;
    margin: 0 0.5rem 0.5rem;
  }
}
</style>
