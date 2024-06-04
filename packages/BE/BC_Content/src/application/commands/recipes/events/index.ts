import { IHandle } from "@rcp-and-plan/commons";

import { SaveEntryOnRecipeIngredientAdded } from "./RecipeIngredientAdded/SaveEntryOnRecipeIngredientAdded";

const events: Array<typeof IHandle> = [SaveEntryOnRecipeIngredientAdded];

export default events;
