<script lang="ts" setup>
    import { useSkillsStore } from "../stores/skills";
    import type { Skill } from "../models/Skill";
    import { computed, type PropType } from "vue";
    const props = defineProps({
        currentSkills: {
            type: Array as PropType<Skill[]>,
            required: true,
        }
    })
    const allSkills = useSkillsStore().skills;

    //Différence entre tous les skills et les currentSkills
    const availableSkills = computed(() => {
        const partIds = new Set(props.currentSkills.map(currentSkill => currentSkill.id))
        return allSkills?.filter(skill => !partIds.has(skill.id)) as Skill[];
    })
    console.log("availableSkills", availableSkills)

    const emit = defineEmits<{
        (e: 'addSkill', skill: Skill): void
    }>()

    const addSkill = (skill: Skill, index: number) => {
        // availableSkills.value.splice(index, 1)
        console.log("index of skill", index)
        emit('addSkill', skill)
    }

</script>

<template>
    <img class="projectCard__availableSkill" v-for="(skill, key) in availableSkills" :key="key" :src="skill.image_path"
        @click="addSkill(skill, key)">
</template>