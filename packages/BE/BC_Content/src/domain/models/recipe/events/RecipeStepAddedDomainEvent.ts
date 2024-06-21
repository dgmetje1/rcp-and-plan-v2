import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { RecipeStep } from "../aggregates/RecipeStep";

export class RecipeStepAddedDomainEvent extends DomainEvent<RecipeStep> {
  constructor(recipeId: UniqueEntityID, recipeStep: RecipeStep) {
    super(new Date(), recipeId, recipeStep);
  }
}
