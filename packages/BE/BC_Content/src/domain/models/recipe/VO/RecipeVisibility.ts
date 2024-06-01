import { RecipeVisibilityValues } from "../helpers/RecipeVisibilities";

/**
 * Represents a recipe difficulty level.
 */
export class RecipeVisibility {
  private _value: RecipeVisibilityValues;

  public get value() {
    return this._value;
  }

  private constructor(level: number) {
    this._value = level;
  }

  /**
   * Create a new RecipeVisibility instance with the specified Visibility level.
   *
   * @param VisibilityyLevel The Visibility level of the recipe (EASY, MEDIUM, HARD)
   * @returns A new RecipeVisibility instance with the specified Visibility level
   */
  public static create(visibilityLevel: RecipeVisibilityValues) {
    return new RecipeVisibility(visibilityLevel);
  }
}
