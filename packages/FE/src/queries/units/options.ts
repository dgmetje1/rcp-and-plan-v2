import { queryOptions } from "@tanstack/react-query";

import { getUnitsKeys } from "./keys";
import { getUnits } from "./queries";

export const getUnitsOptions = () => {
  const { queryKey } = getUnitsKeys();
  return queryOptions({
    queryKey,
    queryFn: () => getUnits(),
  });
};
