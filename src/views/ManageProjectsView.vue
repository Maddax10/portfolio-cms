<script setup>
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

const router = useRouter();
const loginStore = useLoginStore();

//Check if conncted
if (loginStore.getUser === null) router.push("/login");
</script>

<template>
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
