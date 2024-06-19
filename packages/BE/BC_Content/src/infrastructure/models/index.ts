import { setupModels } from "./setup";

export { Category } from "./Category";
export { Ingredient } from "./Ingredient";
export { Recipe, RecipePublication, RecipeStep } from "./Recipe";
export { RecipeCategory } from "./RecipeCategory";
export { RecipeIngredient } from "./RecipeIngredient";
export { Unit } from "./Unit";

//side effect
void setupModels();
