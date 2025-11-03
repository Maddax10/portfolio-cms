<script lang="ts" setup>
    import { useSkillsStore } from "../stores/skills";
    import type { Skill } from "../models/Skill";
    import type { PropType } from "vue";
    const props = defineProps({
        currentSkills: {
            type: Array as PropType<Skill[]>,
            required: true,
        }
    })
    const allSkills = useSkillsStore().skills;
    //Différence entre tous les skills et les currentSkills
    const partIds = new Set(props.currentSkills.map(currentSkill => currentSkill.id))
    const availableSkills: Skill[] = allSkills?.filter(skill => !partIds.has(skill.id)) as Skill[];

    console.log("availableSkills", availableSkills)
</script>

<template>
    <img class="projectCard__availableSkill" v-for="(skill, key) in availableSkills" :key="key" :src="skill.image_path">
</template>