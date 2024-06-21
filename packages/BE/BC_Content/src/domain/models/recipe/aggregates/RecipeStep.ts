import { ensureThat, InvalidParameterError } from "@rcp-and-plan/commons";
import { ulid } from "ulidx";

import { AvailableLanguages, Languages } from "@global_types/languages";

export class RecipeSteps extends Array<RecipeStep> {
  push(...items: RecipeStep[]): number {
    ensureThat(
      !items.some((value, index) => value.number !== this.length + index),
      new InvalidParameterError("Step number invalid", "Recipe", [
        { currentItems: this.length, items: items.map(x => x.number) },
      ]),
    );
    return super.push(...items);
  }
}

export class RecipeStep {
  private _id: string;
  private _number: number;
  private _content: Map<Languages, RecipeStepContent>;

  public get id() {
    return this._id;
  }

  public get content() {
    return this._content;
  }

  public get number() {
    return this._number;
  }

  private constructor(id: string, number: number, content: Record<string, { title: string; body: string }>) {
    ensureThat(number >= 0, new InvalidParameterError("Step number must be positive", "Recipe", [{ number }]));

    this._id = id;
    this._number = number;
    this._content = new Map(
      Object.entries(content).map(([language, { title, body }]) => [
        language as Languages,
        RecipeStepContent.create(language, title, body),
      ]),
    );
  }

  /**
   * Creates a new instance of RecipeStep with a unique ID generated using ulid,
   * the provided step number, and the content for each language.
   *
   * @param number The step number of the recipe.
   * @param content An object containing the title and body of the step content for each language.
   * @returns A new instance of RecipeStep with the generated ID, step number, and content.
   */
  public static create(number: number, content: Record<string, { title: string; body: string }>) {
    return new RecipeStep(ulid(), number, content);
  }

  /**
   * Retrieves an instance of RecipeStep with an id,
   * the provided step number, and the content for each language.
   *
   * @param id The step identifier.
   * @param number The step number of the recipe.
   * @param content An object containing the title and body of the step content for each language.
   * @returns A new instance of RecipeStep with the generated ID, step number, and content.
   */
  public static get(id: string, number: number, content: Record<string, { title: string; body: string }>) {
    return new RecipeStep(id, number, content);
  }
}

class RecipeStepContent {
  private _language: Languages;
  private _title: string;
  private _body: string;

  public get language() {
    return this._language;
  }

  public get title() {
    return this._title;
  }

  public get body() {
    return this._body;
  }

  private constructor(language: string, title: string, body: string) {
    ensureThat(
      language in AvailableLanguages,
      new InvalidParameterError(`Language must be one of ${AvailableLanguages}`, "Recipe", [{ language }]),
    );
    ensureThat(!!title, new InvalidParameterError("Title cannot be empty", "Recipe", [{ title }]));

    this._language = language as Languages;
    this._title = title;
    this._body = body;
  }

  /**
   * Creates a new instance of RecipeStepContent the specified language, title, and body.
   *
   * @param language The language of the recipe step.
   * @param title The title of the recipe step.
   * @param body The body of the recipe step.
   * @returns A new instance of RecipeStepContent with the provided details.
   */
  public static create(language: string, title: string, body: string) {
    return new RecipeStepContent(language, title, body);
  }
}
