import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage.vue";
import Article from "../components/Article.vue";
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
  path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;