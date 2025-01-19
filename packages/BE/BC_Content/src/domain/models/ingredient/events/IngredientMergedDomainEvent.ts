import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { Ingredient } from "../Ingredient";

export class IngredientMergedDomainEvent extends DomainEvent<Ingredient> {
  private _otherIngredient: Ingredient;

  public get otherIngredient() {
    return this._otherIngredient;
  }

  constructor(ingredientId: UniqueEntityID, targetIngredient: Ingredient, otherIngredient: Ingredient) {
    super(new Date(), ingredientId, targetIngredient);
    this._otherIngredient = otherIngredient;
  }
}
