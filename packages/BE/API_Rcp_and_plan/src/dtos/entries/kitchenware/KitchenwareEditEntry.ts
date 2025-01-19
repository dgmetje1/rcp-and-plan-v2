import { KitchenwareLanguageEntry } from "./KitchenwareLanguageEntry";

export type KitchenwareEditEntry = {
  id: string;
  isVisible: boolean;
  content: Record<string, KitchenwareLanguageEntry>;
};
