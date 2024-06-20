import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { RecipeKitchenware } from "../aggregates/RecipeKitchenware";

export class RecipeKitchenwareAddedDomainEvent extends DomainEvent<RecipeKitchenware> {
  constructor(recipeId: UniqueEntityID, recipeKitchenware: RecipeKitchenware) {
    super(new Date(), recipeId, recipeKitchenware);
  }
}
