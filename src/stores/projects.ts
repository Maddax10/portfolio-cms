import { defineStore } from "pinia";
import { API_URL } from "@/config/config";
import type { Project } from "@/models/Project.ts";
import { useUsersStore } from "./users";

export const useProjectsStore = defineStore("projectsStore", {
  state: () => ({
    projects: [] as Project[],
    loading: false as boolean,
  }),
  getters: {},
  actions: {
    setProjects(projects: Project[]) {
      if (this.projects != projects || projects != null) this.projects = projects;
    },
    async initProjects() {
      try {
        const projectsResp = await fetch(`${API_URL}/projects/all`);

        const projectsData = await projectsResp.json();

        console.log(projectsData);
        this.setProjects(projectsData);
      } catch (error) {
        throw error;
      }
    },
    async updateProject(project: Project) {
      const usersStore = useUsersStore();
      try {
        const projectUpdated = await fetch(`${API_URL}/projects/update`, {
          method: "PUT",
          body: JSON.stringify(project),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + usersStore.token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
  },
});
