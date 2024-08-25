import { Shape } from "@/types/shapes";

export type ShapeAPI = {
  id: string;
  title: string;
  shapeConfig: Shape[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
};
