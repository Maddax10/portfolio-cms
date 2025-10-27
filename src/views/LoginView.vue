<script setup lang="ts">
import { useLoginStore } from "@/stores/login";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginStore = useLoginStore();

const mail = ref("");
const password = ref("");
const user = ref(null);

const login = async () => {
  const credentials = {
    mail: mail.value,
    password: password.value,
  };

  user.value = await loginStore.login(credentials);
  console.log(user.value);
  if (user.value != null) router.push("/manage-projects");
};
</script>

<template>
  <form class="login" v-if="user === null">
    <label for="" class="login__label">Email</label>
    <input type="mail" class="login__input" v-model="mail" />
    <label for="" class="login__label">Password</label>
    <input type="password" class="login__input" v-model="password" />
    <button class="login__button" @click.prevent="login">Se connecter</button>
  </form>
</template>

<style scoped></style>
