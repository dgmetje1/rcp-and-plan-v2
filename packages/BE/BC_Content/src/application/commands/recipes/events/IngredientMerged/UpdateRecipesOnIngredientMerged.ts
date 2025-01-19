import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { IngredientMergedDomainEvent } from "@domain/models/ingredient/events/IngredientMergedDomainEvent";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";

@Service({ id: HandlerToken, multiple: true })
export class UpdateRecipesOnIngredientMerged extends Handle {
  public initialize(): void {
    super.subscribe(IngredientMergedDomainEvent.name, this.onIngredientMerged.bind(this));
  }

  private async onIngredientMerged(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as IngredientMergedDomainEvent;
      const { otherIngredient: oldIngredient, data: newIngredient } = event;

      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipesWithIngredients = await recipeQueries.getEntitiesContainingIngredient(oldIngredient.id.toString());

      if (!recipesWithIngredients.length) return;

      const repository = Container.get<IRecipeRepository>(RecipeRepository);
      for (const recipe of recipesWithIngredients) {
        const [oldRecipeIngredient, newRecipeIngredient] = recipe.replaceIngredient(oldIngredient, newIngredient);
        repository.replaceIngredient(recipe, oldRecipeIngredient, newRecipeIngredient);
      }

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
