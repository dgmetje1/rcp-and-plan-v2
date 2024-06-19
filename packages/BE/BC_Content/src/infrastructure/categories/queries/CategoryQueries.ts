import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Category } from "@domain/models/category/Category";
import { Category as CategoryDB } from "@infrastructure/models";

import { ICategoryQueries } from "./types";

@Service()
export class CategoryQueries implements ICategoryQueries {
  /**
   * @inheritdoc
   */
  async getEntity(id: string): Promise<Category> {
    const categories = await CategoryDB.findAll({ where: { id } });
    if (!categories.length) throw new EntityNotFoundError("Category not found", "Category", [{ id }]);

    return Category.get(
      categories[0]!.id,
      categories.map(({ language, name, description }) => ({ language, name, description })),
    );
  }
}
