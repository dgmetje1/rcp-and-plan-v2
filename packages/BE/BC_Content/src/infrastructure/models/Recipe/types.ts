import { Optional } from "sequelize";

import { Category } from "../Category";
import { Ingredient } from "../Ingredient";
import { Kitchenware } from "../Kitchenware";
import { RecipeCategory } from "../RecipeCategory";
import { RecipeIngredient } from "../RecipeIngredient";
import { RecipeKitchenware } from "../RecipeKitchenware";
import { RecipePublication } from "./Publication";
import { RecipeStep } from "./Step";

export interface RecipeAttributes {
  id: string;
  thumbnail_url: string;
  header_img: string;
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publication_date: Date;
  publications: Array<RecipePublication>;
  categories: Array<Category & { RecipeCategory: RecipeCategory }>;
  ingredients: Array<Ingredient & { RecipeIngredient: RecipeIngredient }>;
  kitchenware: Array<Kitchenware & { RecipeKitchenware: RecipeKitchenware }>;
  steps: Array<RecipeStep>;
}

export interface RecipeCreationAttributes extends Optional<RecipeAttributes, "id"> {}
