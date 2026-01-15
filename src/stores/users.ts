import { defineStore } from "pinia";
import { API_URL } from "@/config/config";
import type { User } from "@/models/User.ts";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
    loading: false as boolean,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token: string | null) {
      this.token = token;
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    },
    setUser(user: User | null) {
      this.user = user;
    },

    async login(credentials: { mail: string; password: string }) {
      this.loading = true;
      try {
        const loginResp = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const dataLogin = await loginResp.json();

        if (!loginResp.ok) throw new Error(dataLogin.error);

        this.setUser(dataLogin);
        this.setToken(dataLogin.token);

        return dataLogin;
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      localStorage.removeItem("token");
    },
    /**
     * Initialisation du l'user si un token est présent
     */
    async initUser() {
      const token = localStorage.getItem("token");
      if (!token && this.token === token) return;

      this.token = token;

      const meResp = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const user = await meResp.json();
      this.setUser(user);
    },
  },
});
