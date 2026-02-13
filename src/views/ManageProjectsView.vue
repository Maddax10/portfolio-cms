<script setup lang="ts">
  import ProjectC from "@/components/ProjectC.vue";
  import { useUserStore } from "@/stores/users";
  import { useProjectsStore } from "@/stores/projects";
  import { useRouter } from "vue-router";
  import NotificationComponent from "@/components/NotificationComponent.vue"
  import { ref } from "vue";
  import AddProjectModal from "@/components/modals/AddProjectModal.vue";
  import { useImagesStore } from "@/stores/images";
  import { useSkillsStore } from "@/stores/skills";

  const router = useRouter();
  const userStore = useUserStore();
  const projectsStore = useProjectsStore();
  const skillsStore = useSkillsStore()

  projectsStore.initProjects();
  skillsStore.initSkills();

  //#region Check if connected
  const checkIfConnected = () => {
    const token = userStore.getToken;
    const verifToken = token === null || token === undefined;
    if (verifToken) router.push("/login");
  }

  checkIfConnected();
  //#endregion Check if connected

  //#region Notifications

  const messageNotif = ref("")
  const errorNotif = ref(false)

  const MessageNotif = (message: string, error: boolean) => {
    // console.log("message", message)
    messageNotif.value = message
    // console.log("error", error)
    errorNotif.value = error
  }
  //#endregion Notifications

  const isAddProject = ref(false)
  const addProject = () => {
    toggleAddProjectModal();
    // showModalAddProject();

  }
  const toggleAddProjectModal = () => {
    isAddProject.value = !isAddProject.value;
    console.log("isAddProject.value", isAddProject.value);

  }

</script>

<template>

  <div class="projects">
    <Transition name="fade">
      <AddProjectModal v-if="isAddProject" @close="toggleAddProjectModal" @messageNotif="MessageNotif">
      </AddProjectModal>
    </Transition>
    <div class="projects__title">Manage projects</div>
    <button type="button" class="navbar__addProject" @click.prevent="addProject">Ajouter</button>
    <div class="projects__list">
      <ProjectC v-for="(project, key) in projectsStore.projects" :key="key" :project="project"
        @messageNotif="MessageNotif" />
      <NotificationComponent v-if="projectsStore.isNotification" :message="messageNotif" :error="errorNotif">
      </NotificationComponent>

    </div>
  </div>
</template>
