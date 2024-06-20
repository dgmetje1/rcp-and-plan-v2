import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";

export class RecipeKitchenware {
  private _kitchenware: Kitchenware;
  private _quantity: number;

  public get kitchenware() {
    return this._kitchenware;
  }

  public get quantity() {
    return this._quantity;
  }

  private constructor(kitchenware: Kitchenware, quantity: number) {
    this._kitchenware = kitchenware;
    this._quantity = quantity;
  }

  /**
   * Creates a new instance of RecipeKitchenware with the provided kitchenware and quantity.
   *
   * @param kitchenware - The Ingredient object to associate with the RecipeKitchenware.
   * @param quantity - The numerical value representing the quantity of the kitchenware.
   * @returns A new instance of RecipeKitchenware initialized with the provided parameters.
   */
  public static create(kitchenware: Kitchenware, quantity: number) {
    return new RecipeKitchenware(kitchenware, quantity);
  }

  /**
   * Creates an instance of RecipeKitchenware with the provided kitchenware and quantity.
   *
   * @param kitchenware - The Ingredient object to associate with the RecipeKitchenware.
   * @param quantity - The numerical value representing the quantity of the kitchenware.
   * @returns An instance of RecipeKitchenware initialized with the provided parameters.
   */
  public static get(kitchenware: Kitchenware, quantity: number) {
    return new RecipeKitchenware(kitchenware, quantity);
  }
}
