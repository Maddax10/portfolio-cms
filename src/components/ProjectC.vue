<script lang="ts" setup>
    import { defineProps } from 'vue';
    import type { PropType } from "vue"
    import type { Project } from '../models/Project';
    const props = defineProps({
        project: {
            type: Object as PropType<Project>,
            required: true
        }

    });

</script>

<template>
    <div class="projectCard">
        <div class="projectCard__titleCard">{{ props.project.title.toString() }}</div>
        <div class="projectCard__title">
            <div class="projectCard__title">Titre</div>
            <input class="projectCard__input" type="text" :value=props.project.title.toString() />
        </div>
        <div class="projectCard__description">
            <div class="projectCard__title">Description</div>
            <input class="projectCard__input" type="text" :value=props.project.description.toString() />
        </div>
        <div class="projectCard__githubLink">
            <div class="projectCard__title">Lien github</div>
            <input class="projectCard__input" type="text" :value=props.project.github.toString() />
        </div>
        <div class="projectCard__imageSection">
            <div class="projectCard__title">Lien de l'image</div>
            <input class="projectCard__input" type="text" :value=props.project.image_path.toString() />
            <img class="projectCard__image" :src=props.project.image_path.toString() />
        </div>
        <div class="projectCard__skills">
            <div class="projectCard__title">Skills</div>
            <div class="projectCard__skillsList">
                <img class="projectCard__skill" v-for="(skill, key) in props.project.skills" :key="key"
                    :src=skill.image_path.toString() :alt=skill.name.toString()>
            </div>
        </div>
        <button class="projectCard__sendButton">Modifier le projet</button>
    </div>
</template>
