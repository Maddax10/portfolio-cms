<script setup lang="ts">
  import NavbarC from "./components/NavbarC.vue";
  import { useUsersStore } from "./stores/users";
  const loginStore = useUsersStore();
  loginStore.initUser();
</script>

<template>
  <NavbarC></NavbarC>
  <router-view></router-view>
</template>

<style>
  @import "./styles/main.scss";
</style>
