export type UnitCreateRequest = Record<string, UnitLanguageCreateRequest>;

export type UnitLanguageCreateRequest = {
  name: string;
  singularName: string;
  shortName: string;
  isVisible?: boolean;
};
