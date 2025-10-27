<script setup lang="ts">
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();

const logout = () => {
  loginStore.logout();
};
</script>

<template>
  <nav class="navbar" v-if="loginStore.getToken !== null">
    <router-link class="navbar__link" to="/" @click="logout">disconnect</router-link>
  </nav>
</template>

<style scoped></style>
