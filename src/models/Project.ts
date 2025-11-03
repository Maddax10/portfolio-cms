import type { Skill } from "./Skill";

export type Project = {
  id?: number;
  title: string;
  description: string;
  github: string;
  image_path: string;
  skills: Skill[];
};
