<script lang="ts" setup>
    import { ref, } from 'vue';
    import type { PropType, Ref } from "vue"
    import type { Project } from '../models/Project';
    import type { Skill } from '../models/Skill';
    import { useProjectsStore } from '../stores/projects';
    // import { useSkillsStore } from '../stores/skills';
    import ProjectSkills from './ProjectSkills.vue';
    import ProjectImage from './ProjectImage.vue';
    const props = defineProps({
        project: {
            type: Object as PropType<Project>,
            required: true
        }

    });
    const emits = defineEmits<
        {
            (e: "messageNotif", message: string, error: boolean): void,
            (e: "closeEditProject", isDataUpdated: boolean): void
        }
    >()

    const projectsStore = useProjectsStore();
    // const skillsStore = useSkillsStore()

    const id: Ref<number | undefined> = ref(props.project.id);
    const title: Ref<string> = ref(props.project.title);
    const image_path: Ref<string> = ref(props.project.image_path);
    const imgAlt: Ref<string> = ref(props.project.title + " - screen");
    const description: Ref<string> = ref(props.project.description);
    const github: Ref<string> = ref(props.project.github);
    const currentSkills: Ref<Skill[]> = ref(props.project.skills);

    const showUpdateNotification = (message: string) => {
        projectsStore.setNotification(true)

        emits("messageNotif", message, false)

        setTimeout(() => { projectsStore.setNotification(false) }, 7000)

    }
    const showErrorNotification = (message: string) => {
        projectsStore.setNotification(true)

        emits("messageNotif", message, true)

        setTimeout(() => { projectsStore.setNotification(false) }, 7000)

    }

    const modifyProject = async () => {
        const project: Project = {
            id: id.value,
            title: title.value,
            description: description.value,
            github: github.value,
            image_path: image_path.value,
            skills: currentSkills.value
        }
        try {
            const updatedProject: Project = await projectsStore.updateProject(project)

            //Mise a jour des informations reçues de l'api
            title.value = updatedProject.title;
            description.value = updatedProject.description;
            github.value = updatedProject.github;
            image_path.value = updatedProject.image_path;
            currentSkills.value = updatedProject.skills;

            showUpdateNotification(`Projet \'${updatedProject.title}\' mis à jour !`);
            emits("closeEditProject", true)

        } catch (e: Error | unknown) {
            showErrorNotification(`Erreur lors de la mise à jour !`)
            console.error(e)
        }
    }

    const selectImage = (path: string) => {
        image_path.value = path;

    }

    const closeEditProject = () => {
        emits("closeEditProject", false)
    }
</script>

<template>
    <div class="background" @click="closeEditProject"></div>
    <TransitionGroup name="fade">

        <div class="editProject" :key="id">
            <div class="editProject__imageSection">
                <div class="editProject__titleCard">{{ title }}</div>
                <img class="editProject__image" :src=image_path :alt=imgAlt />
            </div>
            <div class="editProject__infos">
                <!--Titre-->
                <div class="editProject__section">
                    <div class="editProject__title">Titre</div>
                    <input class="editProject__input" type="text" v-model="title" />
                </div>

                <!--Description-->
                <div class="editProject__section">
                    <div class="editProject__title">Description</div>
                    <textarea class="editProject__textarea" v-model="description" />
                </div>

                <!--Lien github-->
                <div class="editProject__section">
                    <div class="editProject__title">Lien github</div>
                    <input class="editProject__input" type="text" v-model="github" />
                </div>

                <!--Skills-->

                <div class="editProject__section">
                    <div class="editProject__title">Skills</div>
                    <div class="editProject__skills">
                        <ProjectSkills :currentSkills="currentSkills" />
                    </div>
                </div>
                <div class="editProject__section">
                    <!-- <div class="editProject__title">Lien de l'image</div>
                <input class="editProject__input" type="text" v-model="imgSrc" /> -->
                    <ProjectImage @selectImage="selectImage"></ProjectImage>
                </div>
            </div>
            <button class="editProject__sendButton" aria-label="modifier" @click.prevent="modifyProject">Modifier le
                projet</button>
        </div>
    </TransitionGroup>
</template>
