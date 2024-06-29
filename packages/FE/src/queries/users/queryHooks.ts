import { UndefinedInitialDataOptions } from "@tanstack/react-query";

import { useApiQuery, useSuspenseApiQuery } from "@/middleware/api";
import { User } from "@/types/user";

import { getAccountKeys, getUserKeys, getUserSummaryKeys } from "./keys";
import { getUserOptions, getUserSummaryOptions } from "./options";
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
export const useSuspenseGetUserSummary = (userId: User["id"]) => {
  const { key } = getUserSummaryKeys(userId);

  return useSuspenseApiQuery(key, getUserSummaryOptions(userId));
};
