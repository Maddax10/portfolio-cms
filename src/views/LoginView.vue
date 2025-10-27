<script setup lang="ts">
    import { useLoginStore } from "@/stores/login";
    import { ref } from "vue";

    const loginStore = useLoginStore();

    const mail = ref("");
    const password = ref("");

    const login = () => {
        const credentials = {
            mail: mail.value,
            password: password.value
        }
        loginStore.login(credentials);

    }

</script>

<template>
    <form class="login">
        <label for="" class="login__label">Email</label>
        <input type="mail" class="login__input" v-model="mail">
        <label for="" class="login__label">Password</label>
        <input type="password" class="login__input" v-model="password">
        <button class="login__button" @click.prevent="login">Se connecter</button>
    </form>
</template>

<style scoped></style>
