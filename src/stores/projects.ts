import { defineStore } from "pinia";
import { API_URL } from "@/config/config";
import type { Project } from "@/models/Project.ts";

export const useProjectsStore = defineStore("projectsStore", {
  state: () => ({
    projects: null as Project[] | null,
    loading: false as Boolean,
  }),
  getters: {},
  actions: {},
});
