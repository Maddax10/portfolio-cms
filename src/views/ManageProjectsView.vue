<script setup lang="ts">
  import ProjectC from "@/components/ProjectC.vue";
  import { useUsersStore } from "@/stores/users";
  import { useProjectsStore } from "@/stores/projects";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const loginStore = useUsersStore();
  const projectsStore = useProjectsStore();

  //==========================
  //[START] Check if connected
  const checkIfConnected = () => {
    const token = loginStore.getToken;
    const verifToken = token === null || token === undefined;
    if (verifToken) router.push("/login");
  }

  checkIfConnected();
  //[END] Check if connected
  //========================

</script>

<template>
  <div class="projects">
    <div class="projects__title">Manage projects</div>
    <div class="projects__list">
      <ProjectC v-for="(project, key) in projectsStore.projects" :key="key" :project="project" />

    </div>
  </div>
</template>
