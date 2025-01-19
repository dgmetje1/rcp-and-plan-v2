import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { KitchenwareListResponse } from "@dtos/index";

export interface IKitchenwareQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Kitchenware>;

  getData(): Promise<KitchenwareListResponse>;
}
