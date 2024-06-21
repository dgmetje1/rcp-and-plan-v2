import { DomainEvent, Handle, HandlerToken } from "@rcp-and-plan/commons";
import { Container, Service } from "typedi";

import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { RecipeStepAddedDomainEvent } from "@domain/models/recipe/events/RecipeStepAddedDomainEvent";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";

@Service({ id: HandlerToken, multiple: true })
export class SaveEntryOnRecipeStepAdded extends Handle {
  public initialize(): void {
    super.subscribe(RecipeStepAddedDomainEvent.name, this.onRecipeStepAdded.bind(this));
  }

  private async onRecipeStepAdded(_event: DomainEvent<unknown>): Promise<void> {
    try {
      const event = _event as RecipeStepAddedDomainEvent;

      const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
      const recipe = await recipeQueries.getEntity(event.entityId.toValue() as string);

      const { number, content } = event.data;
      const recipeStep = recipe.setStep(number, Object.fromEntries(content.entries()));

      const repository = Container.get<IRecipeRepository>(RecipeRepository);

      repository.addStep(recipe, recipeStep);

      await repository.unitOfWork.saveChangesAsync();
    } catch (ex: unknown) {
      console.error(ex);
    }
  }
}
