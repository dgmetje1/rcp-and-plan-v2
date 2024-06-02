import { Languages } from "@global_types/languages";

/**
 * Represents a class for storing translatable content with language keys.
 * The class extends the Map class with language keys of type Languages and values of type T.
 */
export class TranslatableContent<T> extends Map<Languages, T> {}
