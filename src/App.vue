<script setup lang="ts">
  import NavbarC from "./components/NavbarC.vue";
  import { useUserStore } from "./stores/users";
  import { useProjectsStore } from "./stores/projects";
  import { useSkillsStore } from "./stores/skills";

  const loginStore = useUserStore();
  const projectsStore = useProjectsStore();
  const skillsStore = useSkillsStore()

  loginStore.initUser();
  projectsStore.initProjects();
  skillsStore.initSkills();

</script>

<template>
  <NavbarC></NavbarC>
  <router-view></router-view>
</template>

<style>
  @import "./styles/main.scss";
</style>
