import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";

import { AvailableLanguages, Languages } from "@global_types/languages";

export class Category {
  private _id: string;
  private _language: Languages;
  private _name: string;
  private _description: string;

  public get id() {
    return this._id;
  }

  public get language() {
    return this._language;
  }

  public get name() {
    return this._name;
  }

  public get description() {
    return this._description;
  }

  private constructor(id: string, language: string, name: string, description: string) {
    ensureThat(
      language in AvailableLanguages,
      new InvalidParameterError(`Language must be one of ${AvailableLanguages}`, "Recipe", [{ language }]),
    );

    this._id = id;
    this._language = language as Languages;
    this._name = name;
    this._description = description;
  }

  /**
   * Gets an instance of Category with the fields specified below
   * @param id Category identifier
   * @param language Language of the fields
   * @param name Name of the category
   * @param description Description of the category
   * @returns A Category instance
   */
  public static get(id: string, language: string, name: string, description: string) {
    return new Category(id, language, name, description);
  }
}
