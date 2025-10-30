<script lang="ts" setup>
    import { defineProps, ref, } from 'vue';
    import type { PropType, Ref } from "vue"
    import type { Project } from '../models/Project';
    import type { Skill } from '../models/Skill';
    const props = defineProps({
        project: {
            type: Object as PropType<Project>,
            required: true
        }

    });

    const title: Ref<string> = ref(props.project.title);
    const imgSrc: Ref<string> = ref(props.project.image_path);
    const imgAlt: Ref<string> = ref(props.project.title + " - screen");
    const description: Ref<string> = ref(props.project.description);
    const github: Ref<string> = ref(props.project.github);
    const skills: Ref<Skill[]> = ref(props.project.skills);
    const image_path: Ref<string> = ref(props.project.image_path);

</script>

<template>
    <div class="projectCard">
        <div class="projectCard__imageSection">
            <div class="projectCard__titleCard">{{ title }}</div>
            <img class="projectCard__image" :src=imgSrc :alt=imgAlt />
        </div>
        <div class="projectCard__infos">
            <div class="projectCard__section">
                <div class="projectCard__title">Titre</div>
                <input class="projectCard__input" type="text" :value=title />
            </div>
            <div class="projectCard__section">
                <div class="projectCard__title">Description</div>
                <textarea class="projectCard__textarea" :value=description />
            </div>
            <div class="projectCard__section">
                <div class="projectCard__title">Lien github</div>
                <input class="projectCard__input" type="text" :value=github />
            </div>
            <div class="projectCard__section">
                <div class="projectCard__title">Skills</div>
                <div class="projectCard__skillsList">
                    <img class="projectCard__skill" v-for="(skill, key) in skills" :key="key" :src=skill.image_path
                        :alt=skill.name>
                </div>
            </div>
            <div class="projectCard__section">
                <div class="projectCard__title">Lien de l'image</div>
                <input class="projectCard__input" type="text" :value=image_path />
            </div>
        </div>
        <button class="projectCard__sendButton">Modifier le projet</button>
    </div>
</template>
