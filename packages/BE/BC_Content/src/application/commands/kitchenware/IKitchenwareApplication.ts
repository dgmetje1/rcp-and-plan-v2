import { KitchenwareCreateRequest, KitchenwareEditRequest, KitchenwareMergeRequest } from "@dtos/index";

export interface IKitchenwareApplication {
  /**
   * Creates a new kitchenware with the information of request
   * @param request Data to create a Kitchenware
   */
  createKitchenware(request: KitchenwareCreateRequest): Promise<void>;

  /**
   * Edits kitchenware's information
   * @param request Data to edit a Kitchenware
   */
  editKitchenware(request: KitchenwareEditRequest): Promise<void>;

  /**
   * Removes the kitchenware
   * @param id Kitchenware identifier
   */
  deleteKitchenware(id: string): Promise<void>;

  /**
   * Merges the kitchenwares into the target
   * @param request Data to merge the Kitchenwares
   */
  mergeKitchenware(request: KitchenwareMergeRequest): Promise<void>;
}
