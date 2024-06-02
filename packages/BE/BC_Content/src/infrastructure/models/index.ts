import { setupModels } from "./setup";

export { Category } from "./Category";
export { Ingredient } from "./Ingredient";
export { Recipe, RecipePublication, RecipeStep } from "./Recipe";
export { RecipeCategory } from "./RecipeCategory";
export { Unit } from "./Unit";

//side effect
void setupModels();
