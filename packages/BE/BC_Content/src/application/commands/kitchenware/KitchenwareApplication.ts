import Container, { Service } from "typedi";

import { IKitchenwareQueries, KitchenwareQueries } from "@application/queries/kitchenware/IKitchenwareQueries";
import { IKitchenwareRepository, KitchenwareRepository } from "@domain/models/kitchenware/IKitchenwareRepository";
import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { KitchenwareCreateRequest, KitchenwareEditRequest, KitchenwareMergeRequest } from "@dtos/index";

import { IKitchenwareApplication } from "./IKitchenwareApplication";

@Service({ transient: true })
export class KitchenwareApplication implements IKitchenwareApplication {
  /** @inheritdoc */
  public async createKitchenware(request: KitchenwareCreateRequest) {
    const kitchenware = Kitchenware.create(
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );
    const repository = Container.get<IKitchenwareRepository>(KitchenwareRepository);
    repository.create(kitchenware);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc  */
  public async editKitchenware(request: KitchenwareEditRequest): Promise<void> {
    const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);

    const kitchenware = await kitchenwareQueries.getEntity(request.id);
    const currentLanguages = kitchenware.edit(
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );

    const repository = Container.get<IKitchenwareRepository>(KitchenwareRepository);
    repository.edit(kitchenware, currentLanguages);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc */
  public async deleteKitchenware(id: string): Promise<void> {
    const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);

    const kitchenware = await kitchenwareQueries.getEntity(id);
    kitchenware.delete();

    const repository = Container.get<IKitchenwareRepository>(KitchenwareRepository);
    repository.delete(kitchenware);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc */
  public async mergeKitchenware(request: KitchenwareMergeRequest): Promise<void> {
    const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);
    const targetKitchenware = await kitchenwareQueries.getEntity(request.targetId);

    const otherKitchenwares = await Promise.all(
      request.toolIds.map(kitchenwareId => kitchenwareQueries.getEntity(kitchenwareId)),
    );

    const repository = Container.get<IKitchenwareRepository>(KitchenwareRepository);

    for (const otherKitchenware of otherKitchenwares) {
      const currentLanguages = targetKitchenware.merge(otherKitchenware);
      repository.edit(targetKitchenware, currentLanguages);
      repository.delete(otherKitchenware);
    }

    await repository.unitOfWork.saveChangesAsync();
  }
}
