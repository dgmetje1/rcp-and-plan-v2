import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { Kitchenware as KitchenwareDB } from "@infrastructure/models";

import { IKitchenwareQueries } from "./types";

@Service()
export class KitchenwareQueries implements IKitchenwareQueries {
  /**
   * @inheritdoc
   */
  async getEntity(id: string): Promise<Kitchenware> {
    const Kitchenwares = await KitchenwareDB.findAll({ where: { id } });
    if (!Kitchenwares.length) throw new EntityNotFoundError("Kitchenware not found", "Kitchenware", [{ id }]);

    return Kitchenware.get(
      Kitchenwares[0]!.id,
      Kitchenwares.map(({ language, name, singular_name }) => ({
        language,
        name,
        singularName: singular_name,
      })),
    );
  }
}
