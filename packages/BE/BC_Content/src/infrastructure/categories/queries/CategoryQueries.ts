import { EntityNotFoundError } from "@rcp-and-plan/commons";

import { Category } from "@domain/models/category/Category";
import { Category as CategoryDB } from "@infrastructure/models";

import { ICategoryQueries } from "./types";

export class CategoryQueries implements ICategoryQueries {
  /**
   * @inheritdoc
   */
  async getEntity(id: string): Promise<Category> {
    const category = await CategoryDB.findByPk(id);
    if (!category) throw new EntityNotFoundError("Category not found", "Category", [{ id }]);

    return Category.get(category.id, category.language, category.name, category.description);
  }
}
