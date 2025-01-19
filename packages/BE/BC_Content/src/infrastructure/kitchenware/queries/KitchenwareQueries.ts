import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { KitchenwareListResponse } from "@dtos/index";
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

  public async getData() {
    const kitchenware = await KitchenwareDB.findAll();

    return kitchenware.reduce<KitchenwareListResponse>((prev, value) => {
      const translatableContent = {
        name: value.name,
        singularName: value.singular_name,
      };
      const toolIndex = prev.findIndex(x => x.id === value.id);
      if (toolIndex === -1)
        return [
          ...prev,
          {
            id: value.id,
            content: {
              [value.language]: translatableContent,
            },
          },
        ];

      const tool = prev[toolIndex];
      return [
        ...prev.slice(0, toolIndex),
        { ...tool, content: { ...tool.content, [value.language]: translatableContent } },
        ...prev.slice(toolIndex + 1),
      ];
    }, []);
  }
}
