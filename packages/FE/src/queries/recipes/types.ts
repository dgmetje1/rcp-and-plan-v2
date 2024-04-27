import { Category } from "@/types/category";

export type RecipeListQueryFilters = {
  categoryId?: Category["id"];
};
