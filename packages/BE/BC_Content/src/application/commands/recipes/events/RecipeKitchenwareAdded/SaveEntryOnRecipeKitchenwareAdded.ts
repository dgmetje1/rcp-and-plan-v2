import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { RecipeKitchenwareAddedDomainEvent } from "@domain/models/recipe/events/RecipeKitchenwareAddedDomainEvent";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";

@Service({ id: HandlerToken, multiple: true })
export class SaveEntryOnRecipeKitchenwareAdded extends Handle {
  public initialize(): void {
    super.subscribe(RecipeKitchenwareAddedDomainEvent.name, this.onRecipeKitchenwareAdded.bind(this));
  }

  private async onRecipeKitchenwareAdded(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as RecipeKitchenwareAddedDomainEvent;

      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipe = await recipeQueries.getEntity(event.entityId.toValue() as string);

      const { kitchenware, quantity } = event.data;
      const recipeKitchenware = recipe.setKitchenware(kitchenware, quantity);

      const repository = Container.get<IRecipeRepository>(RecipeRepository);

      repository.addKitchenware(recipe, recipeKitchenware);

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
