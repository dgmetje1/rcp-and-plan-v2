import { RecipeCategoryOutput } from "./RecipeCategoryOutput";
import { RecipeIngredientOutput } from "./RecipeIngredientOutput";

export type RecipeDailyOutput = {
  id: number;
  title: string;
  time: number;
  author: string;
  thumbnailUrl: string;
  publicationDate: Date;
  portions: number;
  difficulty: number;
  categories: RecipeCategoryOutput[];
  ingredients: RecipeIngredientOutput[];
};
