import {
  AggregateRoot,
  ensureThat,
  InvalidParameterError,
  TranslationsNotFoundError,
  UniqueEntityID,
} from "@rcp-and-plan/commons";

import { TranslatableContent } from "@domain/shared/TranslatableContent";
import { AvailableLanguages, DEFAULT_LANGUAGE, Languages } from "@global_types/languages";

import { KitchenwareMergedDomainEvent } from "./events/KitchenwareMergedDomainEvent";
import { KitchenwareContent, KitchenwareTranslatableContent } from "./types";

export class Kitchenware extends AggregateRoot {
  private _content: TranslatableContent<KitchenwareTranslatableContent>;

  public get content() {
    return this._content;
  }

  private constructor(id: string | undefined, content: KitchenwareContent) {
    super(new UniqueEntityID(id));
    this._content = new Map();

    this._setContent(content);
  }

  /**
   * Creates a new instance of Kitchenware with the provided id and content.
   *
   * @param id - The unique identifier for the Kitchenware.
   * @param content - An array of objects containing language, name, and singularName for the Kitchenware.
   * @returns A new instance of Kitchenware initialized with the provided id and content.
   */
  public static get(id: string, content: KitchenwareContent) {
    return new Kitchenware(id, content);
  }
  /**
   * Creates a new instance of Kitchenware with the provided content.
   *
   * @param content - An array of objects containing language, name, and singularName for the Kitchenware.
   * @returns A new instance of Kitchenware initialized with the provided id and content.
   */
  public static create(content: KitchenwareContent) {
    return new Kitchenware(undefined, content);
  }

  /**
   * Retrieves the content of the Kitchenware in the specified language.
   * If the content is not available in the specified language, a TranslationsNotFoundError is thrown.
   *
   * @param language - The language in which to retrieve the content. Defaults to the DEFAULT_LANGUAGE.
   * @returns The content of the Kitchenware in the specified language.
   * @throws TranslationsNotFoundError if the content is not available in the specified language.
   */
  public getContent(language: Languages = DEFAULT_LANGUAGE) {
    const translatedContent = this._content.get(language);
    if (!translatedContent)
      throw new TranslationsNotFoundError("Kitchenware translation not found", language, [{ id: this._id }]);

    return translatedContent;
  }

  /**
   * Updates the content of the Kitchenware with the provided content.
   *
   * @param content - An array of objects containing language, name, and singularName for the Kitchenware.
   */
  public edit(content: KitchenwareContent) {
    const currentLanguages = [...this._content.keys()];
    this._setContent(content);
    return currentLanguages;
  }

  /**
   * Deletes the Kitchenware.
   */
  public delete() {}

  public merge(otherKitchenware: Kitchenware) {
    const currentLanguages = [...this._content.keys()];
    otherKitchenware.content.forEach((value, key) => {
      if (!this._content.has(key)) {
        this._content.set(key, value);
      }
    });

    this.addDomainEvent(new KitchenwareMergedDomainEvent(this.id, this, otherKitchenware));

    return currentLanguages;
  }

  private _setContent(content: KitchenwareContent) {
    content.forEach(({ language, name, singularName }) => {
      ensureThat(
        language in AvailableLanguages,
        new InvalidParameterError(`Language must be one of ${Object.values(AvailableLanguages)}`, "Kitchenware", [
          { language },
        ]),
      );

      this._content.set(language as Languages, { name, singularName });
    });
  }
}
