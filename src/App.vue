<script setup lang="ts">
import NavbarC from "./components/NavbarC.vue";
import { useLoginStore } from "./stores/login";
const loginStore = useLoginStore();
loginStore.initFromStorage();
</script>

<template>
  <NavbarC></NavbarC>
  <router-view></router-view>
</template>

<style>
@import "./styles/main.scss";
</style>
