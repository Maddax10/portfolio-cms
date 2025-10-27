<script setup>
  import { useUsersStore } from "@/stores/users";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const loginStore = useUsersStore();

  //Check if connected
  const token = loginStore.getToken;
  const verifToken = token === null || token === undefined;
  if (verifToken) router.push("/login");
</script>

<template>
  manage-projects
  <div class="projects">
    <div class="projects__role">{{ loginStore.getUser?.role }}</div>
    <ul class="projects__list">
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
    </ul>
  </div>
</template>
