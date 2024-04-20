import { Category } from "./category";
import { Ingredient } from "./ingredients";

export enum RecipeDifficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export type Recipe = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  headerImg: string;
  uniqueId: string;
  language: string;
  difficulty: RecipeDifficulty;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publicationDate: Date;
  categories: Category[];
  ingredients: Ingredient[];
};

export type RecipeListItem = Pick<Recipe, "id" | "title" | "thumbnailUrl">;

export type RecipeList = Array<RecipeListItem>;

export type DailyRecipe = Pick<
  Recipe,
  | "id"
  | "title"
  | "thumbnailUrl"
  | "time"
  | "author"
  | "publicationDate"
  | "difficulty"
  | "portions"
  | "categories"
  | "ingredients"
>;
