import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage.vue";
import Article from "../components/Article.vue";
import Event from "../components/Event.vue";
import Grid from "../components/Grid.vue";
import Page from "../components/Page.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
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
    path: "/:slug",
    component: Page,
  },
  {
    name: "Events",
    path: "/events",
    component: Grid,
  },
  {
    name: "News",
    path: "/news",
    component: Grid,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;