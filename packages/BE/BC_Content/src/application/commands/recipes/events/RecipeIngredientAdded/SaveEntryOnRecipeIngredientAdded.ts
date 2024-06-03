import { DomainEvent, IHandle } from "@rcp-and-plan/commons";

import { RecipeIngredientAddedDomainEvent } from "@domain/models/recipe/events/RecipeIngredientAddedDomainEvent";

export class SaveEntryOnRecipeIngredientAdded extends IHandle {
  constructor() {
    super();
    this.subscribe(RecipeIngredientAddedDomainEvent.constructor.name, this.onRecipeIngredientAdded.bind(this));
  }

  private async onRecipeIngredientAdded(_event: DomainEvent<unknown>): Promise<void> {
    const event = _event as RecipeIngredientAddedDomainEvent;
    console.log(event);
  }
}
