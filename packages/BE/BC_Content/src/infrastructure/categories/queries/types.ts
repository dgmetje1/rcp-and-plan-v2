import { Category } from "@domain/models/category/Category";

export interface ICategoryQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Category>;
}
