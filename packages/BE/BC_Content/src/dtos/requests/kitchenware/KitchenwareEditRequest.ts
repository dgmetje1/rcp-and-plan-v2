import { KitchenwareLanguageRequest } from "./KitchenwareLanguageRequest";

export type KitchenwareEditRequest = {
  id: string;
  content: Record<string, KitchenwareLanguageRequest>;
};
