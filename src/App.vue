<script setup lang="ts">
  import NavbarC from "./components/NavbarC.vue";
  import { useUsersStore } from "./stores/users";
  import { useProjectsStore } from "./stores/projects";
  const loginStore = useUsersStore();
  const projectsStore = useProjectsStore();

  loginStore.initUser();
  projectsStore.initProjects();
</script>

<template>
  <NavbarC></NavbarC>
  <router-view></router-view>
</template>

<style>
  @import "./styles/main.scss";
</style>
