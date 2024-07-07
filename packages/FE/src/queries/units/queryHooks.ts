import { useSuspenseApiQuery } from "@/middleware/api";

import { getUnitsKeys } from "./keys";
import { getUnitsOptions } from "./options";

export const useSuspenseGetUnits = () => {
  const { key } = getUnitsKeys();

  return useSuspenseApiQuery(key, getUnitsOptions());
};
