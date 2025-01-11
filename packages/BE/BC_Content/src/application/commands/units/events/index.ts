import { IHandle } from "@rcp-and-plan/commons";

import { RemoveRecipeIngredientsOnUnitDeleted } from "./UnitDeleted/RemoveRecipeIngredientsOnUnitDeleted";

type IHandleConstructor = new (...args: unknown[]) => IHandle;

const events: Array<IHandleConstructor> = [RemoveRecipeIngredientsOnUnitDeleted];

export default events;
