<script setup lang="ts">
  import ProjectC from "@/components/ProjectC.vue";
  import { useUserStore } from "@/stores/users";
  import { useProjectsStore } from "@/stores/projects";
  import { useRouter } from "vue-router";
  import NotificationComponent from "@/components/NotificationComponent.vue"
  import { ref, type Ref } from "vue";
  import AddProjectModal from "@/components/modals/AddProjectModal.vue";
  import { useSkillsStore } from "@/stores/skills";
  import MinimalProject from "@/components/MinimalProject.vue";
  import type { Project } from "@/models/Project";
  import EditProject from "@/components/EditProject.vue";

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
  const isEditProject = ref(false)
  let editProject: Project;
  const addProject = () => {
    toggleAddProjectModal();
    // showModalAddProject();

  }
  const toggleAddProjectModal = () => {
    isAddProject.value = !isAddProject.value;
    console.log("isAddProject.value", isAddProject.value);

  }

  const showEditProject = (project: Project) => {
    console.log("edit project ", project)
    editProject = project
    isEditProject.value = !isEditProject.value
  }

  const closeEditProject = () => {
    isEditProject.value = false;
  }

</script>

<template>
  <EditProject v-if="isEditProject" :project="editProject" @messageNotif="MessageNotif"
    @closeEditProject="closeEditProject" />

  <div class="projects">
    <Transition name="fade">
      <AddProjectModal v-if="isAddProject" @close="toggleAddProjectModal" @messageNotif="MessageNotif">
      </AddProjectModal>
    </Transition>
    <div class="projects__title">Manage projects</div>
    <button type="button" class="projects__add button" @click.prevent="addProject">Ajouter</button>
    <div class="projects__list">

      <MinimalProject v-for="(project, key) in projectsStore.projects" :key="key" :project="project"
        @editProject="showEditProject"></MinimalProject>
      <NotificationComponent v-if="projectsStore.isNotification" :message="messageNotif" :error="errorNotif">
      </NotificationComponent>

    </div>
  </div>
</template>
