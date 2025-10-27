import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ManageProjectsView from "@/views/ManageProjectsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
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
