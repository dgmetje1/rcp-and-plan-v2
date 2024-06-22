import { IHandle } from "@rcp-and-plan/commons";

import { SaveEntryOnRecipeIngredientAdded } from "./RecipeIngredientAdded/SaveEntryOnRecipeIngredientAdded";
import { SaveEntryOnRecipeKitchenwareAdded } from "./RecipeKitchenwareAdded/SaveEntryOnRecipeKitchenwareAdded";
import { SaveEntryOnRecipeStepAdded } from "./RecipeStepAdded/SaveEntryOnRecipeStepAdded";

type IHandleConstructor = new (...args: unknown[]) => IHandle;

const events: Array<IHandleConstructor> = [
  SaveEntryOnRecipeIngredientAdded,
  SaveEntryOnRecipeKitchenwareAdded,
  SaveEntryOnRecipeStepAdded,
];

export default events;
