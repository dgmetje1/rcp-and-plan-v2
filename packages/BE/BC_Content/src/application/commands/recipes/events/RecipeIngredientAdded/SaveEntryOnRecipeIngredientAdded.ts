import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { RecipeIngredientAddedDomainEvent } from "@domain/models/recipe/events/RecipeIngredientAddedDomainEvent";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";

@Service({ id: HandlerToken, multiple: true })
export class SaveEntryOnRecipeIngredientAdded extends Handle {
  public initialize(): void {
    super.subscribe(RecipeIngredientAddedDomainEvent.name, this.onRecipeIngredientAdded.bind(this));
  }

  private async onRecipeIngredientAdded(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as RecipeIngredientAddedDomainEvent;

      //GET RECIPE
      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipe = await recipeQueries.getEntity(event.entityId.toValue() as string);

      const { ingredient, unit, quantity, isOptional } = event.data;
      const recipeIngrdient = recipe.setIngredient(ingredient, unit, quantity, isOptional);

      //INSERT RELATION
      const repository = Container.get<IRecipeRepository>(RecipeRepository);

      repository.addIngredient(recipe, recipeIngrdient);

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
