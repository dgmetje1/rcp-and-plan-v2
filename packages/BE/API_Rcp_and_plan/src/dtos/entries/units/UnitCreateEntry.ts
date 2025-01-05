export type UnitCreateEntry = {
  isVisible: boolean;
  content: Record<string, UnitLanguageCreateEntry>;
};
export type UnitLanguageCreateEntry = {
  name: string;
  singularName: string;
  shortName: string;
};
