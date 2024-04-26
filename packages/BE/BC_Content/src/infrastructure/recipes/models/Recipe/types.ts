import { Optional } from "sequelize";

import { Category } from "../Category";
import { Ingredient } from "../Ingredient";
import { Kitchenware } from "../Kitchenware";
import { RecipeCategory } from "../RecipeCategory";
import { RecipeIngredient } from "../RecipeIngredient";
import { RecipeKitchenware } from "../RecipeKitchenware";

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
  categories: Array<Category & { RecipeCategory: RecipeCategory }>;
  ingredients: Array<Ingredient & { RecipeIngredient: RecipeIngredient }>;
  kitchenware: Array<Kitchenware & { RecipeKitchenware: RecipeKitchenware }>;
}

export interface RecipeCreationAttributes
  extends Optional<RecipeAttributes, "id"> {}
