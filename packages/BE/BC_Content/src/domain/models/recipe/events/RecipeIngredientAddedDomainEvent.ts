import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { RecipeIngredient } from "../aggregates/RecipeIngredient";

export class RecipeIngredientAddedDomainEvent extends DomainEvent<RecipeIngredient> {
  constructor(recipeId: UniqueEntityID, recipeIngredient: RecipeIngredient) {
    super(new Date(), recipeId, recipeIngredient);
  }
}
