import { useSuspenseApiQuery } from "@/middleware/api";

import { getKitchenwareKeys } from "./keys";
import { getKitchenwareOptions } from "./options";

export const useSuspenseGetKitchenware = () => {
  const { key } = getKitchenwareKeys();

  return useSuspenseApiQuery(key, getKitchenwareOptions());
};
