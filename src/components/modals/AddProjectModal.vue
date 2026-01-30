<script setup lang="ts">
    import { Skill } from '@/models/Skill';
    import { Ref, ref } from 'vue';
    import ProjectSkills from '../ProjectSkills.vue';
    import { useProjectsStore } from '@/stores/projects';
    import { Project } from '@/models/Project';

    const projectsStore = useProjectsStore();

    const emits = defineEmits<
        {
            (e: "close"): void,
            (e: "messageNotif", message: string, error: boolean): void
        }
    >()

    const isSkillAddClick = ref(false)

    const openAvailableSkills = () => {
        isSkillAddClick.value = !isSkillAddClick.value;
    }
    const addSkill = (skill: Skill) => {
        console.log(skill)
        currentSkills.value.push(skill)
    }
    const removeSkill = (key: number) => {
        console.log(key)
        currentSkills.value.splice(key, 1)
    }

    const title = ref('');
    const description = ref('');
    const github = ref('');
    const currentSkills: Ref<Skill[]> = ref([]);
    const imgSrc = ref(``);

    const addProject = async () => {
        console.log("add a project");
        const project: Project = {
            title: title.value,
            description: description.value,
            github: github.value,
            image_path: imgSrc.value,
            skills: currentSkills.value,
        }
        try {
            await projectsStore.createProject(project)
            showUpdateNotification(`Projet \'${project.title}\' créé !`);
        } catch (error) {
            showErrorNotification('Erreur lors de la création !')
            throw error;
        }

    }
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
</script>

<template>
    <div class="modal">
        <div class="modal__card">
            <div class="modal__header">
                <span class="modal__title">Ajouter un projet</span>
                <button class="modal__close" @click="emits('close')">X</button>
            </div>
            <div class="modal__body">
                <div class="m-project">
                    <span class="m-project__title">Titre</span>
                    <input type="text" v-model="title">
                </div>
                <div class="m-project">
                    <span class="m-project__title">Description</span>
                    <input type="text" v-model="description">
                </div>
                <div class="m-project">
                    <span class="m-project__title">Lien github</span>
                    <input type="text" v-model="github">
                </div>
                <div class="m-project">
                    <div class="skills">
                        <img class="skill" v-for="(skill, key) in currentSkills" :key="key" :src=skill.image_path
                            :alt=skill.name @click="removeSkill(key)">
                        <button class="addSkillBtn" @click.prevent="openAvailableSkills">+</button>
                    </div>
                    <div class="skillsList">
                        <ProjectSkills v-if="isSkillAddClick" :currentSkills="currentSkills" @addSkill="addSkill" />
                    </div>
                </div>
                <div class="m-project">
                    <span class="m-project__title">Lien de l'image</span>
                    <input type="text" v-model="imgSrc">
                </div>
            </div>
            <div class="modal__footer">
                <button @click="addProject">Ajouter</button>
            </div>
        </div>
    </div>
</template>