import { DomainEvent, IHandle } from "@rcp-and-plan/commons";

import { RecipeIngredientAddedDomainEvent } from "@domain/models/recipe/events/RecipeIngredientAddedDomainEvent";
import Container from "@services/DI";

export class SaveEntryOnRecipeIngredientAdded extends IHandle {
  constructor() {
    super();
    this.subscribe(this.constructor.name, this.onRecipeIngredientAdded.bind(this));
  }

  private async onRecipeIngredientAdded(_event: DomainEvent<unknown>): Promise<void> {
    const event = _event as RecipeIngredientAddedDomainEvent;

    const { container } = await Container.getInstance();
    //GET RECIPE

    //INSERT RELATION

    //SAVE CHANGES
  }
}
