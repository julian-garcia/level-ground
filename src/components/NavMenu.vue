<template>
  <ul class="nav-menu" :class="{ show: showMenu }">
    <li class="nav-menu__item" v-for="item in menuItems" :key="item.ID">
      <router-link
        :to="item.slug"
        @click="showMenu = false"
        v-if="item.slug !== '#'"
        >{{ item.title }}</router-link
      >
      <a v-if="item.slug === '#'" href="#">{{ item.title }}</a>
      <ul class="nav-menu__sub" v-if="item.submenu.length">
        <li v-for="item in item.submenu" :key="item.ID">
          <router-link :to="item.slug" @click="showMenu = false">{{
            item.title
          }}</router-link>
          <ul class="nav-menu__sub2" v-if="item.submenu">
            <li v-for="item in item.submenu" :key="item.ID">
              <router-link
                v-if="item.url"
                :to="item.url"
                @click="showMenu = false"
                >{{ item.title }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <div class="cta">
      <a href="#" @click="emitShowModal('subscribe')">Subscribe</a>
      <router-link @click="showMenu = false" to="/signin" v-if="!user"
        >Sign In</router-link
      >
      <router-link @click="showMenu = false" to="/members" v-if="user"
        >Members</router-link
      >
      <a href="#" class="give" @click="emitShowModal('give')"
        ><img src="../assets/images/give.svg" alt="" /> Give</a
      >
    </div>
    <a
      href="https://www.instagram.com/levelground.co/"
      target="_blank"
      rel="noopener noreferrer"
      class="social"
      ><img src="../assets/images/instagram.png" alt=""
    /></a>
  </ul>
  <img
    src="../assets/images/hamburger.svg"
    alt=""
    @click="showMenu = true"
    class="toggle-menu"
    v-if="!showMenu"
  />
  <img
    src="../assets/images/close.svg"
    alt=""
    @click="showMenu = false"
    class="close-menu"
    v-if="showMenu"
  />
</template>

<script>
import firebase from "firebase";

export default {
  name: "NavMenu",
  data() {
    return {
      menuItems: Array,
      showMenu: false,
      user: null,
    };
  },
  emits: ["showModal"],
  created() {
    this.showMenu = false;
    fetch(`${process.env.VUE_APP_CMS_URL}/api/menu`)
      .then((r) => r.json())
      .then((res) => {
        this.menuItems = res.filter((item) => item.menu_item_parent === "0");
        this.menuItems.map((element) => {
          element["slug"] =
            element.url.indexOf("http") === -1
              ? element.url
              : `/${element.url.split("/")[3]}`;
          element["submenu"] = res.filter(
            (item) => parseInt(item.menu_item_parent) === element.ID
          );
          element["submenu"].forEach((item) => {
            item["submenu"] = res.filter(
              (subItem) => parseInt(subItem.menu_item_parent) === item.ID
            );
            item["submenu"].forEach((subItem) => {
              subItem.url = subItem.url.replace(
                process.env.VUE_APP_CMS_URL.replace("/wp-json", ""),
                ""
              );
            });
            item["slug"] =
              item.url.indexOf("http") === -1
                ? item.url
                : `/${item.url.split("/")[3]}/${item.url.split("/")[4]}`;
          });
        });
      });
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.showMenu = false;
    });
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    emitShowModal(modalType) {
      this.showMenu = false;
      this.$emit("showModal", modalType);
    },
  },
};
</script>

<style scoped>
.nav-menu__item {
  text-align: left;
}

.nav-menu__item a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 10px 0;
  transition: color 0.3s ease-in-out;
}

.nav-menu__item a:hover,
.nav-menu__item a.router-link-active {
  color: var(--highlight-colour);
}

.nav-menu {
  display: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-menu.show {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 99;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

.nav-menu.show .nav-menu__item a {
  display: inline-block;
  margin: 0 auto;
  padding: 10px 0;
  font-size: 24px;
  position: relative;
}

.nav-menu__sub,
.nav-menu__sub2 {
  list-style: none;
  padding-left: 20px;
}

.nav-menu__sub {
  margin-bottom: 20px;
}

.nav-menu__sub2 {
  padding-left: 20px;
}

.toggle-menu {
  position: fixed;
  display: block;
  left: 1rem;
  top: 1rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 9;
}

.close-menu {
  position: fixed;
  display: block;
  right: 0.5rem;
  top: 0;
  padding: 1rem;
  cursor: pointer;
  z-index: 99;
  width: 30px;
}

.cta {
  display: block;
  position: fixed;
  right: 0px;
  top: 80px;
  text-align: right;
  z-index: 9;
  border-right: none;
  background: var(--background-transparent);
  box-shadow: 0 0px 10px var(--highlight-colour);
}

.cta a {
  text-decoration: none;
  color: black;
  margin: 10px 0 5px;
  display: block;
  padding: 5px 15px;
  line-height: 24px;
  max-height: 24px;
}

.give {
  position: relative;
}

.social img {
  height: 30px;
  position: absolute;
  top: 22px;
  right: 72px;
}

.give img {
  position: absolute;
  width: 20px;
  top: 7px;
  bottom: 0px;
  right: 50px;
}

.cta .social {
  margin: 10px 0 0;
  background: transparent;
}

@media screen and (min-width: 900px) {
  .cta,
  .social {
    display: none;
  }
  .nav-menu {
    display: grid;
    position: relative;
    grid-template-columns: repeat(auto-fit, minmax(0, max-content));
    justify-content: center;
    max-width: 800px;
    margin: 1rem auto;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .nav-menu__item {
    text-align: center;
  }
  .nav-menu__item a {
    padding: 10px 1rem;
  }
  .nav-menu.show .nav-menu__item a {
    margin: 10px auto;
  }
  .nav-menu__item > a:hover + .nav-menu__sub {
    opacity: 1;
    z-index: 9;
  }
  .toggle-menu {
    display: none;
  }
  .nav-menu__sub {
    position: absolute;
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease-in-out, z-index 0.3s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    margin-bottom: 0;
  }
  .nav-menu__sub:hover {
    opacity: 1;
    z-index: 9;
  }
  .nav-menu__sub a {
    display: block;
    padding: 5px 1rem 5px 1rem;
    text-align: left;
  }
}
</style>