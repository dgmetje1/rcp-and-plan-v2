import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";
import { ulid } from "ulidx";

import { AvailableLanguages, Languages } from "@global_types/languages";

export class RecipePublications extends Map<Languages, RecipePublication> {}

export class RecipePublication {
  private _id: string;
  private _language: Languages;
  private _title: string;
  private _description: string;

  public get id() {
    return this._id;
  }

  public get language() {
    return this._language;
  }

  public get title() {
    return this._title;
  }

  public get description() {
    return this._description;
  }

  private constructor(id: string, language: string, title: string, description: string) {
    ensureThat(
      language in AvailableLanguages,
      new InvalidParameterError(`Language must be one of ${AvailableLanguages}`, "Recipe", [{ language }]),
    );
    ensureThat(!!title, new InvalidParameterError("Title cannot be empty", "Recipe", [{ title }]));

    this._id = id;
    this._language = language as Languages;
    this._title = title;
    this._description = description;
  }

  /**
   * Creates a new instance of RecipePublication with a generated unique ID, the specified language, title, and description.
   *
   * @param language The language of the recipe publication.
   * @param title The title of the recipe publication.
   * @param description The description of the recipe publication.
   * @returns A new instance of RecipePublication with the provided details.
   */
  public static create(language: string, title: string, description: string) {
    return new RecipePublication(ulid(), language, title, description);
  }

  /**
   * Retrieves an existing instance of RecipePublication with the specified ID, language, title, and description.
   *
   * @param id The unique identifier of the recipe publication.
   * @param language The language of the recipe publication.
   * @param title The title of the recipe publication.
   * @param description The description of the recipe publication.
   * @returns An existing instance of RecipePublication with the provided details.
   */
  public static get(id: string, language: string, title: string, description: string) {
    return new RecipePublication(id, language, title, description);
  }
}
