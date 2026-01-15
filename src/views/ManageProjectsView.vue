<script setup lang="ts">
  import ProjectC from "@/components/ProjectC.vue";
  import { useUserStore } from "@/stores/users";
  import { useProjectsStore } from "@/stores/projects";
  import { useRouter } from "vue-router";
  import NotificationComponent from "@/components/NotificationComponent.vue"
  import type { Notification } from "@/models/Notification";
  import { ref, type Ref } from "vue";

  const router = useRouter();
  const userStore = useUserStore();
  const projectsStore = useProjectsStore();

  //==========================
  //[START] Check if connected
  const checkIfConnected = () => {
    const token = userStore.getToken;
    const verifToken = token === null || token === undefined;
    if (verifToken) router.push("/login");
  }

  checkIfConnected();
  //[END] Check if connected
  //======================== 
  const messageNotif = ref("")
  const errorNotif = ref(false)

  const MessageNotif = (message: string, error: boolean) => {
    // console.log("message", message)
    messageNotif.value = message
    // console.log("error", error)
    errorNotif.value = error
  }

</script>

<template>
  <div class="projects">
    <div class="projects__title">Manage projects</div>
    <div class="projects__list">
      <ProjectC v-for="(project, key) in projectsStore.projects" :key="key" :project="project"
        @messageNotif="MessageNotif" />
      <NotificationComponent v-if="projectsStore.isNotification" :message="messageNotif" :error="errorNotif">
      </NotificationComponent>

    </div>
  </div>
</template>
