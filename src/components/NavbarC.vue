<script setup lang="ts">
  import { useUserStore } from "../stores/users";

  const loginStore = useUserStore();

  const logout = () => {
    loginStore.logout();
  };
</script>

<template>
  <nav class="navbar" v-if="loginStore.getToken !== null">
    <div class="navbar__role">{{ loginStore.getUser?.role }}</div>
    <router-link class="navbar__link button" to="/" @click="logout">disconnect</router-link>
  </nav>
</template>

<style scoped></style>
