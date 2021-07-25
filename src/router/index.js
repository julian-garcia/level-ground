import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage.vue";
import Article from "../components/Article.vue";
import Event from "../components/Event.vue";
import Grid from "../components/Grid.vue";
import TeamPage from "../components/TeamPage.vue";
import Page from "../components/Page.vue";
import NotFound from "../components/NotFound.vue";
import SignIn from "../components/SignIn.vue";
import Members from "../components/Members.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {title: 'Home'}
  },
  {
    path: "/article/:slug",
    component: Article,
  },
  {
    path: "/event/:slug",
    component: Event,
  },
  {
    path: "/members",
    component: Members,
    meta: {title: 'Members'}
  },
  {
    path: "/:slug",
    component: Page,
  },
  {
    path: "/:slug/:slug",
    component: Page,
  },
  {
    name: "Events",
    path: "/events",
    component: Grid,
    meta: {title: 'Events'}
  },
  {
    name: "Team",
    path: "/about/team",
    component: TeamPage,
    meta: {title: 'Team'}
  },
  {
    name: "News",
    path: "/news",
    component: Grid,
    meta: {title: 'News & Stories'}
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {title: 'Sign In'}
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: {title: 'Page not found'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title === 'Home'
      ? 'Level Ground'
      : `Level Ground - ${to.meta.title}`;
  }
  next();
});

export default router;