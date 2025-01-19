import { KitchenwareLanguageRequest } from "./KitchenwareLanguageRequest";

export type KitchenwareCreateRequest = {
  content: Record<string, KitchenwareLanguageRequest>;
};
