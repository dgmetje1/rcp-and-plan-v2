import { AggregateRoot, ensureThat, InvalidParameterError, UniqueEntityID } from "@rcp-and-plan/commons";

import { Category } from "@domain/models/category/Category";
import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Unit } from "@domain/models/unit/Unit";
import { Languages } from "@global_types/languages";

import { Kitchenware } from "../kitchenware/Kitchenware";
import { RecipeIngredient } from "./aggregates/RecipeIngredient";
import { RecipeKitchenware } from "./aggregates/RecipeKitchenware";
import { RecipePublication, RecipePublications } from "./aggregates/RecipePublication";
import { RecipeStep, RecipeSteps } from "./aggregates/RecipeStep";
import { RecipeIngredientAddedDomainEvent } from "./events/RecipeIngredientAddedDomainEvent";
import { RecipeKitchenwareAddedDomainEvent } from "./events/RecipeKitchenwareAddedDomainEvent";
import { RecipeStepAddedDomainEvent } from "./events/RecipeStepAddedDomainEvent";
import { RecipeDifficulty } from "./VO/RecipeDifficulty";
import { RecipeVisibility } from "./VO/RecipeVisibility";

export class Recipe extends AggregateRoot {
  //#region Private fields
  private _difficulty: RecipeDifficulty;
  private _time: number;
  private _portions: number;
  private _visibility: RecipeVisibility;
  private _author: string;
  private _publicationDate: Date;
  private _publications: RecipePublications;
  private _categories: Array<Category>;
  private _ingredients: Array<RecipeIngredient>;
  private _kitchenware: Array<RecipeKitchenware>;
  private _steps: RecipeSteps;
  //#endregion

  //#region Public getters
  public get difficulty() {
    return this._difficulty.value;
  }

  public get time() {
    return this._time;
  }

  public get portions() {
    return this._portions;
  }

  public get visibility() {
    return this._visibility.value;
  }

  public get author() {
    return this._author;
  }

  public get publicationDate() {
    return this._publicationDate;
  }

  public get publications() {
    return this._publications;
  }

  public get categories() {
    return this._categories;
  }

  public get ingredients() {
    return this._ingredients;
  }

  public get kitchenware() {
    return this._kitchenware;
  }

  public get steps() {
    return this._steps;
  }

  //#endregion

  private constructor(
    id: string | undefined,
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: RecipeVisibility,
    author: string,
    publicationDate: Date,
    publications: Map<Languages, RecipePublication>,
    categories: Array<Category>,
  ) {
    super(new UniqueEntityID(id));

    ensureThat(time > 0, new InvalidParameterError("time must be greater than 0", "Recipe", [{ time }]));
    ensureThat(!!categories.length, new InvalidParameterError("Recipe must belong to at least one category", "Recipe"));

    this._difficulty = difficulty;
    this._time = time;
    this._portions = portions;
    this._visibility = visibility;
    this._author = author;
    this._publicationDate = publicationDate;
    this._categories = categories;
    this._ingredients = [];
    this._kitchenware = [];
    this._publications = publications;
    this._steps = new RecipeSteps();
  }

  /**
   * Creates a new Recipe instance with all the specified fields
   * @param difficulty Level of difficulty
   * @param time Number of seconds spent in the recipe
   * @param portions Number of portions
   * @param visibility Recipe's visibility
   * @param author Recipe's author
   * @param publications Information language related such as the title or the description
   * @param categories Recipe's categories
   * @param ingredients Recipe's ingredients
   * @returns A new Recipe instance
   */
  public static create(
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: RecipeVisibility,
    author: string,
    publications: Record<string, { title: string; description: string }>,
    categories: Array<Category>,
  ) {
    const publicationsMap = new Map();
    Object.entries(publications).forEach(([key, { title, description }]) => {
      const publicationAggregate = RecipePublication.create(key, title, description);

      publicationsMap.set(key as Languages, publicationAggregate);
    });

    const recipe = new Recipe(
      undefined,
      difficulty,
      time,
      portions,
      visibility,
      author,
      new Date(Date.now()),
      publicationsMap,
      categories,
    );

    return recipe;
  }

  /**
   * Gets a Recipe instance with all the specified information
   * @param id Recipe identifier
   * @param difficulty Level of difficulty
   * @param time Number of seconds spent in the recipe
   * @param portions Number of portions
   * @param visibility Recipe's visibility
   * @param author Recipe's author
   * @param publications Information language related such as the title or the description
   * @param categories Recipe's categories
   * @param ingredients Recipe's ingredients
   * @returns A new Recipe instance
   */
  public static get(
    id: string,
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: RecipeVisibility,
    author: string,
    publicationDate: Date,
    publications: Record<string, { id: string; title: string; description: string }>,
    categories: Array<Category>,
    ingredients: Array<{ ingredient: Ingredient; unit: Unit; quantity: number; isOptional: boolean }>,
    kitchenware: Array<{ kitchenware: Kitchenware; quantity: number }>,
    steps: Array<{ id: string; number: number; content: Record<string, { title: string; body: string }> }>,
  ) {
    const publicationsMap = new Map();
    Object.entries(publications).forEach(([key, { id, title, description }]) => {
      const publicationAggregate = RecipePublication.get(id, key, title, description);

      publicationsMap.set(key as Languages, publicationAggregate);
    });

    const recipe = new Recipe(
      id,
      difficulty,
      time,
      portions,
      visibility,
      author,
      publicationDate,
      publicationsMap,
      categories,
    );

    ingredients.forEach(({ ingredient, unit, quantity, isOptional }) =>
      recipe.setIngredient(ingredient, unit, quantity, isOptional),
    );
    kitchenware.forEach(({ kitchenware, quantity }) => recipe.setKitchenware(kitchenware, quantity));

    steps.forEach(({ id, number, content }) => recipe.getStep(id, number, content));

    return recipe;
  }

  public setIngredient(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean) {
    const recipeIngredient = RecipeIngredient.create(ingredient, unit, quantity, isOptional);
    ensureThat(
      !this._ingredients.find(ingredient => ingredient.ingredient.id === recipeIngredient.ingredient.id),
      new InvalidParameterError("Ingredient already present", "Recipe", [
        { id: this.id.toValue(), ingredientId: recipeIngredient.ingredient.id },
      ]),
    );
    this._ingredients.push(recipeIngredient);

    return recipeIngredient;
  }

  public setKitchenware(kitchenware: Kitchenware, quantity: number) {
    const recipeKitchenware = RecipeKitchenware.create(kitchenware, quantity);
    ensureThat(
      !this._kitchenware.find(kitchenware => kitchenware.kitchenware.id === recipeKitchenware.kitchenware.id),
      new InvalidParameterError("Tool already present", "Recipe", [
        { id: this.id.toValue(), toolId: recipeKitchenware.kitchenware.id },
      ]),
    );
    this._kitchenware.push(recipeKitchenware);

    return recipeKitchenware;
  }

  public getStep(id: string, number: number, content: Record<string, { title: string; body: string }>): void {
    const recipeStep = RecipeStep.get(id, number, content);
    this._steps.push(recipeStep);
  }

  public setStep(number: number, content: Record<string, { title: string; body: string }>) {
    const recipeStep = RecipeStep.create(number, content);
    this._steps.push(recipeStep);

    return recipeStep;
  }

  public addIngredient(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean) {
    const recipeIngredient = this.setIngredient(ingredient, unit, quantity, isOptional);
    this.addDomainEvent(new RecipeIngredientAddedDomainEvent(this._id, recipeIngredient));
  }

  public addKitchenware(kitchenware: Kitchenware, quantity: number): void {
    const recipeKitchenware = this.setKitchenware(kitchenware, quantity);
    this.addDomainEvent(new RecipeKitchenwareAddedDomainEvent(this._id, recipeKitchenware));
  }

  public addStep(number: number, content: Record<string, { title: string; body: string }>): void {
    const recipeStep = this.setStep(number, content);
    this.addDomainEvent(new RecipeStepAddedDomainEvent(this._id, recipeStep));
  }
}
