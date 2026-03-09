<script setup lang="ts">
    import type { Project } from '@/models/Project';
    import { computed, type PropType } from 'vue';

    const props = defineProps({
        project: {
            type: Object as PropType<Project>,
            required: true
        }
    });

    const emits = defineEmits<
        { (e: "editProject", project: Project): void }

    >();

    const title = computed(() => props.project.title);

    const showModify = () => {
        //implement
        console.log("show modify")
        emits("editProject", props.project)
    }

    const deleteProject = () => {
        //implement
        console.log("delete")
    }

</script>

<template>
    <div class="project">
        <span class="project__title">{{ title }}</span>
        <div class="project__actions">
            <button class="project__actions__modify button" @click="showModify"></button>
            <button class="project__actions__delete button" @click="deleteProject"></button>
        </div>

    </div>

</template>

<style lang="scss"></style>