import { setupModels } from "./setup";

export { Category } from "./Category";
export { Ingredient } from "./Ingredient";
export { Kitchenware } from "./Kitchenware";
export { Recipe, RecipePublication, RecipeStep, RecipeStepContent } from "./Recipe";
export { RecipeCategory } from "./RecipeCategory";
export { RecipeIngredient } from "./RecipeIngredient";
export { RecipeKitchenware } from "./RecipeKitchenware";
export { Unit } from "./Unit";

//side effect
void setupModels();
