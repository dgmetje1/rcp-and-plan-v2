import { RecipeDifficultiesValues } from "../helpers/RecipeDifficulties";

/**
 * Represents a recipe difficulty level.
 */
export class RecipeDifficulty {
  private _value: RecipeDifficultiesValues;

  public get value() {
    return this._value;
  }

  private constructor(level: number) {
    this._value = level;
  }

  /**
   * Create a new RecipeDifficulty instance with the specified difficulty level.
   *
   * @param difficultyLevel The difficulty level of the recipe (EASY, MEDIUM, HARD)
   * @returns A new RecipeDifficulty instance with the specified difficulty level
   */
  public static create(difficultyLevel: RecipeDifficultiesValues) {
    return new RecipeDifficulty(difficultyLevel);
  }
}
