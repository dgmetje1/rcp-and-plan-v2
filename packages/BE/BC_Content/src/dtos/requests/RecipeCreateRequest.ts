import { RecipeIngredientsRequest } from "./RecipeIngredientRequest";
import { RecipeKitchenwareRequest } from "./RecipeKitchenwareRequest";

export type RecipeCreateRequest = {
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publications: Record<string, RecipeCreatePublicationRequest>;
  categories: Array<string>;
  ingredients: RecipeIngredientsRequest;
  kitchenware: RecipeKitchenwareRequest;
  steps: Array<RecipeStepRequest>;
};

type RecipeCreatePublicationRequest = {
  title: string;
  description: string;
};

type RecipeStepRequest = {
  number: number;
  content: Record<string, RecipeCreateStepPublicationRequest>;
};

type RecipeCreateStepPublicationRequest = {
  title: string;
  body: string;
};
