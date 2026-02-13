import { defineStore } from "pinia";
import { API_ENDPOINT, API_URL } from "@/config/config";
/**
 * Permet de récupérer les images présentes sur le serveur
 */
export const useImagesStore = defineStore("imagesStore", {
  state: () => ({
    images: null as string[] | null,
    loading: false as boolean,
  }),
  getters: {},
  actions: {
    setImages(imagesData: string[]) {
      this.images = imagesData;
    },
    async initImages() {
      try {
        const imagesResp = await fetch(`${API_URL}${API_ENDPOINT}/images/`);

        const imagesData = await imagesResp.json();

        // console.log(imagesData);
        this.setImages(imagesData);
      } catch (error) {
        throw error;
      }
    },
  },
});
