import { AggregateRoot, ensureThat, InvalidParameterError, UniqueEntityID } from "@rcp-and-plan/commons";

import { Category } from "@domain/models/category/Category";
import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Unit } from "@domain/models/unit/Unit";
import { Languages } from "@global_types/languages";

import { RecipeIngredient } from "./aggregates/RecipeIngredient";
import { RecipePublication, RecipePublications } from "./aggregates/RecipePublication";
import { RecipeIngredientAddedDomainEvent } from "./events/RecipeIngredientAddedDomainEvent";
import { RecipeDifficulty } from "./VO/RecipeDifficulty";
import { RecipeVisibility } from "./VO/RecipeVisibility";

export class Recipe extends AggregateRoot {
  private _difficulty: RecipeDifficulty;
  private _time: number;
  private _portions: number;
  private _visibility: RecipeVisibility;
  private _author: string;
  private _publicationDate: Date;
  private _publications: RecipePublications;
  private _categories: Array<Category>;
  private _ingredients: Array<RecipeIngredient>;

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

  private constructor(
    id: string | undefined,
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: RecipeVisibility,
    author: string,
    publicationDate: Date,
    publications: Record<string, { title: string; description: string }>,
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

    this._publications = new Map();
    Object.entries(publications).forEach(([key, { title, description }]) => {
      const publicationAggregate = RecipePublication.create(key, title, description);

      this._publications.set(key as Languages, publicationAggregate);
    });
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
    const recipe = new Recipe(
      undefined,
      difficulty,
      time,
      portions,
      visibility,
      author,
      new Date(Date.now()),
      publications,
      categories,
    );

    return recipe;
  }

  public setIngredient(ingredient: Ingredient, unit: Unit, quantity: number, isOptional: boolean) {
    const recipeIngredient = RecipeIngredient.create(ingredient, unit, quantity, isOptional);
    this._ingredients.push(recipeIngredient);

    this.addDomainEvent(new RecipeIngredientAddedDomainEvent(this._id, recipeIngredient));
  }
}
