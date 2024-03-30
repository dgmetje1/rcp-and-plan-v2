import { Optional } from "sequelize";

export interface RecipeAttributes {
  recipe_id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  header_img: string;
  unique_id: string;
  language: string;
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publication_date: Date;
}

export interface RecipeCreationAttributes
  extends Optional<RecipeAttributes, "recipe_id"> {}
