<script setup>
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

const router = useRouter();
const loginStore = useLoginStore();

//Check if conncted
const token = loginStore.getToken;
const verifToken = token === null || token === undefined;
if (verifToken) router.push("/login");
</script>

<template>
  manage-projects
  <div class="projects">
    <ul class="projects__list">
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
      <li class="projects_project"></li>
    </ul>
  </div>
</template>
