import { FindAttributeOptions, WhereOptions } from "sequelize";

import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { DEFAULT_LANGUAGE, Languages } from "@global_types/languages";
import { Category } from "@infrastructure/models";
import { RecipePublication } from "@infrastructure/models/Recipe";
import { RecipeAttributes } from "@infrastructure/models/Recipe/types";

export const processRecipesListParamsQuery = (
  params: RecipesListQueryRequest,
  language: Languages = DEFAULT_LANGUAGE,
) => {
  const attributes = ["id", "thumbnail_url"];
  const where: WhereOptions<RecipeAttributes> = { visibility: 1 };
  const subAttributes: FindAttributeOptions = ["title"];
  const includeDefault = [
    {
      model: RecipePublication,
      where: {
        language,
      },
      attributes: subAttributes,
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
