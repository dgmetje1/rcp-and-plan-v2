import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";

export interface IKitchenwareQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Kitchenware>;
}
