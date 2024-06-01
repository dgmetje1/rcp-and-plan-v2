import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";
import { ulid } from "ulidx";

import { Languages } from "@global_types/languages";

import { Category } from "../category/Category";
import { RecipePublication, RecipePublications } from "./aggregates/RecipePublication";
import { RecipeDifficulty } from "./VO/RecipeDifficulty";

export class Recipe {
  private _id: string;
  private _difficulty: RecipeDifficulty;
  private _time: number;
  private _portions: number;
  private _visibility: number;
  private _author: string;
  private _publicationDate: Date;
  private _publications: RecipePublications;
  private _categories: Array<Category>;

  public get id() {
    return this._id;
  }

  public get difficulty() {
    return this._difficulty;
  }

  public get time() {
    return this._time;
  }

  public get portions() {
    return this._portions;
  }

  public get visibility() {
    return this._visibility;
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

  private constructor(
    id: string,
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: number,
    author: string,
    publicationDate: Date,
    publications: Record<string, { title: string; description: string }>,
    categories: Array<Category>,
  ) {
    ensureThat(time > 0, new InvalidParameterError("time must be greater than 0", "Recipe", [{ time }]));
    ensureThat(!!categories.length, new InvalidParameterError("Recipe must belong to at least one category", "Recipe"));

    this._id = id;
    this._difficulty = difficulty;
    this._time = time;
    this._portions = portions;
    this._visibility = visibility;
    this._author = author;
    this._publicationDate = publicationDate;
    this._categories = categories;

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
   * @returns A new Recipe instance
   */
  public static create(
    difficulty: RecipeDifficulty,
    time: number,
    portions: number,
    visibility: number,
    author: string,
    publications: Record<string, { title: string; description: string }>,
    categories: Array<Category>,
  ) {
    const recipe = new Recipe(
      ulid(),
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
}
