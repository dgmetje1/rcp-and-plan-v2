import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";
import { UnitDeletedDomainEvent } from "@domain/models/unit/events/UnitDeletedDomainEvent";

@Service({ id: HandlerToken, multiple: true })
export class RemoveRecipeIngredientsOnUnitDeleted extends Handle {
  public initialize(): void {
    super.subscribe(UnitDeletedDomainEvent.name, this.onUnitDeleted.bind(this));
  }

  private async onUnitDeleted(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as UnitDeletedDomainEvent;

      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipes = await recipeQueries.getEntitiesContainingUnit(event.entityId.toString());

      const repository = Container.get<IRecipeRepository>(RecipeRepository);
      recipes.forEach(({ recipe, ingredientIds }) => {
        ingredientIds.forEach(ingredientId => {
          const recipeIngredientRemoved = recipe.removeIngredient(ingredientId);
          repository.removeIngredient(recipe, recipeIngredientRemoved);
        });
      });

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
