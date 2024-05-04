import { queryOptions } from "@tanstack/react-query";

import { getUserKeys } from "./keys";
import { getUser } from "./queries";

export const getUserOptions = () => {
  const { queryKey } = getUserKeys();
  return queryOptions({
    queryKey,
    queryFn: () => getUser(),
  });
};
