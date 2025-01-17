import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { IngredientsListResponse } from "@dtos/index";

export interface IIngredientQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Ingredient>;

  getData(): Promise<IngredientsListResponse>;
}
