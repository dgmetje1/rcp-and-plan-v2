import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

import { IRecipeQueries } from "./types";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

export class RecipeQueries implements IRecipeQueries {
  async getData() {
    const connectionString = process.env.CONNECTION_STRING_CONTENT!;
    const db = new Sequelize(connectionString, {
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    const dbResult = await db.query<{
      recipe_id: number;
      title: string;
      thumbnail: string;
    }>("SELECT recipe_id, title, thumbnail FROM `recipe`", {
      type: QueryTypes.SELECT,
    });

    const result = dbResult.map(({ recipe_id, title, thumbnail }) => ({
      recipe_id,
      title,
      thumbnail_url: thumbnail,
    }));

    return result;
  }
}
