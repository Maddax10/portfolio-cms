import { defineStore } from "pinia";
import { API_ENDPOINT, API_URL } from "@/config/config";
import type { Project } from "@/models/Project.ts";
import { useUserStore } from "./users";

export const useProjectsStore = defineStore("projectsStore", {
  state: () => ({
    projects: [] as Project[],
    loading: false as boolean,
    isNotification: false as boolean,
  }),
  getters: {},
  actions: {
    setProjects(projects: Project[]) {
      if (this.projects != projects || projects != null) this.projects = projects;
    },
    async initProjects() {
      try {
        const projectsResp = await fetch(`${API_URL}${API_ENDPOINT}/projects/all`);

        const projectsData = await projectsResp.json();

        console.log(projectsData);
        this.setProjects(projectsData);
      } catch (error) {
        throw error;
      }
    },
    setNotification(status: boolean) {
      this.isNotification = status;
    },
    async updateProject(project: Project): Promise<Project> {
      const userStore = useUserStore();
      try {
        const resp = await fetch(`${API_URL}${API_ENDPOINT}/projects/update`, {
          method: "PUT",
          body: JSON.stringify(project),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userStore.token,
          },
        });

        if (!resp.ok) throw new Error("Something went wrong after update");

        const projectUpdated = await resp.json();
        return projectUpdated;
      } catch (error) {
        throw error;
      }
    },
    async createProject(project: Project): Promise<Project> {
      const userStore = useUserStore();
      try {
        const resp = await fetch(`${API_URL}${API_ENDPOINT}/projects/create`, {
          method: "POST",
          body: JSON.stringify(project),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userStore.token,
          },
        });
        if (!resp.ok) throw new Error("Something went wrong after create");

        const createdProject = await resp.json();

        return createdProject;
      } catch (error) {
        throw error;
      }
    },
  },
});
