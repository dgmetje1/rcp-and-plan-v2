import { setupModels } from "./setup";

export { Category } from "./Category";
export { Recipe, RecipePublication, RecipeStep } from "./Recipe";
export { RecipeCategory } from "./RecipeCategory";

//side effect
void setupModels();
