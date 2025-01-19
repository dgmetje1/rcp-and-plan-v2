import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { KitchenwareMergedDomainEvent } from "@domain/models/kitchenware/events/KitchenwareMergedDomainEvent";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";

@Service({ id: HandlerToken, multiple: true })
export class UpdateRecipesOnKitchenwareMerged extends Handle {
  public initialize(): void {
    super.subscribe(KitchenwareMergedDomainEvent.name, this.onKitchenwareMerged.bind(this));
  }

  private async onKitchenwareMerged(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as KitchenwareMergedDomainEvent;
      const { otherKitchenware: oldKitchenware, data: newKitchenware } = event;

      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipesWithKitchenwares = await recipeQueries.getEntitiesContainingKitchenware(
        oldKitchenware.id.toString(),
      );

      if (!recipesWithKitchenwares.length) return;

      const repository = Container.get<IRecipeRepository>(RecipeRepository);
      for (const recipe of recipesWithKitchenwares) {
        const [oldRecipeKitchenware, newRecipeKitchenware] = recipe.replaceKitchenware(oldKitchenware, newKitchenware);
        repository.replaceKitchenware(recipe, oldRecipeKitchenware, newRecipeKitchenware);
      }

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
