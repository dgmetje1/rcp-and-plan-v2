import { queryOptions } from "@tanstack/react-query";

import { getKitchenwareKeys } from "./keys";
import { getKitchenware } from "./queries";

export const getKitchenwareOptions = () => {
  const { queryKey } = getKitchenwareKeys();
  return queryOptions({
    queryKey,
    queryFn: () => getKitchenware(),
  });
};
