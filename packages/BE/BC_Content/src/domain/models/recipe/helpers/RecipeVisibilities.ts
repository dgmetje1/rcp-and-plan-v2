import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";

import { RecipeVisibility } from "../VO/RecipeVisibility";

export enum RecipeVisibilityValues {
  ["PUBLIC"] = 0,
  ["PRIVATE"] = 1,
}

export class RecipeVisibilities {
  /**
   * Retrieves a RecipeVisibility object based on the provided visibility level.
   *
   * @param level The visibility level to retrieve the RecipeVisibility for.
   * @returns A RecipeVisibility object corresponding to the provided visibility level.
   * @throws InvalidParameterError if the provided visibility level is not valid.
   */
  static get(level: number) {
    ensureThat(
      level in RecipeVisibilityValues,
      new InvalidParameterError("Invalid visibility value", "Recipe", [{ level }]),
    );

    return RecipeVisibility.create(level);
  }
}
