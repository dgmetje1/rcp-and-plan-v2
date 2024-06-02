import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Unit } from "@domain/models/unit/Unit";

export class RecipeIngredient {
  private _ingredient: Ingredient;
  private _unit: Unit;
  private _quantity: number;
  private _isOptional: boolean;

  public get ingredient() {
    return this._ingredient;
  }

  public get unit() {
    return this._unit;
  }

  public get quantity() {
    return this._quantity;
  }

  public get isOptional() {
    return this._isOptional;
  }

  private constructor(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean) {
    this._ingredient = ingredient;
    this._unit = unit;
    this._quantity = quantity;
    this._isOptional = isOptional;
  }

  /**
   * Creates a new instance of RecipeIngredient with the provided ingredient, unit, quantity, and optional flag.
   *
   * @param ingredient - The Ingredient object to associate with the RecipeIngredient.
   * @param unit - The Unit object representing the measurement unit for the quantity.
   * @param quantity - The numerical value representing the quantity of the ingredient.
   * @param isOptional - A boolean flag indicating if the ingredient is optional. Defaults to false.
   * @returns A new instance of RecipeIngredient initialized with the provided parameters.
   */
  public static create(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean = false) {
    return new RecipeIngredient(ingredient, unit, quantity, isOptional);
  }

  /**
   * Creates an instance of RecipeIngredient with the provided ingredient, unit, quantity, and optional flag.
   *
   * @param ingredient - The Ingredient object to associate with the RecipeIngredient.
   * @param unit - The Unit object representing the measurement unit for the quantity.
   * @param quantity - The numerical value representing the quantity of the ingredient.
   * @param isOptional - A boolean flag indicating if the ingredient is optional.
   * @returns An instance of RecipeIngredient initialized with the provided parameters.
   */
  public static get(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean) {
    return new RecipeIngredient(ingredient, unit, quantity, isOptional);
  }
}
