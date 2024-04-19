import { Optional } from "sequelize";

import { Category } from "../Category";

export interface RecipeAttributes {
  id: number;
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
  categories: Category[];
}

export interface RecipeCreationAttributes
  extends Optional<RecipeAttributes, "id"> {}
