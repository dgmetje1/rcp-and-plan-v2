export type UnitCreateRequest = {
  isVisible: boolean;
  content: Record<string, UnitLanguageCreateRequest>;
};
export type UnitLanguageCreateRequest = {
  name: string;
  singularName: string;
  shortName: string;
};
