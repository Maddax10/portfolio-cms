import { defineStore } from "pinia";
import { API_URL } from "@/config/config";
import type { User } from "@/models/User.ts";

export const useLoginStore = defineStore("loginStore", {
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
        // Remplace ce bloc par l'appel API réel
        const loginResp = await fetch(`${API_URL}/auth/login`, {
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
    initFromStorage() {
      const token = localStorage.getItem("token");
      if (token && this.token != token) this.token = token;
    },
  },
});
