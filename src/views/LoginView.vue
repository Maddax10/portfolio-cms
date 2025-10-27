<script setup lang="ts">
  import { useUsersStore } from "@/stores/users";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const userStore = useUsersStore();
  userStore.initUser();

  const mail = ref("");
  const password = ref("");
  const user = ref(null);

  const login = async () => {
    const credentials = {
      mail: mail.value,
      password: password.value,
    };

    user.value = await userStore.login(credentials);
    if (user.value != null) router.push("/manage-projects");
  };

  /*================================*/
  //Vérification si l'utilisateur est connecté
  /*================================*/

  const token = userStore.getToken;
  const verifToken = token === null || token === undefined;
  if (!verifToken) router.push("/manage-projects");
</script>

<template>
  <form class="login" v-if="verifToken">
    <label for="" class="login__label">Email</label>
    <input type="mail" class="login__input" v-model="mail" />
    <label for="" class="login__label">Password</label>
    <input type="password" class="login__input" v-model="password" />
    <button class="login__button" @click.prevent="login">Se connecter</button>
  </form>
</template>

<style scoped></style>
