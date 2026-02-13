<script setup lang="ts">
  import NavbarC from "./components/NavbarC.vue";
  import { useUserStore } from "./stores/users";

  const loginStore = useUserStore();

  loginStore.initUser();

</script>

<template>
  <Transition name="fade" appear>
    <NavbarC></NavbarC>
  </Transition>

  <Transition name="fade" appear>
    <router-view></router-view>
  </Transition>
</template>

<style>
  @import "./styles/main.scss";
</style>
