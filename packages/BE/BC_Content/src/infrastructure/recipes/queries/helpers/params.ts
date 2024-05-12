import { WhereOptions } from "sequelize";

import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { Category } from "@infrastructure/models";
import { RecipePublication } from "@infrastructure/models/Recipe";
import { RecipeAttributes } from "@infrastructure/models/Recipe/types";

export const processRecipesListParamsQuery = (params: RecipesListQueryRequest) => {
  const attributes = ["id", "thumbnail_url"];
  const where: WhereOptions<RecipeAttributes> = { visibility: 1 };
  const includeDefault = [
    {
      model: RecipePublication,
      required: true,
      where: {
        language: "en",
      },
      attributes: ["title"],
    },
  ];

  const include = params.category
    ? [
        ...includeDefault,
        {
          model: Category,
          required: true,
          where: {
            id: params.category,
          },
        },
      ]
    : includeDefault;

  return { attributes, where, include };
};
