import { UndefinedInitialDataOptions } from "@tanstack/react-query";

import { useApiQuery } from "@/middleware/api";

import { getAccountKeys } from "./keys";
import { getAccount } from "./queries";

export const useGetAccount = (
  enabled?: UndefinedInitialDataOptions["enabled"],
) => {
  const { key, queryKey } = getAccountKeys();

  return useApiQuery(key, queryKey, () => getAccount(), {
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};
