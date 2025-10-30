<script setup lang="ts">
  import { useUsersStore } from "../stores/users";

  const loginStore = useUsersStore();

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
