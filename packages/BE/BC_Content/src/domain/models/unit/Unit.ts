import {
  AggregateRoot,
  ensureThat,
  InvalidParameterError,
  TranslationsNotFoundError,
  UniqueEntityID,
} from "@rcp-and-plan/commons";

import { TranslatableContent } from "@domain/shared/TranslatableContent";
import { AvailableLanguages, DEFAULT_LANGUAGE, Languages } from "@global_types/languages";

import { UnitDeletedDomainEvent } from "./events/UnitDeletedDomainEvent";
import { UnitContent, UnitTranslatableContent } from "./types";

export class Unit extends AggregateRoot {
  private _content: TranslatableContent<UnitTranslatableContent>;
  private _isVisible: boolean;

  public get isVisible() {
    return this._isVisible;
  }
  public get content() {
    return this._content;
  }

  private constructor(id: string | undefined, isVisible: boolean, content: UnitContent) {
    super(new UniqueEntityID(id));

    this._isVisible = isVisible;
    this._content = new Map();

    this._setContent(content);
  }

  /**
   * Creates a new instance of Unit with the provided id and content.
   *
   * @param id - The unique identifier for the Unit.
   * @param content - An array of objects containing language, name, and description for the Unit.
   * @returns A new instance of Unit initialized with the provided id and content.
   */
  public static get(id: string, isVisible: boolean, content: UnitContent) {
    return new Unit(id, isVisible, content);
  }
  /**
   * Creates a new instance of Unit with the provided id and content.
   *
   * @param id - The unique identifier for the Unit.
   * @param content - An array of objects containing language, name, and description for the Unit.
   * @returns A new instance of Unit initialized with the provided id and content.
   */
  public static create(isVisible: boolean, content: UnitContent) {
    return new Unit(undefined, isVisible, content);
  }

  /**
   * Updates the visibility and content of the Unit.
   *
   * @param isVisible - A boolean indicating whether the Unit should be visible.
   * @param content - The new content to set for the Unit.
   */
  public edit(isVisible: boolean, content: UnitContent) {
    this._isVisible = isVisible;
    this._setContent(content);
  }

  /**
   * Deletes the Unit.
   */
  public delete() {
    this.addDomainEvent(new UnitDeletedDomainEvent(this._id, this));
  }

  /**
   * Retrieves the content of the Unit in the specified language.
   * If the content is not available in the specified language, a TranslationsNotFoundError is thrown.
   *
   * @param language - The language in which to retrieve the content. Defaults to the DEFAULT_LANGUAGE.
   * @returns The content of the Unit in the specified language.
   * @throws TranslationsNotFoundError if the content is not available in the specified language.
   */
  public getContent(language: Languages = DEFAULT_LANGUAGE) {
    const translatedContent = this._content.get(language);
    if (!translatedContent)
      throw new TranslationsNotFoundError("Unit translation not found", language, [{ id: this._id }]);

    return translatedContent;
  }

  private _setContent(content: UnitContent) {
    content.forEach(({ language, name, shortName, singularName }) => {
      ensureThat(
        language in AvailableLanguages,
        new InvalidParameterError(`Language must be one of ${AvailableLanguages}`, Unit.entityName, [{ language }]),
      );
      this._content.set(language as Languages, { name, shortName, singularName });
    });
  }
}
