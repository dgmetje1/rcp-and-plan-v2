import {
  AggregateRoot,
  ensureThat,
  InvalidParameterError,
  TranslationsNotFoundError,
  UniqueEntityID,
} from "@rcp-and-plan/commons";

import { TranslatableContent } from "@domain/shared/TranslatableContent";
import { AvailableLanguages, DEFAULT_LANGUAGE, Languages } from "@global_types/languages";

import { IngredientMergedDomainEvent } from "./events/IngredientMergedDomainEvent";
import { IngredientContent, IngredientTranslatableContent } from "./types";

export class Ingredient extends AggregateRoot {
  private _content: TranslatableContent<IngredientTranslatableContent>;

  public get content() {
    return this._content;
  }

  private constructor(id: string | undefined, content: IngredientContent) {
    super(new UniqueEntityID(id));
    this._content = new Map();

    this._setContent(content);
  }

  /**
   * Creates a new instance of Ingredient with the provided id and content.
   *
   * @param id - The unique identifier for the Ingredient.
   * @param content - An array of objects containing language, name, and singularName for the Ingredient.
   * @returns A new instance of Ingredient initialized with the provided id and content.
   */
  public static get(id: string, content: IngredientContent) {
    return new Ingredient(id, content);
  }
  /**
   * Creates a new instance of Ingredient with the provided content.
   *
   * @param content - An array of objects containing language, name, and singularName for the Ingredient.
   * @returns A new instance of Ingredient initialized with the provided id and content.
   */
  public static create(content: IngredientContent) {
    return new Ingredient(undefined, content);
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

  /**
   * Updates the content of the Ingredient with the provided content.
   *
   * @param content - An array of objects containing language, name, and singularName for the Ingredient.
   */
  public edit(content: IngredientContent) {
    const currentLanguages = [...this._content.keys()];
    this._setContent(content);
    return currentLanguages;
  }

  /**
   * Deletes the Ingredient.
   */
  public delete() {}

  public merge(otherIngredient: Ingredient) {
    const currentLanguages = [...this._content.keys()];
    otherIngredient.content.forEach((value, key) => {
      if (!this._content.has(key)) {
        this._content.set(key, value);
      }
    });

    this.addDomainEvent(new IngredientMergedDomainEvent(this.id, this, otherIngredient));

    return currentLanguages;
  }

  private _setContent(content: IngredientContent) {
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
}
