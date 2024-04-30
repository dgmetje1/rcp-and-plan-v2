import { RecipeCategoryOutput } from "./RecipeCategoryOutput";
import { RecipeIngredientOutput } from "./RecipeIngredientOutput";
import { RecipeStepOutput } from "./RecipeStepOutput";
import { RecipeToolOutput } from "./RecipeToolOutput";

export type RecipeOutput = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  headerImg: string;
  uniqueId: string;
  language: string;
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publicationDate: Date;
  categories: RecipeCategoryOutput[];
  ingredients: RecipeIngredientOutput[];
  kitchenware: RecipeToolOutput[];
  steps: RecipeStepOutput[];
};
