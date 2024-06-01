import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";

import { RecipeDifficulty } from "../VO/RecipeDifficulty";

export enum RecipeDifficultiesValues {
  ["EASY"] = 1,
  ["MEDIUM"] = 2,
  ["HARD"] = 3,
}

export class RecipeDifficulties {
  /**
   * Retrieves a RecipeDifficulty object based on the provided difficulty level.
   *
   * @param level The difficulty level to retrieve the RecipeDifficulty for.
   * @returns A RecipeDifficulty object corresponding to the provided difficulty level.
   * @throws InvalidParameterError if the provided difficulty level is not valid.
   */
  static get(level: number) {
    ensureThat(
      level in RecipeDifficultiesValues,
      new InvalidParameterError("Invalid difficulty value", "Recipe", [{ level }]),
    );

    return RecipeDifficulty.create(level);
  }
}
