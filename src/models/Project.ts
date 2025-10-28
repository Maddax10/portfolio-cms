import type { Skill } from "./Skill";

export type Project = {
  id: Number;
  title: String;
  description: String;
  github: String;
  image_path: String;
  skills: Skill[];
};
