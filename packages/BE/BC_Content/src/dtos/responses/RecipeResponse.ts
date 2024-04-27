import { RecipeCategoryResponse } from "./RecipeCategoryResponse";
import { RecipeIngredientResponse } from "./RecipeIngredientResponse";
import { RecipeStepResponse } from "./RecipeStepResponse";
import { RecipeToolResponse } from "./RecipeToolResponse";

export type RecipeResponse = {
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
  categories: RecipeCategoryResponse[];
  ingredients: RecipeIngredientResponse[];
  kitchenware: RecipeToolResponse[];
  steps: RecipeStepResponse[];
};
