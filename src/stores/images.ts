import { defineStore } from "pinia";
import { API_FINAL_URL } from "@/config/config";
/**
 * Permet de récupérer les images présentes sur le serveur
 */
export const useImagesStore = defineStore("imagesStore", {
  state: () => ({
    images: [] as string[],
    loading: false as boolean,
  }),
  getters: {},
  actions: {
    setImages(imagesData: string[]) {
      this.images = imagesData;
    },
    async initImages() {
      try {
        const imagesResp = await fetch(`${API_FINAL_URL}/images/`);

        const imagesData: string[] = await imagesResp.json();

        // console.log(imagesData);
        this.setImages(imagesData.map((path) => path));
      } catch (error) {
        throw error;
      }
    },
  },
});
