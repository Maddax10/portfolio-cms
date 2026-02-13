import { defineStore } from "pinia";
import { API_ENDPOINT, API_URL } from "@/config/config";
import type { Skill } from "@/models/Skill.ts";

export const useSkillsStore = defineStore("skillsStore", {
  state: () => ({
    skills: null as Skill[] | null,
    loading: false as boolean,
  }),
  getters: {},
  actions: {
    setSkills(skillsData: Skill[]) {
      this.skills = skillsData;
    },
    async initSkills() {
      try {
        const skillsResp = await fetch(`${API_URL}${API_ENDPOINT}/skills/all`);

        const skillsData = await skillsResp.json();

        console.log(skillsData);
        this.setSkills(skillsData);
      } catch (error) {
        throw error;
      }
    },
  },
});
