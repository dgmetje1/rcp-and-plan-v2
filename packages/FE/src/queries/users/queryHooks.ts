import { UndefinedInitialDataOptions } from "@tanstack/react-query";

import { useApiQuery, useSuspenseApiQuery } from "@/middleware/api";

import { getAccountKeys, getUserKeys } from "./keys";
import { getUserOptions } from "./options";
import { getAccount } from "./queries";

export const useGetAccount = (enabled?: UndefinedInitialDataOptions["enabled"]) => {
  const { key, queryKey } = getAccountKeys();

  return useApiQuery(key, queryKey, () => getAccount(), {
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export const useSuspenseGetUser = () => {
  const { key } = getUserKeys();

  return useSuspenseApiQuery(key, getUserOptions());
};
