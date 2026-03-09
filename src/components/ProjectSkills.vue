<script lang="ts" setup>
    import { useSkillsStore } from "../stores/skills";
    import type { Skill } from "../models/Skill";
    import { computed, ref, type PropType } from "vue";
    const props = defineProps({
        currentSkills: {
            type: Array as PropType<Skill[]>,
            required: true,
        }
    })
    const skillsStore = useSkillsStore();
    const allSkills = skillsStore.skills;
    const currentSkills = ref(props.currentSkills)

    //Différence entre tous les skills et les currentSkills
    const availableSkills = computed(() => {
        const partIds = new Set(props.currentSkills.map(currentSkill => currentSkill.id))
        return allSkills?.filter(skill => !partIds.has(skill.id)) as Skill[];
    })
    console.log("availableSkills", availableSkills)

    // const emit = defineEmits<{
    //     (e: 'addSkill', skill: Skill): void
    // }>()

    // const addSkill = (skill: Skill, index: number) => {
    //     availableSkills.value.splice(index, 1)
    //     emit('addSkill', skill)
    // }
    const addSkill = (skill: Skill) => {
        console.log(skill)
        currentSkills.value.push(skill)
    }
    const removeSkill = (key: number) => {
        console.log(key)
        currentSkills.value.splice(key, 1)
    }

    const isSkillAddClick = ref(false)

    const openAvailableSkills = () => {
        isSkillAddClick.value = !isSkillAddClick.value;
    }
</script>

<template>
    <div class="skills">
        <div class="skills__currents">
            <img class="skills__item" v-for="(skill, key) in currentSkills" :key="key" :src="skill.image_path"
                :alt="skill.name" @click="removeSkill(key)" aria-label="supprimer un skill">
        </div>
        <button class="skills__addBtn" aria-label="ouvrir la list des skills"
            @click.prevent="openAvailableSkills">+</button>

        <div class="skills__availables" v-if="isSkillAddClick">
            <img class="skills__item" v-for="(skill, key) in availableSkills" :key="key" :src="skill.image_path"
                @click="addSkill(skill)" aria-label="ajouter un skill">
        </div>
    </div>
</template>