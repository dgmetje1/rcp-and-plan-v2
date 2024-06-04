import { ensureThat, InvalidParameterError, TranslationsNotFoundError } from "@rcp-and-plan/commons";

import { TranslatableContent } from "@domain/shared/TranslatableContent";
import { AvailableLanguages, DEFAULT_LANGUAGE, Languages } from "@global_types/languages";

import { IngredientTranslatableContent } from "./types";

export class Ingredient {
  private _id: string;
  private _content: TranslatableContent<IngredientTranslatableContent>;

  public get id() {
    return this._id;
  }

  private constructor(id: string, content: { language: string; name: string; singularName: string }[]) {
    this._id = id;
    this._content = new Map();

    content.forEach(({ language, name, singularName }) => {
      ensureThat(
        language in AvailableLanguages,
        new InvalidParameterError(`Language must be one of ${Object.values(AvailableLanguages)}`, "Ingredient", [
          { language },
        ]),
      );

      this._content.set(language as Languages, { name, singularName });
    });
  }

  /**
   * Creates a new instance of Ingredient with the provided id and content.
   *
   * @param id - The unique identifier for the Ingredient.
   * @param content - An array of objects containing language, name, and singularName for the Ingredient.
   * @returns A new instance of Ingredient initialized with the provided id and content.
   */
  public static get(id: string, content: { language: string; name: string; singularName: string }[]) {
    return new Ingredient(id, content);
  }

  /**
   * Retrieves the content of the Ingredient in the specified language.
   * If the content is not available in the specified language, a TranslationsNotFoundError is thrown.
   *
   * @param language - The language in which to retrieve the content. Defaults to the DEFAULT_LANGUAGE.
   * @returns The content of the Ingredient in the specified language.
   * @throws TranslationsNotFoundError if the content is not available in the specified language.
   */
  public getContent(language: Languages = DEFAULT_LANGUAGE) {
    const translatedContent = this._content.get(language);
    if (!translatedContent)
      throw new TranslationsNotFoundError("Ingredient translation not found", language, [{ id: this._id }]);

    return translatedContent;
  }
}
