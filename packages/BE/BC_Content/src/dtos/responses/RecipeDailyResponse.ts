import { RecipeCategoryResponse } from "./RecipeCategoryResponse";
import { RecipeIngredientResponse } from "./RecipeIngredientResponse";

export type RecipeDailyResponse = {
  id: string;
  title: string;
  time: number;
  author: string;
  thumbnailUrl: string;
  publicationDate: Date;
  portions: number;
  difficulty: number;
  categories: RecipeCategoryResponse[];
  ingredients: RecipeIngredientResponse[];
};
