import { ensureThat, InvalidParameterError, TranslationsNotFoundError } from "@rcp-and-plan/commons";

import { TranslatableContent } from "@domain/shared/TranslatableContent";
import { AvailableLanguages, DEFAULT_LANGUAGE, Languages } from "@global_types/languages";

import { CategoryTranslatableContent } from "./types";

export class Category {
  private _id: string;
  private _content: TranslatableContent<CategoryTranslatableContent>;

  public get id() {
    return this._id;
  }

  private constructor(id: string, content: { language: string; name: string; description: string }[]) {
    this._id = id;
    this._content = new Map();

    content.forEach(({ language, name, description }) => {
      ensureThat(
        language in AvailableLanguages,
        new InvalidParameterError(`Language must be one of ${AvailableLanguages}`, "Category", [{ language }]),
      );
      this._content.set(language as Languages, { name, description });
    });
  }

  /**
   * Creates a new instance of Category with the provided id and content.
   *
   * @param id - The unique identifier for the Category.
   * @param content - An array of objects containing language, name, and description for the Category.
   * @returns A new instance of Category initialized with the provided id and content.
   */
  public static get(id: string, content: { language: string; name: string; description: string }[]) {
    return new Category(id, content);
  }

  /**
   * Retrieves the content of the Category in the specified language.
   * If the content is not available in the specified language, a TranslationsNotFoundError is thrown.
   *
   * @param language - The language in which to retrieve the content. Defaults to the DEFAULT_LANGUAGE.
   * @returns The content of the Category in the specified language.
   * @throws TranslationsNotFoundError if the content is not available in the specified language.
   */
  public getContent(language: Languages = DEFAULT_LANGUAGE) {
    const translatedContent = this._content.get(language);
    if (!translatedContent)
      throw new TranslationsNotFoundError("Category translation not found", language, [{ id: this._id }]);

    return translatedContent;
  }
}
