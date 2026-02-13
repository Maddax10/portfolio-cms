<script setup lang="ts">
  import NavbarC from "./components/NavbarC.vue";
  import { useUserStore } from "./stores/users";

  const loginStore = useUserStore();

  loginStore.initUser();

</script>

<template>
  <TransitionGroup name="fade">
    <NavbarC></NavbarC>
    <router-view></router-view>
  </TransitionGroup>
</template>

<style>
  @import "./styles/main.scss";
</style>
