import HomeView from "@/views/HomeView.vue";
import ManageProjectsView from "../views/ManageProjectsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: HomeView,
    },
    {
      path: "/manage-projects",
      name: "manage-projects",
      component: ManageProjectsView,
    },
    {
      path: "/:catchAll(.*)", // Capture toutes les routes non définies
      redirect: "/login", // Redirige vers la route login
    },
  ],
});

export default router;
